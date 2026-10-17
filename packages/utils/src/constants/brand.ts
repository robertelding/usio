export type Brand = {
	readonly name: string;
	readonly proPlanName: string;
	readonly aiName: string;
	readonly company: string;
	readonly tagline: string;
	readonly description: string;
	readonly color: string;
	readonly domain: string;
	readonly url: string;
	readonly contactEmail: string;
	readonly githubRepo: string;
	readonly githubUrl: string;
	readonly emailFromName: string;
	readonly desktopAppAvailable: boolean;
	readonly chromeExtensionUrl: string | null;
	readonly supportUrl: string | null;
	readonly supportAssistantEnabled: boolean;
};

export const BRAND: Brand = {
	name: "usio",
	proPlanName: "usio Pro",
	aiName: "usio AI",
	company: "usio",
	tagline: "Async video messages, recorded and shared in seconds.",
	description:
		"usio is an open-source async video messaging tool. Record your screen and camera, then share a link the moment you stop.",
	color: "#F2542D",
	domain: "usio.co.uk",
	url: "https://usio.co.uk",
	contactEmail: "hello@usio.co.uk",
	githubRepo: "robertelding/usio",
	githubUrl: "https://github.com/robertelding/usio",
	emailFromName: "usio",
	desktopAppAvailable: false,
	chromeExtensionUrl: null,
	supportUrl: null,
	supportAssistantEnabled: true,
};
