import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { buildMarketingMetadata } from "@/lib/og/url";

export const metadata: Metadata = buildMarketingMetadata({
	title: `FAQ — ${BRAND.name}`,
	path: "/faq",
	ogTitle: "Frequently asked questions",
	ogTag: "FAQ",
});

export default function App() {
	return <FaqPage />;
}
