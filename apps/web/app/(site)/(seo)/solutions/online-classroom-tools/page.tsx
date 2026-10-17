import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { OnlineClassroomToolsPage } from "@/components/pages/seo/OnlineClassroomToolsPage";
import { ogImageUrl } from "@/lib/og/url";

const ogImage = ogImageUrl({
	title: "Online classroom tools for educators",
	tag: "Solutions",
});

export const metadata: Metadata = {
	title: `Online Classroom Tools: Empower Remote Teaching with ${BRAND.name}`,
	description:
		"Searching for online classroom tools? Learn how usio's screen recorder helps educators create engaging lessons, manage student feedback, and streamline remote learning.",
	openGraph: {
		title: `Online Classroom Tools: Empower Remote Teaching with ${BRAND.name}`,
		description:
			"Learn how usio's screen recorder helps educators create engaging lessons, manage student feedback, and streamline remote learning.",
		url: `${BRAND.url}/solutions/online-classroom-tools`,
		siteName: BRAND.name,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "usio: Online Classroom Tools",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: `Online Classroom Tools | ${BRAND.name} Screen Recorder`,
		description:
			"Learn how usio's screen recorder helps educators create engaging lessons, manage student feedback, and streamline remote learning.",
		images: [ogImage],
	},
	alternates: {
		canonical: `${BRAND.url}/solutions/online-classroom-tools`,
	},
};

export default OnlineClassroomToolsPage;
