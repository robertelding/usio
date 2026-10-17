import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { ScreenRecordingSoftwarePage } from "@/components/pages/seo/ScreenRecordingSoftwarePage";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "Screen recording software for Mac & Windows",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: `Screen Recording Software — Free HD Screen Capture | ${BRAND.name}`,
	description:
		"Free, open-source screen recording software for Mac and Windows. Capture HD video with audio, share instantly, and own your data. Download usio today.",
	alternates: {
		canonical: `${BRAND.url}/screen-recording-software`,
	},
	openGraph: {
		title: `Screen Recording Software — Free HD Screen Capture | ${BRAND.name}`,
		description:
			"Free, open-source screen recording software for Mac and Windows. Capture HD video with audio, share instantly, and own your data.",
		url: `${BRAND.url}/screen-recording-software`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Screen Recording Software",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Screen Recording Software — Free HD Screen Capture | ${BRAND.name}`,
		description:
			"Free, open-source screen recording software for Mac and Windows. Capture HD video with audio, share instantly, and own your data.",
		images: [ogImage],
	},
};

export default function Page() {
	return <ScreenRecordingSoftwarePage />;
}
