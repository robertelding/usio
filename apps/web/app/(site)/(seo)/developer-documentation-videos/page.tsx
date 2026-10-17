import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import {
	DeveloperDocumentationVideosPage,
	developerDocumentationVideosContent,
} from "@/components/pages/seo/DeveloperDocumentationVideosPage";
import { ogImageUrl } from "@/lib/og/url";
import { createFAQSchema } from "@/utils/web-schema";

const ogImage = ogImageUrl({
	title: "Developer documentation videos",
	tag: "Solutions",
});

export const metadata: Metadata = {
	title: `Developer Documentation Videos — Record API Demos and SDK Walkthroughs | ${BRAND.name}`,
	description:
		"Create professional developer documentation videos with screen recording. Record API demos, SDK walkthroughs, and technical tutorials instantly. usio is free, open-source, 4K quality, and built for developers.",
	alternates: {
		canonical: `${BRAND.url}/developer-documentation-videos`,
	},
	openGraph: {
		title: `Developer Documentation Videos — Record API Demos and SDK Walkthroughs | ${BRAND.name}`,
		description:
			"Create professional developer documentation videos with screen recording. Record API demos, SDK walkthroughs, and technical tutorials instantly. Free, open-source, and built for developers.",
		url: `${BRAND.url}/developer-documentation-videos`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Developer Documentation Videos",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Developer Documentation Videos — Record API Demos and SDK Walkthroughs | ${BRAND.name}`,
		description:
			"Record API demos, SDK walkthroughs, and changelog videos instantly. Share a link, embed in your docs, get AI transcripts. Free and open-source.",
		images: [ogImage],
	},
};

export default function Page() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(
					createFAQSchema(developerDocumentationVideosContent.faqs),
				)}
			</script>
			<DeveloperDocumentationVideosPage />
		</>
	);
}
