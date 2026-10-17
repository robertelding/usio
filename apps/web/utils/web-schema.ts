import { BRAND } from "@cap/utils";
import { PRICING } from "@/data/pricing";

const ORGANIZATION_ID = `${BRAND.url}/#organization`;

export const createOrganizationSchema = () => ({
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": ORGANIZATION_ID,
	name: BRAND.name,
	url: BRAND.url,
	logo: {
		"@type": "ImageObject",
		url: `${BRAND.url}/android-chrome-512x512.png`,
		width: 512,
		height: 512,
	},
	description: BRAND.description,
	sameAs: [BRAND.githubUrl],
	contactPoint: {
		"@type": "ContactPoint",
		email: BRAND.contactEmail,
		contactType: "customer service",
	},
});

export const createWebSiteSchema = () => ({
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": `${BRAND.url}/#website`,
	url: BRAND.url,
	name: BRAND.name,
	description: BRAND.tagline,
	publisher: {
		"@id": ORGANIZATION_ID,
	},
});

export const createSoftwareApplicationSchema = () => ({
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	"@id": `${BRAND.url}/#software`,
	name: BRAND.name,
	applicationCategory: "MultimediaApplication",
	operatingSystem: "Web browser",
	description: BRAND.description,
	url: BRAND.url,
	screenshot: [
		{
			"@type": "ImageObject",
			url: `${BRAND.url}/api/og`,
			caption: `${BRAND.name} async video messaging`,
		},
	],
	featureList: [
		"Screen and camera recording in the browser",
		"Instant sharing with links",
		"Comments and emoji reactions",
		"Transcripts, AI titles and summaries",
		"Custom domain support",
		"Bring your own S3-compatible storage",
		"Self-hostable",
		"Open source (AGPLv3)",
	],
	offers: [
		{
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			name: "Free Plan",
			description: "Record and share in your browser",
		},
		{
			"@type": "Offer",
			price: `${PRICING.pro.annualPerMonth}`,
			priceCurrency: "USD",
			name: "Pro Plan",
			priceValidUntil: "2026-12-31",
			description: "Full features for professional use",
			eligibleQuantity: {
				"@type": "QuantitativeValue",
				unitText: "month",
			},
		},
	],
	creator: {
		"@id": ORGANIZATION_ID,
	},
});

export const createBreadcrumbSchema = (
	items: Array<{ name: string; url?: string }>,
) => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: items.map((item, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: item.name,
		...(item.url && { item: item.url }),
	})),
});

export const createVideoObjectSchema = (video: {
	name: string;
	description: string;
	thumbnailUrl: string;
	uploadDate?: string;
	duration?: string;
	embedUrl?: string;
}) => ({
	"@context": "https://schema.org",
	"@type": "VideoObject",
	name: video.name,
	description: video.description,
	thumbnailUrl: video.thumbnailUrl,
	uploadDate: video.uploadDate || new Date().toISOString(),
	duration: video.duration || "PT2M",
	embedUrl: video.embedUrl,
	publisher: {
		"@id": ORGANIZATION_ID,
	},
});

export const createFAQSchema = (
	faqs: Array<{ question: string; answer: string }>,
) => ({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((faq) => ({
		"@type": "Question",
		name: faq.question,
		acceptedAnswer: {
			"@type": "Answer",
			text: faq.answer.replace(/<\/?[^>]+(>|$)/g, ""),
		},
	})),
});

export const createHowToSchema = (params: {
	name: string;
	description: string;
	totalTime?: string;
	steps: Array<{ name: string; text: string }>;
}) => ({
	"@context": "https://schema.org",
	"@type": "HowTo",
	name: params.name,
	description: params.description,
	totalTime: params.totalTime || "PT2M",
	step: params.steps.map((step, index) => ({
		"@type": "HowToStep",
		position: index + 1,
		name: step.name,
		text: step.text,
	})),
});

export const createProductSchema = () => ({
	"@context": "https://schema.org",
	"@type": "Product",
	name: BRAND.name,
	description: BRAND.description,
	brand: {
		"@type": "Brand",
		name: BRAND.name,
	},
	offers: {
		"@type": "AggregateOffer",
		priceCurrency: "USD",
		lowPrice: "0",
		highPrice: `${PRICING.pro.annualPerMonth}`,
		offerCount: "2",
	},
});

export const createComparisonTableSchema = () => ({
	"@context": "https://schema.org",
	"@type": "Table",
	about: `Feature comparison between ${BRAND.name} and Loom`,
	mainEntity: {
		"@type": "ItemList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Open Source",
				item: {
					"@type": "PropertyValue",
					name: BRAND.name,
					value: "Yes",
				},
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Pricing",
				item: {
					"@type": "PropertyValue",
					name: BRAND.name,
					value: `$${PRICING.pro.annualPerMonth}/month per user`,
				},
			},
			{
				"@type": "ListItem",
				position: 3,
				name: "Self-hosting",
				item: {
					"@type": "PropertyValue",
					name: BRAND.name,
					value: "Yes",
				},
			},
		],
	},
});

export const createLocalBusinessSchema = () => ({
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	name: BRAND.name,
	image: `${BRAND.url}/api/og`,
	"@id": BRAND.url,
	url: BRAND.url,
	priceRange: `$0-$${PRICING.pro.annualPerMonth}`,
});
