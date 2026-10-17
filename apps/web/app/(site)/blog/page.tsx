import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { UpdatesPage } from "@/components/pages/UpdatesPage";
import { hideMarketingPage } from "@/lib/hidden-marketing-pages";
import { buildMarketingMetadata } from "@/lib/og/url";

export const metadata: Metadata = buildMarketingMetadata({
	title: `Blog — ${BRAND.name}`,
	description:
		"Product updates, guides, and insights from the team building usio.",
	path: "/blog",
	ogTitle: `The ${BRAND.name} blog`,
	ogTag: "Blog",
});

export default function App() {
	hideMarketingPage("/blog");
	return <UpdatesPage />;
}
