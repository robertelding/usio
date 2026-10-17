import { serverEnv } from "@cap/env";
import {
	AI_GENERATION_LANGUAGE_AUTO,
	type AiGenerationLanguage,
} from "@cap/web-domain";
import { AssemblyAI } from "assemblyai";
import {
	ASSEMBLYAI_SUPPORTED_LANGUAGES,
	getAssemblyAITranscriptionOptions,
} from "@/lib/assemblyai";
import type {
	AssemblyAIEditResult,
	AssemblyAIEditWord,
} from "@/lib/edit-transcript";

export const GROQ_WHISPER_BASE_URL = "https://api.groq.com/openai/v1";
export const OPENAI_WHISPER_BASE_URL = "https://api.openai.com/v1";
export const WHISPER_MAX_UPLOAD_BYTES = 24 * 1024 * 1024;
const MP3_FALLBACK_BYTES_PER_SECOND = 16_000;

export type TranscriptionProvider =
	| { id: "assemblyai"; apiKey: string }
	| {
			id: "whisper";
			baseUrl: string;
			apiKey: string | undefined;
			model: string;
			prompt?: string;
	  };

export type TranscriptionEnv = {
	TRANSCRIPTION_PROVIDER?: "assemblyai" | "whisper";
	ASSEMBLY_API_KEY?: string;
	WHISPER_BASE_URL?: string;
	WHISPER_API_KEY?: string;
	WHISPER_MODEL?: string;
	WHISPER_PROMPT?: string;
	GROQ_API_KEY?: string;
	OPENAI_API_KEY?: string;
};

export type TranscriptionResult = AssemblyAIEditResult & {
	audio_duration: number | null;
};

export class NoSpokenAudioError extends Error {}

function resolveWhisperProvider(
	env: TranscriptionEnv,
): TranscriptionProvider | null {
	if (env.WHISPER_BASE_URL) {
		return {
			id: "whisper",
			baseUrl: env.WHISPER_BASE_URL.replace(/\/+$/, ""),
			apiKey: env.WHISPER_API_KEY,
			model: env.WHISPER_MODEL ?? "whisper-1",
		};
	}
	if (env.GROQ_API_KEY) {
		return {
			id: "whisper",
			baseUrl: GROQ_WHISPER_BASE_URL,
			apiKey: env.GROQ_API_KEY,
			model: env.WHISPER_MODEL ?? "whisper-large-v3-turbo",
		};
	}
	if (env.OPENAI_API_KEY) {
		return {
			id: "whisper",
			baseUrl: OPENAI_WHISPER_BASE_URL,
			apiKey: env.OPENAI_API_KEY,
			model: env.WHISPER_MODEL ?? "whisper-1",
		};
	}
	return null;
}

function withWhisperPrompt(
	provider: TranscriptionProvider | null,
	env: TranscriptionEnv,
): TranscriptionProvider | null {
	if (provider?.id !== "whisper" || !env.WHISPER_PROMPT) return provider;
	return { ...provider, prompt: env.WHISPER_PROMPT };
}

export function resolveTranscriptionProvider(
	env: TranscriptionEnv = serverEnv(),
): TranscriptionProvider | null {
	const assembly: TranscriptionProvider | null = env.ASSEMBLY_API_KEY
		? { id: "assemblyai", apiKey: env.ASSEMBLY_API_KEY }
		: null;
	if (env.TRANSCRIPTION_PROVIDER === "assemblyai") return assembly;
	if (env.TRANSCRIPTION_PROVIDER === "whisper") {
		return withWhisperPrompt(resolveWhisperProvider(env), env);
	}
	return assembly ?? withWhisperPrompt(resolveWhisperProvider(env), env);
}

export function isTranscriptionConfigured(env: TranscriptionEnv = serverEnv()) {
	return resolveTranscriptionProvider(env) !== null;
}

export async function transcribeAudio(
	provider: TranscriptionProvider,
	audio: Buffer,
	options: {
		language: AiGenerationLanguage;
		durationMs: number;
		contentType: string | null;
		fetchImpl?: typeof fetch;
	},
): Promise<TranscriptionResult> {
	if (provider.id === "assemblyai") {
		return transcribeWithAssemblyAI(provider.apiKey, audio, options.language);
	}
	return transcribeWithWhisper(provider, audio, options);
}

