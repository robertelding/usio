import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const BRAND_URL = ["$", "{BRAND.url}"].join("");

const appDir = join(process.cwd(), "app");

function readPage(routePath: string): string {
	return readFileSync(join(appDir, routePath), "utf-8");
}

const expectedCanonicals: Array<{ file: string; canonical: string }> = [
	{
		file: "(site)/(seo)/best-screen-recorder/page.tsx",
		canonical: "https://usio.co.uk/best-screen-recorder",
	},
	{
		file: "(site)/(seo)/screen-recorder/page.tsx",
		canonical: "https://usio.co.uk/screen-recorder",
	},
	{
		file: "(site)/(seo)/free-screen-recorder/page.tsx",
		canonical: "https://usio.co.uk/free-screen-recorder",
	},
	{
		file: "(site)/(seo)/loom-alternative/page.tsx",
		canonical: "https://usio.co.uk/loom-alternative",
	},
	{
		file: "(site)/(seo)/screen-recorder-mac/page.tsx",
		canonical: "https://usio.co.uk/screen-recorder-mac",
	},
	{
		file: "(site)/(seo)/screen-recorder-windows/page.tsx",
		canonical: "https://usio.co.uk/screen-recorder-windows",
	},
	{
		file: "(site)/(seo)/screen-recording/page.tsx",
		canonical: "https://usio.co.uk/screen-recording",
	},
	{
		file: "(site)/(seo)/screen-recording-software/page.tsx",
		canonical: "https://usio.co.uk/screen-recording-software",
	},
	{
		file: "(site)/(seo)/solutions/agencies/page.tsx",
		canonical: "https://usio.co.uk/solutions/agencies",
	},
	{
		file: "(site)/(seo)/solutions/daily-standup-software/page.tsx",
		canonical: "https://usio.co.uk/solutions/daily-standup-software",
	},
	{
		file: "(site)/(seo)/solutions/employee-onboarding-platform/page.tsx",
		canonical: "https://usio.co.uk/solutions/employee-onboarding-platform",
	},
	{
		file: "(site)/(seo)/solutions/online-classroom-tools/page.tsx",
		canonical: "https://usio.co.uk/solutions/online-classroom-tools",
	},
	{
		file: "(site)/(seo)/solutions/remote-team-collaboration/page.tsx",
		canonical: "https://usio.co.uk/solutions/remote-team-collaboration",
	},
	{
		file: "(site)/tools/page.tsx",
		canonical: "https://usio.co.uk/tools",
	},
	{
		file: "(site)/tools/convert/page.tsx",
		canonical: "https://usio.co.uk/tools/convert",
	},
	{
		file: "(site)/tools/trim/metadata.ts",
		canonical: "https://usio.co.uk/tools/trim",
	},
	{
		file: "(site)/tools/video-speed-controller/page.tsx",
		canonical: "https://usio.co.uk/tools/video-speed-controller",
	},
	{
		file: "(site)/tools/convert/webm-to-mp4/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/webm-to-mp4",
	},
	{
		file: "(site)/tools/convert/avi-to-mp4/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/avi-to-mp4",
	},
	{
		file: "(site)/tools/convert/mkv-to-mp4/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/mkv-to-mp4",
	},
	{
		file: "(site)/tools/convert/mov-to-mp4/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/mov-to-mp4",
	},
	{
		file: "(site)/tools/convert/mp4-to-gif/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/mp4-to-gif",
	},
	{
		file: "(site)/tools/convert/mp4-to-mp3/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/mp4-to-mp3",
	},
	{
		file: "(site)/tools/convert/mp4-to-webm/page.tsx",
		canonical: "https://usio.co.uk/tools/convert/mp4-to-webm",
	},
	{
		file: "(site)/(seo)/hipaa-compliant-screen-recording/page.tsx",
		canonical: "https://usio.co.uk/hipaa-compliant-screen-recording",
	},
	{
		file: "(site)/(seo)/google-chrome-screen-recorder/page.tsx",
		canonical: "https://usio.co.uk/google-chrome-screen-recorder",
	},
];

describe("Canonical URLs", () => {
	for (const { file, canonical } of expectedCanonicals) {
		it(`${file} contains canonical "${canonical}"`, () => {
			const content = readPage(file);
			// Pages either declare the absolute canonical directly or pass the
			// relative path to buildMarketingMetadata (resolved against
			// metadataBase at runtime — same output).
			const relativePath = canonical.replace("https://usio.co.uk", "");
			const hasCanonical =
				content.includes(`canonical: "${canonical}"`) ||
				content.includes(`canonical: \`${BRAND_URL}${relativePath}\``) ||
				content.includes(`path: "${relativePath}"`);
			expect(hasCanonical).toBe(true);
		});
	}

	it("dynamic [conversionPath] route generates canonical from path param", () => {
		const content = readPage("(site)/tools/convert/[conversionPath]/page.tsx");
		expect(content).toContain(
			`canonical: \`${BRAND_URL}/tools/convert/\${conversionPath}\``,
		);
	});
});
