import { BRAND } from "@cap/utils";
import { PRICING } from "@/data/pricing";
import {
	createBreadcrumbSchema,
	createFAQSchema,
	createOrganizationSchema,
	createProductSchema,
	createSoftwareApplicationSchema,
	createWebSiteSchema,
} from "@/utils/web-schema";

const homePageFAQs = [
	{
		question: "What is usio?",
		answer:
			"usio is an open-source screen recording software that offers beautiful, lightweight recordings with instant sharing capabilities. It's the privacy-focused alternative to Loom.",
	},
	{
		question: "How much does usio cost?",
		answer: `usio offers a generous free plan with Studio mode for personal use and 5-minute shareable links. The Pro plan starts at just $${PRICING.pro.annualPerMonth}/month per user, which is less than half the price of Loom.`,
	},
	{
		question: "Is usio available for Windows and Mac?",
		answer:
			"Yes, usio is available for both macOS and Windows, providing consistent performance and features across both platforms.",
	},
	{
		question: "Can I use my own storage with usio?",
		answer:
			"Yes, usio allows you to connect your own Google Drive or S3 storage and a custom domain, giving you 100% ownership and control over your content.",
	},
	{
		question: "What makes usio different from other screen recorders?",
		answer:
			"usio is fully open-source, privacy-focused, and offers unique features like Studio mode (free for personal use), 4K recording at 60fps, built-in thread commenting, and the ability to use your own storage and domain.",
	},
	{
		question: "Does usio support team collaboration?",
		answer:
			"Yes, usio includes built-in thread commenting on shareable links, making it easy to collaborate with teammates and collect feedback directly on your recordings.",
	},
];

const createHomePageSchema = () => {
	const schemas = [
		createOrganizationSchema(),
		createWebSiteSchema(),
		createSoftwareApplicationSchema(),
		createProductSchema(),
		createBreadcrumbSchema([{ name: "Home", url: BRAND.url }]),
		createFAQSchema(homePageFAQs),
	];

	return JSON.stringify(schemas);
};

export const HomePageSchema = () => {
	return <script type="application/ld+json">{createHomePageSchema()}</script>;
};