async function transcribeWithAssemblyAI(
	apiKey: string,
	audio: Buffer,
	language: AiGenerationLanguage,
): Promise<TranscriptionResult> {
	const client = new AssemblyAI({ apiKey });
	const transcript = await client.transcripts.transcribe({
		audio,
		...getAssemblyAITranscriptionOptions(language),
		disfluencies: true,
	});

	console.log(
		`[transcribe] AssemblyAI transcript ${transcript.id} finished with status=${transcript.status}, model=${transcript.speech_model_used ?? "unknown"}`,
	);

	if (transcript.status === "error") {
		const transcriptError = transcript.error ?? "Unknown error";
		const message = `AssemblyAI transcription failed (id=${transcript.id}, language=${language}): ${transcriptError}`;
		if (transcriptError.toLowerCase().includes("no spoken audio")) {
			throw new NoSpokenAudioError(message);
		}
		throw new Error(message);
	}

	return {
		words: transcript.words,
		language_code: transcript.language_code,
		speech_model_used: transcript.speech_model_used,
		audio_duration: transcript.audio_duration ?? null,
	};
}

type WhisperWord = {
	word?: unknown;
	text?: unknown;
	start?: unknown;
	end?: unknown;
	probability?: unknown;
};

type WhisperSegment = {
	start?: unknown;
	end?: unknown;
	text?: unknown;
	words?: WhisperWord[] | null;
};

export type WhisperVerboseResponse = {
	text?: unknown;
	language?: unknown;
	duration?: unknown;
	words?: WhisperWord[] | null;
	segments?: WhisperSegment[] | null;
};

function isMp4(audio: Buffer) {
	return audio.length > 8 && audio.toString("latin1", 4, 8) === "ftyp";
}

function isMp3FrameSync(audio: Buffer, index: number) {
	return (
		index + 1 < audio.length &&
		audio[index] === 0xff &&
		((audio[index + 1] ?? 0) & 0xe0) === 0xe0
	);
}

export function splitMp3Audio(
	audio: Buffer,
	maxBytes: number,
): { bytes: Buffer; startByte: number }[] {
	if (audio.length <= maxBytes || isMp4(audio)) {
		return [{ bytes: audio, startByte: 0 }];
	}

	const chunks: { bytes: Buffer; startByte: number }[] = [];
	let start = 0;
	while (start < audio.length) {
		let end = Math.min(start + maxBytes, audio.length);
		if (end < audio.length) {
			let cut = end;
			const floor = start + Math.floor(maxBytes / 2);
			while (cut > floor && !isMp3FrameSync(audio, cut)) cut--;
			if (cut > floor) end = cut;
		}
		chunks.push({ bytes: audio.subarray(start, end), startByte: start });
		start = end;
	}
	return chunks;
}

