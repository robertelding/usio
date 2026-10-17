import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { SupportPage } from "@/components/pages/SupportPage";
import { buildMarketingMetadata } from "@/lib/og/url";

export const metadata: Metadata = buildMarketingMetadata({
	title: `Support — ${BRAND.name}`,
	description: `Get help with ${BRAND.name}. Join our Discord community, email ${BRAND.contactEmail}, read the docs, or report an issue on GitHub.`,
	path: "/support",
	ogTitle: `Get help with ${BRAND.name}`,
	ogTag: "Support",
});

export default function App() {
	return <SupportPage />;
}
