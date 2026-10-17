import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { ScreenRecordMacPage } from "@/components/pages/seo/ScreenRecordMacPage";
import { hideMarketingPage } from "@/lib/hidden-marketing-pages";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "The best screen recorder for Mac",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: "Best Screen Recorder for Mac | High-Quality, Free & Easy (2026)",
	description:
		"usio is the best free screen recorder for Mac, with HD quality, no time limit in Studio Mode, and easy export. Ideal for tutorials, presentations, and educational videos.",
	openGraph: {
		title: "Best Screen Recorder for Mac | High-Quality, Free & Easy (2026)",
		description:
			"usio is the best free screen recorder for Mac, with HD quality, no time limit in Studio Mode, and easy export. Ideal for tutorials, presentations, and educational videos.",
		url: `${BRAND.url}/screen-recorder-mac`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Best Screen Recorder for Mac",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Best Screen Recorder for Mac | ${BRAND.name}`,
		description:
			"usio is the best free screen recorder for Mac, with HD quality, no time limit in Studio Mode, and easy export. Ideal for tutorials, presentations, and educational videos.",
		images: [ogImage],
	},
	alternates: {
		canonical: `${BRAND.url}/screen-recorder-mac`,
	},
};

export default function Page() {
	hideMarketingPage("/screen-recorder-mac");
	return <ScreenRecordMacPage />;
}
