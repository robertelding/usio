import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { ScreenRecordWindowsPage } from "@/components/pages/seo/ScreenRecordWindowsPage";
import { hideMarketingPage } from "@/lib/hidden-marketing-pages";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "Free screen recorder for Windows 10 & 11",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: `Best Free Screen Recorder for Windows 10 & 11 | ${BRAND.name}`,
	description:
		"Record your screen on Windows with usio — free, open-source screen recorder with HD video, audio, webcam overlay, and instant sharing. No watermarks. Works on Windows 10 & 11.",
	openGraph: {
		title: `Best Free Screen Recorder for Windows 10 & 11 | ${BRAND.name}`,
		description:
			"Record your screen on Windows with usio — free, open-source screen recorder with HD video, audio, webcam overlay, and instant sharing. No watermarks. Works on Windows 10 & 11.",
		url: `${BRAND.url}/screen-recorder-windows`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Best Free Screen Recorder for Windows",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Best Free Screen Recorder for Windows 10 & 11 | ${BRAND.name}`,
		description:
			"Record your screen on Windows with usio — free, open-source screen recorder with HD video, audio, webcam overlay, and instant sharing. No watermarks.",
		images: [ogImage],
	},
	alternates: {
		canonical: `${BRAND.url}/screen-recorder-windows`,
	},
};

export default function Page() {
	hideMarketingPage("/screen-recorder-windows");
	return <ScreenRecordWindowsPage />;
}
