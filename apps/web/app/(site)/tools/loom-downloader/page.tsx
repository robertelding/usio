import { BRAND } from "@cap/utils";
import type { Metadata } from "next";
import { LoomDownloader } from "@/components/tools/LoomDownloader";
import { ToolsPageTemplate } from "@/components/tools/ToolsPageTemplate";
import type { ToolPageContent } from "@/components/tools/types";
import { PRICING } from "@/data/pricing";
import { ogImageUrl } from "@/lib/og/url";
import { createBreadcrumbSchema } from "@/utils/web-schema";

const ogImage = ogImageUrl({
	title: "Download Loom videos",
	tag: "Tools",
});

export const metadata: Metadata = {
	title: `Loom Video Downloader — Download Loom Videos Free + Migrate to ${BRAND.name} | ${BRAND.name}`,
	description:
		"Download any Loom video for free with usio's online Loom video downloader. Then migrate your entire Loom library to usio — the open source Loom alternative — with 20% off using code MIGRATE20.",
	keywords: [
		"loom video downloader",
		"download loom video",
		"loom downloader",
		"save loom video",
		"loom video download free",
		"loom to mp4",
		"download loom recording",
		"loom video saver",
		"free loom downloader",
		"loom download tool",
		"import loom videos",
		"loom video importer",
		"migrate from loom",
		"loom to cap migration",
		"loom alternative",
		"switch from loom",
	],
	openGraph: {
		title: `Loom Video Downloader — Free Download + Migrate to ${BRAND.name}`,
		description:
			"Download any Loom video for free. Then migrate your whole Loom library to usio and save 20% with MIGRATE20. Built by usio, the open source Loom alternative.",
		url: `${BRAND.url}/tools/loom-downloader`,
		siteName: BRAND.name,
		type: "website",
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: "Download Loom videos",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `Loom Video Downloader — Free Download + Migrate to ${BRAND.name}`,
		description:
			"Download any Loom video for free — then migrate your whole library to usio with 20% off using MIGRATE20.",
		images: [ogImage],
	},
	alternates: {
		canonical: `${BRAND.url}/tools/loom-downloader`,
	},
};

const pageContent: ToolPageContent = {
	title: "Loom Video Downloader",
	description:
		"Download any public Loom video as an MP4 — or skip the one-by-one downloads and migrate your whole Loom library to usio with 20% off using code MIGRATE20.",
	featuresTitle: "Download Loom videos, then move your whole library to usio",
	featuresDescription:
		"usio's Loom downloader is free, fast, and requires zero setup. When you're ready to leave Loom for good, usio Pro's built-in <a href=\"/migrate-from-loom\">Loom video importer</a> moves your entire workspace in one click.",
	features: [
		{
			title: "Instant Downloads",
			description:
				"Paste a Loom link and get your MP4 in seconds. No waiting, no queues, no processing delays.",
		},
		{
			title: "No Account Required",
			description:
				"No signup, no login, no email. Just paste your Loom URL and download the video immediately.",
		},
		{
			title: "100% Free to Download",
			description:
				"Completely free with no limits on downloads. Save as many Loom videos as you need — then switch to usio to stop paying Loom's $18/user/month.",
		},
		{
			title: "Import Your Whole Loom Library",
			description:
				'usio Pro includes a built-in <a href="/loom-alternative">Loom video importer</a> that transfers every Loom video you\'ve recorded — titles, transcripts, and chapters included — without manual re-uploads.',
		},
		{
			title: "Half the Price of Loom",
			description: `usio Pro starts from just $${PRICING.pro.annualPerMonth}/user/month vs Loom's $18/user/month. Use code <strong>MIGRATE20</strong> at checkout for an extra 20% off your first year.`,
		},
		{
			title: "Open Source & Privacy-First",
			description:
				'usio is the <a href="/">open source Loom alternative</a>. Bring your own S3 bucket, connect your own domain, and own 100% of your video data.',
		},
	],
	faqs: [
		{
			question: "How do I download a Loom video?",
			answer:
				'Paste the Loom video URL into the input above and click "Download Video". The MP4 file will start downloading automatically. You can find Loom URLs by clicking the share button on any Loom video.',
		},
		{
			question: "Is this Loom video downloader free?",
			answer:
				"Yes, 100% free with no limits. There's no signup required, no premium tier, and no cap on the number of videos you can download.",
		},
		{
			question: "What is MIGRATE20 and how do I use it?",
			answer:
				'<strong>MIGRATE20</strong> is a 20% discount code for new usio Pro subscribers who are switching from Loom. Just apply it at <a href="/pricing">checkout on the pricing page</a> to take 20% off your first year of usio Pro — including the built-in Loom video importer.',
		},
		{
			question: "Can I import all my Loom videos into usio at once?",
			answer:
				'Yes. usio Pro\'s built-in <a href="/loom-alternative">Loom video importer</a> connects to your Loom workspace and transfers every video in one go — titles, transcripts, chapters, and all — without you having to download and re-upload anything manually.',
		},
		{
			question: "Why migrate from Loom to usio?",
			answer: `usio is the open source Loom alternative built for teams that care about data ownership and price. You get unlimited cloud storage, instant shareable links, AI captions, custom domains, and your own S3 bucket — all from $${PRICING.pro.annualPerMonth}/user/month vs Loom's $18/user/month. Use MIGRATE20 for an additional 20% off.`,
		},
		{
			question: "Can I download private Loom videos?",
			answer:
				"No, this tool only works with publicly accessible Loom videos. If a video requires a password or is set to private, you'll need to ask the video creator to make it public or share the download directly.",
		},
		{
			question: "What video format are downloads in?",
			answer:
				"All Loom videos are downloaded in MP4 format, which is compatible with virtually every device, media player, and video editor.",
		},
		{
			question: "Do you store my downloaded videos?",
			answer:
				"No. The free downloader resolves public Loom videos in your browser and saves the MP4 to your device. usio Pro's Loom importer uses usio's server-side import pipeline when you choose to migrate videos into your usio workspace.",
		},
		{
			question: "What is usio?",
			answer:
				'usio is the <a href="/">open source alternative to Loom</a>. It\'s a privacy-focused screen recorder that lets you record, edit, and share videos instantly — with unlimited storage, custom domains, and a built-in Loom video importer. <a href="/download">Download usio for free</a>.',
		},
	],
	cta: {
		title: "Ready to leave Loom for good?",
		description:
			"Skip the one-by-one downloads. usio Pro imports your entire Loom library in one click — and costs half what Loom charges. Use MIGRATE20 at checkout for an extra 20% off your first year.",
		buttonText: "Migrate to usio Pro — save 20%",
		buttonHref:
			"/pricing?promo=MIGRATE20&utm_source=loom-downloader&utm_campaign=migrate20",
		secondaryButtonText: "Download usio free",
		secondaryButtonHref: "/download",
	},
};

const breadcrumbSchema = createBreadcrumbSchema([
	{ name: "Home", url: BRAND.url },
	{ name: "Tools", url: `${BRAND.url}/tools` },
	{
		name: "Loom Video Downloader",
		url: `${BRAND.url}/tools/loom-downloader`,
	},
]);

export default function LoomDownloaderPage() {
	return (
		<>
			<script type="application/ld+json">
				{JSON.stringify(breadcrumbSchema)}
			</script>
			<ToolsPageTemplate
				content={pageContent}
				toolComponent={<LoomDownloader />}
			/>
		</>
	);
}
