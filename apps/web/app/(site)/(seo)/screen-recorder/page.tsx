import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import {
	ScreenRecorderPage,
	screenRecorderContent,
} from "@/components/pages/seo/ScreenRecorderPage";
import { ogImageUrl } from "@/lib/og/url";
import { createFAQSchema } from "@/utils/web-schema";

const ogImage = ogImageUrl({
	title: "Screen recorder for Mac & Windows",
	tag: "Screen Recorder",
});

export const metadata: Metadata = {
	title: "Screen Recorder: High-Quality, User-Friendly, and 100% Free Locally",
	description:
		"usio is a powerful, user-friendly screen recorder and is 100% free locally with no usage limits. Perfect for team collaboration, creating tutorials, or recording professional presentations.",
	openGraph: {
		title:
			"Screen Recorder: High-Quality, User-Friendly, and 100% Free Locally",
		description:
			"usio is a powerful, user-friendly screen recorder and is 100% free locally with no usage limits.",
		url: `${BRAND.url}/screen-recorder`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Free Screen Recorder",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title:
			"Screen Recorder: High-Quality, User-Friendly, and 100% Free Locally",
		description:
			"usio is a powerful, user-friendly screen recorder and is 100% free locally with no usage limits.",
		images: [ogImage],
	},
	alternates: {
		canonical: `${BRAND.url}/screen-recorder`,
	},
};

export default function Page() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(createFAQSchema(screenRecorderContent.faqs))}
			</script>
			<ScreenRecorderPage />
		</>
	);
}
