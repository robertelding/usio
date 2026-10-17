import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { buildMarketingMetadata } from "@/lib/og/url";
import { createBreadcrumbSchema } from "@/utils/web-schema";
import { PageContent } from "./PageContent";

export const metadata: Metadata = buildMarketingMetadata({
	title: "Online Tools | Free Browser-Based Utilities",
	description:
		"Discover usio's collection of free online tools for file conversion, video editing, and more. All tools run directly in your browser for maximum privacy.",
	path: "/tools",
	ogTitle: "Free online tools, right in your browser",
	ogTag: "Tools",
});

const breadcrumbSchema = createBreadcrumbSchema([
	{ name: "Home", url: BRAND.url },
	{ name: "Tools", url: `${BRAND.url}/tools` },
]);

export default function ToolsPage() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			<PageContent />
		</>
	);
}
