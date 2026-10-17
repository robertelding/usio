import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { DailyStandupSoftwarePage } from "@/components/pages/seo/DailyStandupSoftwarePage";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "Async daily standups with video",
	tag: "Solutions",
});

export const metadata: Metadata = {
	title: `Daily Standup Software: Streamline Your Agile Meetings with ${BRAND.name}`,
	description:
		"Looking for daily standup software? Discover how usio helps remote or hybrid teams run async standups efficiently—no more timezone conflicts!",
	openGraph: {
		title: `Daily Standup Software: Streamline Your Agile Meetings with ${BRAND.name}`,
		description:
			"Looking for daily standup software? Discover how usio helps remote or hybrid teams run async standups efficiently—no more timezone conflicts!",
		url: `${BRAND.url}/solutions/daily-standup-software`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Daily Standup Software",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Daily Standup Software: Streamline Your Agile Meetings with ${BRAND.name}`,
		description:
			"Looking for daily standup software? Discover how usio helps remote or hybrid teams run async standups efficiently—no more timezone conflicts!",
		images: [ogImage],
	},
	alternates: {
		canonical: `${BRAND.url}/solutions/daily-standup-software`,
	},
};

export default DailyStandupSoftwarePage;
