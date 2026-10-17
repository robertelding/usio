import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/pricing/PricingPage";
import { buildMarketingMetadata } from "@/lib/og/url";

export const metadata: Metadata = buildMarketingMetadata({
	title: `Pricing — ${BRAND.name}`,
	description: `Simple pricing for ${BRAND.name}: record, share and collaborate on async video, with ${BRAND.proPlanName} for teams that need more.`,
	path: "/pricing",
	ogTitle: "Simple, honest pricing",
	ogDescription:
		"Start free. Pay when you need commercial rights or the cloud, and cancel whenever you like.",
	ogTag: "Pricing",
});

export default function App() {
	return <PricingPage />;
}
