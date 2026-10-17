import { describe, expect, it, vi } from "vitest";

vi.mock("@cap/env", () => ({
	serverEnv: () => ({}),
}));

import {
	GROQ_WHISPER_BASE_URL,
	NoSpokenAudioError,
	OPENAI_WHISPER_BASE_URL,
	resolveTranscriptionProvider,
	restorePunctuation,
	splitMp3Audio,
	transcribeAudio,
	whisperLanguageCode,
	whisperResponseToWords,
} from "@/lib/transcription-provider";

describe("resolveTranscriptionProvider", () => {
	it("returns null when nothing is configured", () => {
		expect(resolveTranscriptionProvider({})).toBeNull();
	});

	it("prefers AssemblyAI when its key is set", () => {
		expect(
			resolveTranscriptionProvider({
				ASSEMBLY_API_KEY: "aai",
				GROQ_API_KEY: "groq",
			}),
		).toEqual({ id: "assemblyai", apiKey: "aai" });
	});

	it("uses a custom Whisper server before hosted keys", () => {
		expect(
			resolveTranscriptionProvider({
				WHISPER_BASE_URL: "http://localhost:8001/v1/",
				GROQ_API_KEY: "groq",
			}),
		).toEqual({
			id: "whisper",
			baseUrl: "http://localhost:8001/v1",
			apiKey: undefined,
			model: "whisper-1",
		});
	});

	it("falls back to Groq, then OpenAI", () => {
		expect(resolveTranscriptionProvider({ GROQ_API_KEY: "groq" })).toEqual({
			id: "whisper",
			baseUrl: GROQ_WHISPER_BASE_URL,
			apiKey: "groq",
			model: "whisper-large-v3-turbo",
		});
		expect(resolveTranscriptionProvider({ OPENAI_API_KEY: "oa" })).toEqual({
			id: "whisper",
			baseUrl: OPENAI_WHISPER_BASE_URL,
			apiKey: "oa",
			model: "whisper-1",
		});
	});

	it("passes a vocabulary prompt to Whisper providers only", () => {
		expect(
			resolveTranscriptionProvider({
				OPENAI_API_KEY: "oa",
				WHISPER_PROMPT: "usio",
			}),
		).toMatchObject({ id: "whisper", prompt: "usio" });
		expect(
			resolveTranscriptionProvider({
				ASSEMBLY_API_KEY: "aai",
				WHISPER_PROMPT: "usio",
			}),
		).toEqual({ id: "assemblyai", apiKey: "aai" });
	});

	it("honours an explicit provider choice", () => {
		expect(
			resolveTranscriptionProvider({
				TRANSCRIPTION_PROVIDER: "whisper",
				ASSEMBLY_API_KEY: "aai",
				OPENAI_API_KEY: "oa",
			})?.id,
		).toBe("whisper");
		expect(
			resolveTranscriptionProvider({
				TRANSCRIPTION_PROVIDER: "assemblyai",
				OPENAI_API_KEY: "oa",
			}),
		).toBeNull();
	});
});

describe("splitMp3Audio", () => {
	it("keeps small audio whole", () => {
		const audio = Buffer.alloc(100);
		expect(splitMp3Audio(audio, 200)).toEqual([{ bytes: audio, startByte: 0 }]);
	});

	it("cuts large audio on MP3 frame boundaries", () => {
		const audio = Buffer.alloc(1000);
		for (const sync of [0, 380, 760]) {
			audio[sync] = 0xff;
			audio[sync + 1] = 0xfb;
		}
		const chunks = splitMp3Audio(audio, 400);
		expect(chunks.map((chunk) => chunk.startByte)).toEqual([0, 380, 760]);
		expect(chunks.reduce((sum, chunk) => sum + chunk.bytes.length, 0)).toBe(
			1000,
		);
	});

	it("never splits MP4 audio", () => {
		const audio = Buffer.alloc(1000);
		audio.write("ftyp", 4, "latin1");
		expect(splitMp3Audio(audio, 400)).toHaveLength(1);
	});
});

