import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { hideMarketingPage } from "@/lib/hidden-marketing-pages";
import { buildMarketingMetadata } from "@/lib/og/url";
import { StudioModePage } from "./StudioModePage";

export const metadata: Metadata = buildMarketingMetadata({
	title: `Studio Mode - Professional Screen Recording | ${BRAND.name}`,
	description:
		"Create professional-quality screen recordings with usio Studio Mode. Local recording, 4K 60fps quality, precision editing tools, and complete privacy control.",
	path: "/features/studio-mode",
	ogTitle: "Studio Mode — pro-quality recordings",
	ogDescription:
		"Local recording, 4K 60fps quality, precision editing tools, and complete privacy control.",
	ogTag: "Features",
});

export default function Page() {
	hideMarketingPage("/features/studio-mode");
	return <StudioModePage />;
}
