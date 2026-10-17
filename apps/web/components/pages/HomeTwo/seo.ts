import { BRAND } from "@cap/utils";
import { PRICING } from "@/data/pricing";

export const homepageSeo = {
	url: `${BRAND.url}/`,
	title: "usio — Async Video Messages & Open Source Loom Alternative",
	description:
		"usio is the open source Loom alternative. Record your screen and camera in the browser, then share a video link the moment you stop.",
} as const;

export const homepageSchema = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${BRAND.url}/#organization`,
			name: "usio",
			url: homepageSeo.url,
			logo: {
				"@type": "ImageObject",
				url: `${BRAND.url}/android-chrome-512x512.png`,
				width: 512,
				height: 512,
			},
			sameAs: [BRAND.githubUrl],
			contactPoint: {
				"@type": "ContactPoint",
				email: BRAND.contactEmail,
				contactType: "customer support",
			},
		},
		{
			"@type": "WebSite",
			"@id": `${BRAND.url}/#website`,
			name: "usio",
			url: homepageSeo.url,
			publisher: { "@id": `${BRAND.url}/#organization` },
			inLanguage: "en",
		},
		{
			"@type": "WebPage",
			"@id": `${BRAND.url}/#webpage`,
			url: homepageSeo.url,
			name: homepageSeo.title,
			description: homepageSeo.description,
			isPartOf: { "@id": `${BRAND.url}/#website` },
			mainEntity: { "@id": `${BRAND.url}/#software` },
			inLanguage: "en",
		},
		{
			"@type": "SoftwareApplication",
			"@id": `${BRAND.url}/#software`,
			name: "usio",
			url: homepageSeo.url,
			description: homepageSeo.description,
			applicationCategory: "MultimediaApplication",
			operatingSystem: "Web browser",
			publisher: { "@id": `${BRAND.url}/#organization` },
			mainEntityOfPage: { "@id": `${BRAND.url}/#webpage` },
			featureList: [
				"Screen, webcam, and audio recording in the browser",
				"Instant video sharing",
				"Comments, reactions, transcripts and AI summaries",
				"Loom video importer for single videos and CSV libraries",
				"Google Drive and S3 storage integrations",
				"Open source and self-hostable",
			],
			offers: [
				{
					"@type": "Offer",
					name: "usio Free",
					price: 0,
					priceCurrency: "USD",
					url: `${BRAND.url}/download`,
					description: "Free local recording and editing for personal use.",
				},
				...(BRAND.desktopAppAvailable
					? [
							{
								"@type": "Offer",
								name: "Desktop License",
								price: PRICING.commercial.lifetime,
								priceCurrency: "USD",
								url: `${BRAND.url}/pricing`,
								description: "One-time desktop license for commercial use.",
							},
						]
					: []),
				{
					"@type": "Offer",
					name: "usio Pro",
					price: PRICING.pro.monthly,
					priceCurrency: "USD",
					url: `${BRAND.url}/pricing`,
					description:
						"Per user, billed monthly. Annual billing is also available.",
				},
			],
		},
	],
};
