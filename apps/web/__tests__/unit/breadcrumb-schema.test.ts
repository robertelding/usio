import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createBreadcrumbSchema } from "@/utils/web-schema";

const BRAND_URL = ["$", "{BRAND.url}"].join("");

describe("createBreadcrumbSchema", () => {
	it("produces valid BreadcrumbList schema structure", () => {
		const schema = createBreadcrumbSchema([
			{ name: "Home", url: "https://usio.co.uk" },
			{ name: "Tools", url: "https://usio.co.uk/tools" },
		]);

		expect(schema["@context"]).toBe("https://schema.org");
		expect(schema["@type"]).toBe("BreadcrumbList");
		expect(Array.isArray(schema.itemListElement)).toBe(true);
		expect(schema.itemListElement).toHaveLength(2);
	});

	it("maps each item to a ListItem with correct position and name", () => {
		const schema = createBreadcrumbSchema([
			{ name: "Home", url: "https://usio.co.uk" },
			{ name: "Tools", url: "https://usio.co.uk/tools" },
			{ name: "Convert", url: "https://usio.co.uk/tools/convert" },
		]);

		expect(schema.itemListElement[0]).toEqual({
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://usio.co.uk",
		});
		expect(schema.itemListElement[1]).toEqual({
			"@type": "ListItem",
			position: 2,
			name: "Tools",
			item: "https://usio.co.uk/tools",
		});
		expect(schema.itemListElement[2]?.position).toBe(3);
		expect(schema.itemListElement[2]?.name).toBe("Convert");
	});

	it("omits item field when no url is provided", () => {
		const schema = createBreadcrumbSchema([
			{ name: "Home", url: "https://usio.co.uk" },
			{ name: "Current Page" },
		]);
		const currentPageItem = schema.itemListElement[1];

		expect(schema.itemListElement[0]?.item).toBe("https://usio.co.uk");
		expect(currentPageItem).toBeDefined();
		expect(currentPageItem && "item" in currentPageItem).toBe(false);
	});

	it("handles single item breadcrumb", () => {
		const schema = createBreadcrumbSchema([
			{ name: "Home", url: "https://usio.co.uk" },
		]);

		expect(schema.itemListElement).toHaveLength(1);
		expect(schema.itemListElement[0]?.position).toBe(1);
	});

	it("handles empty array", () => {
		const schema = createBreadcrumbSchema([]);

		expect(schema["@type"]).toBe("BreadcrumbList");
		expect(schema.itemListElement).toHaveLength(0);
	});

	it("produces JSON-serializable output", () => {
		const schema = createBreadcrumbSchema([
			{ name: "Home", url: "https://usio.co.uk" },
			{ name: "Tools", url: "https://usio.co.uk/tools" },
			{
				name: "Video Speed Controller",
				url: "https://usio.co.uk/tools/video-speed-controller",
			},
		]);

		expect(() => JSON.stringify(schema)).not.toThrow();

		const parsed = JSON.parse(JSON.stringify(schema));
		expect(parsed["@type"]).toBe("BreadcrumbList");
		expect(parsed["@context"]).toBe("https://schema.org");
		expect(parsed.itemListElement).toHaveLength(3);
	});
});

const appDir = join(process.cwd(), "app");

function readPage(routePath: string): string {
	return readFileSync(join(appDir, routePath), "utf-8");
}

const toolPages: Array<{ file: string; breadcrumbItems: string[] }> = [
	{
		file: "(site)/tools/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools`],
	},
	{
		file: "(site)/tools/convert/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools`, `${BRAND_URL}/tools/convert`],
	},
	{
		file: "(site)/tools/convert/mov-to-mp4/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/mov-to-mp4`],
	},
	{
		file: "(site)/tools/convert/mp4-to-gif/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/mp4-to-gif`],
	},
	{
		file: "(site)/tools/convert/webm-to-mp4/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/webm-to-mp4`],
	},
	{
		file: "(site)/tools/convert/avi-to-mp4/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/avi-to-mp4`],
	},
	{
		file: "(site)/tools/convert/mkv-to-mp4/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/mkv-to-mp4`],
	},
	{
		file: "(site)/tools/convert/mp4-to-mp3/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/mp4-to-mp3`],
	},
	{
		file: "(site)/tools/convert/mp4-to-webm/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/convert/mp4-to-webm`],
	},
	{
		file: "(site)/tools/video-speed-controller/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/video-speed-controller`],
	},
	{
		file: "(site)/tools/loom-downloader/page.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/loom-downloader`],
	},
	{
		file: "(site)/tools/trim/layout.tsx",
		breadcrumbItems: [`${BRAND_URL}/tools/trim`],
	},
];

describe("Breadcrumb structured data in tools pages", () => {
	for (const { file, breadcrumbItems } of toolPages) {
		it(`${file} calls createBreadcrumbSchema`, () => {
			const content = readPage(file);
			expect(content).toContain("createBreadcrumbSchema");
		});

		it(`${file} contains Home breadcrumb`, () => {
			const content = readPage(file);
			expect(content).toContain("BRAND.url");
		});

		for (const url of breadcrumbItems) {
			it(`${file} contains breadcrumb url "${url}"`, () => {
				const content = readPage(file);
				expect(content).toContain(url);
			});
		}
	}

	it("dynamic [conversionPath] route generates breadcrumb from path param", () => {
		const content = readPage("(site)/tools/convert/[conversionPath]/page.tsx");
		expect(content).toContain("createBreadcrumbSchema");
		expect(content).toContain(
			`\`${BRAND_URL}/tools/convert/\${conversionPath}\``,
		);
	});
});
