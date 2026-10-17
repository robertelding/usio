import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import {
	ObsAlternativePage,
	obsAlternativeContent,
} from "@/components/pages/seo/ObsAlternativePage";
import { ogImageUrl } from "@/lib/og/url";
import { createFAQSchema } from "@/utils/web-schema";

const ogImage = ogImageUrl({
	title: "The simple OBS alternative",
	tag: "Compare",
});

export const metadata: Metadata = {
	title: `OBS Alternative — Easier Screen Recording with Instant Sharing | ${BRAND.name}`,
	description:
		"usio is the modern OBS alternative for async screen sharing. Record in 4K, get a shareable link in seconds, and collaborate with timestamped comments. No configuration required.",
	alternates: {
		canonical: `${BRAND.url}/obs-alternative`,
	},
	openGraph: {
		title: `OBS Alternative — Easier Screen Recording with Instant Sharing | ${BRAND.name}`,
		description:
			"usio is the modern OBS alternative for async screen sharing. Record in 4K, get a shareable link in seconds, and collaborate with timestamped comments. No configuration required.",
		url: `${BRAND.url}/obs-alternative`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: OBS Alternative for Async Screen Recording",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `OBS Alternative — Easier Screen Recording with Instant Sharing | ${BRAND.name}`,
		description:
			"usio is the modern OBS alternative for async screen sharing. Record in 4K, get a shareable link in seconds, and collaborate with timestamped comments. No configuration required.",
		images: [ogImage],
	},
};

export default function Page() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(createFAQSchema(obsAlternativeContent.faqs))}
			</script>
			<ObsAlternativePage />
		</>
	);
}
