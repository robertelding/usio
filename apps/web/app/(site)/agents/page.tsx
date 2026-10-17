import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { AgentsPage } from "@/components/pages/agents/AgentsPage";
import {
	agentFaqs,
	agentsSeo,
	agentsSoftwareSchema,
	setupSteps,
} from "@/components/pages/agents/content";
import { buildMarketingMetadata } from "@/lib/og/url";
import {
	createBreadcrumbSchema,
	createFAQSchema,
	createHowToSchema,
} from "@/utils/web-schema";

export const metadata: Metadata = {
	...buildMarketingMetadata({
		title: agentsSeo.title,
		description: agentsSeo.description,
		path: agentsSeo.path,
		ogTitle: `${BRAND.name} for Agents`,
		ogDescription:
			"The screen recorder your agent can run. CLI and MCP for Claude Code, Codex, Cursor, and OpenCode.",
		ogTag: "Agents",
	}),
	keywords: [...agentsSeo.keywords],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

const schemas = [
	createBreadcrumbSchema([
		{ name: "Home", url: BRAND.url },
		{ name: "usio for Agents", url: agentsSeo.url },
	]),
	createHowToSchema({
		name: "How to use usio from an AI agent",
		description:
			"Set up the usio screen recorder inside Claude Code, Codex, Cursor, OpenCode, or any shell-capable agent with one pasted prompt.",
		totalTime: "PT3M",
		steps: setupSteps.map((step) => ({ name: step.name, text: step.text })),
	}),
	createFAQSchema(
		agentFaqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
	),
	agentsSoftwareSchema,
];

export default function Page() {
	return (
		<>
			{schemas.map((schema) => (
				<script key={schema["@type"]} type="application/ld+json">
					{JSON.stringify(schema).replace(/</g, "\\u003c")}
				</script>
			))}
			<AgentsPage />
		</>
	);
}