function finiteNumber(value: unknown): number | null {
	return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeForAlignment(text: string) {
	return text.toLocaleLowerCase().replace(/[^\p{L}\p{N}']/gu, "");
}

export function restorePunctuation(
	words: AssemblyAIEditWord[],
	fullText: string,
): AssemblyAIEditWord[] {
	const tokens = fullText.split(/\s+/).filter(Boolean);
	let cursor = 0;
	return words.map((word) => {
		const text = typeof word.text === "string" ? word.text.trim() : "";
		const target = normalizeForAlignment(text);
		if (!target) return word;
		for (
			let index = cursor;
			index < Math.min(tokens.length, cursor + 4);
			index++
		) {
			const token = tokens[index] ?? "";
			if (normalizeForAlignment(token) === target) {
				cursor = index + 1;
				return { ...word, text: token };
			}
		}
		return { ...word, text };
	});
}

export function whisperLanguageCode(language: unknown): string | null {
	if (typeof language !== "string" || language.length === 0) return null;
	const lowered = language.trim().toLocaleLowerCase();
	if (/^[a-z]{2,3}$/.test(lowered)) return lowered;
	const names = new Intl.DisplayNames(["en"], { type: "language" });
	for (const code of ASSEMBLYAI_SUPPORTED_LANGUAGES) {
		if (names.of(code)?.toLocaleLowerCase() === lowered) return code;
	}
	return null;
}

function wordsFromSegments(segments: WhisperSegment[]): WhisperWord[] {
	const words: WhisperWord[] = [];
	for (const segment of segments) {
		if (segment.words && segment.words.length > 0) {
			words.push(...segment.words);
			continue;
		}
		const start = finiteNumber(segment.start);
		const end = finiteNumber(segment.end);
		const text = typeof segment.text === "string" ? segment.text.trim() : "";
		if (start === null || end === null || end <= start || !text) continue;
		const parts = text.split(/\s+/).filter(Boolean);
		const step = (end - start) / parts.length;
		parts.forEach((part, index) => {
			words.push({
				word: part,
				start: start + step * index,
				end: start + step * (index + 1),
			});
		});
	}
	return words;
}

export function whisperResponseToWords(
	response: WhisperVerboseResponse,
	offsetSeconds: number,
): AssemblyAIEditWord[] {
	const rawWords =
		response.words && response.words.length > 0
			? response.words
			: wordsFromSegments(response.segments ?? []);
	const words = rawWords.flatMap((word): AssemblyAIEditWord[] => {
		const text =
			typeof word.word === "string"
				? word.word
				: typeof word.text === "string"
					? word.text
					: "";
		const start = finiteNumber(word.start);
		const end = finiteNumber(word.end);
		if (!text.trim() || start === null || end === null) return [];
		return [
			{
				text: text.trim(),
				start: Math.round((start + offsetSeconds) * 1000),
				end: Math.round((end + offsetSeconds) * 1000),
				confidence: finiteNumber(word.probability),
			},
		];
	});
	const fullText = typeof response.text === "string" ? response.text : "";
	return fullText ? restorePunctuation(words, fullText) : words;
}

async function transcribeWithWhisper(
	provider: Extract<TranscriptionProvider, { id: "whisper" }>,
	audio: Buffer,
	options: {
		language: AiGenerationLanguage;
		durationMs: number;
		contentType: string | null;
		fetchImpl?: typeof fetch;
	},
): Promise<TranscriptionResult> {
	const fetchImpl = options.fetchImpl ?? fetch;
	const mp4 = isMp4(audio);
	const contentType = mp4 ? "audio/mp4" : (options.contentType ?? "audio/mpeg");
	const filename = mp4 ? "audio.m4a" : "audio.mp3";
	const chunks = splitMp3Audio(audio, WHISPER_MAX_UPLOAD_BYTES);
	const bytesPerSecond =
		options.durationMs > 0
			? audio.length / (options.durationMs / 1000)
			: MP3_FALLBACK_BYTES_PER_SECOND;

	const words: AssemblyAIEditWord[] = [];
	let languageCode: string | null = null;
	let lastDuration: number | null = null;
	let lastOffset = 0;
	let anyText = false;

	for (const chunk of chunks) {
		const offsetSeconds = chunk.startByte / bytesPerSecond;
		const form = new FormData();
		form.append(
			"file",
			new Blob([new Uint8Array(chunk.bytes)], { type: contentType }),
			filename,
		);
		form.append("model", provider.model);
		form.append("response_format", "verbose_json");
		form.append("timestamp_granularities[]", "word");
		form.append("timestamp_granularities[]", "segment");
		if (options.language !== AI_GENERATION_LANGUAGE_AUTO) {
			form.append("language", options.language);
		}
		if (provider.prompt) form.append("prompt", provider.prompt);

		const response = await fetchImpl(
			`${provider.baseUrl}/audio/transcriptions`,
			{
				method: "POST",
				headers: provider.apiKey
					? { Authorization: `Bearer ${provider.apiKey}` }
					: undefined,
				body: form,
			},
		);
		if (!response.ok) {
			const detail = (await response.text().catch(() => "")).slice(0, 300);
			throw new Error(
				`Whisper transcription failed (${provider.baseUrl}, model=${provider.model}): ${response.status} ${detail}`,
			);
		}

		const body = (await response.json()) as WhisperVerboseResponse;
		if (typeof body.text === "string" && body.text.trim()) anyText = true;
		languageCode ??= whisperLanguageCode(body.language);
		lastDuration = finiteNumber(body.duration);
		lastOffset = offsetSeconds;
		words.push(...whisperResponseToWords(body, offsetSeconds));
	}

	console.log(
		`[transcribe] Whisper transcript finished via ${provider.baseUrl} model=${provider.model}: ${words.length} words in ${chunks.length} chunk(s)`,
	);

	if (words.length === 0 && !anyText) {
		throw new NoSpokenAudioError(
			`Whisper transcription found no spoken audio (model=${provider.model})`,
		);
	}

	return {
		words,
		language_code: languageCode,
		speech_model_used: provider.model,
		audio_duration: lastDuration === null ? null : lastOffset + lastDuration,
	};
}