describe("whisper response mapping", () => {
	it("restores punctuation from the full text", () => {
		expect(
			restorePunctuation(
				[{ text: "hello" }, { text: "world" }, { text: "its" }, { text: "me" }],
				"Hello, world! It's me.",
			).map((word) => word.text),
		).toEqual(["Hello,", "world!", "its", "me."]);
	});

	it("maps language names and codes", () => {
		expect(whisperLanguageCode("english")).toBe("en");
		expect(whisperLanguageCode("German")).toBe("de");
		expect(whisperLanguageCode("fr")).toBe("fr");
		expect(whisperLanguageCode("klingon")).toBeNull();
		expect(whisperLanguageCode(undefined)).toBeNull();
	});

	it("converts seconds to offset milliseconds", () => {
		expect(
			whisperResponseToWords(
				{
					text: "Hi there.",
					words: [
						{ word: "Hi", start: 0.5, end: 0.9, probability: 0.8 },
						{ word: "there", start: 1, end: 1.4 },
					],
				},
				10,
			),
		).toEqual([
			{ text: "Hi", start: 10500, end: 10900, confidence: 0.8 },
			{ text: "there.", start: 11000, end: 11400, confidence: null },
		]);
	});

	it("reads words nested in segments and splits segments without words", () => {
		const words = whisperResponseToWords(
			{
				text: "one two three",
				segments: [
					{
						start: 0,
						end: 1,
						text: "one",
						words: [{ word: " one", start: 0, end: 1 }],
					},
					{ start: 1, end: 3, text: " two three" },
				],
			},
			0,
		);
		expect(words.map((word) => [word.text, word.start, word.end])).toEqual([
			["one", 0, 1000],
			["two", 1000, 2000],
			["three", 2000, 3000],
		]);
	});
});

describe("transcribeAudio with Whisper", () => {
	const provider = {
		id: "whisper" as const,
		baseUrl: "http://whisper.test/v1",
		apiKey: "secret",
		model: "whisper-1",
	};

	it("posts verbose_json requests and returns words", async () => {
		const fetchImpl = vi.fn(async (_url: string, _init?: RequestInit) =>
			Response.json({
				text: "Hello there.",
				language: "english",
				duration: 2,
				words: [
					{ word: "Hello", start: 0, end: 0.5 },
					{ word: "there", start: 0.6, end: 1 },
				],
			}),
		);
		const result = await transcribeAudio(provider, Buffer.alloc(10), {
			language: "en",
			durationMs: 2000,
			contentType: "audio/mpeg",
			fetchImpl: fetchImpl as unknown as typeof fetch,
		});

		const [url, init] = fetchImpl.mock.calls[0] ?? [];
		expect(url).toBe("http://whisper.test/v1/audio/transcriptions");
		expect(init?.headers).toEqual({ Authorization: "Bearer secret" });
		const form = init?.body as FormData;
		expect(form.get("response_format")).toBe("verbose_json");
		expect(form.getAll("timestamp_granularities[]")).toEqual([
			"word",
			"segment",
		]);
		expect(form.get("language")).toBe("en");
		expect(result).toEqual({
			words: [
				{ text: "Hello", start: 0, end: 500, confidence: null },
				{ text: "there.", start: 600, end: 1000, confidence: null },
			],
			language_code: "en",
			speech_model_used: "whisper-1",
			audio_duration: 2,
		});
	});

	it("reports silence as no spoken audio", async () => {
		const fetchImpl = vi.fn(async () => Response.json({ text: "", words: [] }));
		await expect(
			transcribeAudio(provider, Buffer.alloc(10), {
				language: "auto",
				durationMs: 1000,
				contentType: null,
				fetchImpl: fetchImpl as unknown as typeof fetch,
			}),
		).rejects.toBeInstanceOf(NoSpokenAudioError);
	});

	it("surfaces HTTP errors", async () => {
		const fetchImpl = vi.fn(
			async () => new Response("bad key", { status: 401 }),
		);
		await expect(
			transcribeAudio(provider, Buffer.alloc(10), {
				language: "auto",
				durationMs: 1000,
				contentType: null,
				fetchImpl: fetchImpl as unknown as typeof fetch,
			}),
		).rejects.toThrow("401 bad key");
	});
});
