import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import {
	BestScreenRecorderPage,
	bestScreenRecorderContent,
} from "@/components/pages/seo/BestScreenRecorderPage";
import { ogImageUrl } from "@/lib/og/url";
import { createFAQSchema } from "@/utils/web-schema";

const ogImage = ogImageUrl({
	title: "The best screen recorder for Mac & Windows",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: `Best Screen Recorder in 2026 — Free, No Watermark, 4K Quality | ${BRAND.name}`,
	description:
		"usio is the best screen recorder for Mac and Windows. Record in 4K with audio and webcam overlay, then share instantly. 100% free with no watermarks, no time limits in Studio Mode.",
	alternates: {
		canonical: `${BRAND.url}/best-screen-recorder`,
	},
	openGraph: {
		title: `Best Screen Recorder in 2026 — Free, No Watermark, 4K Quality | ${BRAND.name}`,
		description:
			"usio is the best screen recorder for Mac and Windows. Record in 4K with audio and webcam overlay, then share instantly. Free, open-source, no watermarks.",
		url: `${BRAND.url}/best-screen-recorder`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Best Screen Recorder for Mac and Windows",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Best Screen Recorder in 2026 — Free, No Watermark, 4K Quality | ${BRAND.name}`,
		description:
			"usio is the best screen recorder for Mac and Windows. Record in 4K with audio and webcam overlay, then share instantly. Free, open-source, no watermarks.",
		images: [ogImage],
	},
};

export default function Page() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(createFAQSchema(bestScreenRecorderContent.faqs))}
			</script>
			<BestScreenRecorderPage />
		</>
	);
}
