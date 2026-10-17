import { BRAND } from "@cap/utils";
import { describe, expect, it } from "vitest";
import {
	MESSENGER_AGENT,
	MESSENGER_AGENT_NAME,
	MESSENGER_AGENT_PROMPT,
	MESSENGER_ASSISTANT_TITLE,
	MESSENGER_SUGGESTED_PROMPTS,
	SUPPORT_REFERENCE_GUIDE,
} from "@/lib/messenger/constants";

describe("support assistant branding", () => {
	it("presents the assistant as Ask Clara while keeping the stored agent id", () => {
		expect(MESSENGER_AGENT_NAME).toBe("Clara");
		expect(MESSENGER_ASSISTANT_TITLE).toBe("Ask Clara");
		expect(MESSENGER_AGENT.label).toBe("Clara");
		expect(MESSENGER_AGENT.id).toBe("Millie");
	});

	it("introduces Clara as working at the product", () => {
		expect(MESSENGER_AGENT_PROMPT).toContain(
			`You are Clara, you work at ${BRAND.name}.`,
		);
		expect(MESSENGER_AGENT_PROMPT).not.toContain("Millie");
		expect(MESSENGER_SUGGESTED_PROMPTS).toContain(`What can ${BRAND.name} do?`);
	});

	it("only links to the product's own site and keeps the claim guardrails", () => {
		for (const text of [SUPPORT_REFERENCE_GUIDE, MESSENGER_AGENT_PROMPT]) {
			expect(text).not.toContain("cap.so");
			expect(text).not.toContain("${");
		}
		expect(SUPPORT_REFERENCE_GUIDE).toContain(`${BRAND.url}/pricing`);
		expect(SUPPORT_REFERENCE_GUIDE).toContain("has no desktop app yet");
		expect(SUPPORT_REFERENCE_GUIDE).toContain(
			"does not hold SOC 2, ISO 27001 or HIPAA certifications",
		);
		expect(SUPPORT_REFERENCE_GUIDE).toContain("Don't quote prices");
	});
});
