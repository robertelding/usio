import "@/app/globals.css";
import { buildEnv } from "@cap/env";
import { BRAND } from "@cap/utils";
import { OpenPanelComponent } from "@openpanel/nextjs";
import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import type { PropsWithChildren } from "react";

const bodyFont = Figtree({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-usio-body",
});

const displayFont = Schibsted_Grotesk({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-usio-display",
});

const monoFont = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-usio-mono",
});

const siteTitle = `${BRAND.name} — ${BRAND.tagline}`;

export const metadata: Metadata = {
	metadataBase: new URL(buildEnv.NEXT_PUBLIC_WEB_URL),
	title: siteTitle,
	description: BRAND.description,
	applicationName: BRAND.name,
	openGraph: {
		title: siteTitle,
		description: BRAND.description,
		type: "website",
		url: buildEnv.NEXT_PUBLIC_WEB_URL,
		siteName: BRAND.name,
		images: [
			{
				url: "/api/og",
				width: 1200,
				height: 630,
				alt: siteTitle,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteTitle,
		description: BRAND.description,
		images: ["/api/og"],
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		// suppressHydrationWarning: the Cap Chrome extension stamps
		// data-cap-chrome-extension-installed on <html> at document_idle,
		// which can land before hydration finishes.
		<html
			className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} font-sans`}
			lang="en"
			suppressHydrationWarning
		>
			<head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="icon" type="image/svg+xml" href="/usio-icon.svg" />
				<link rel="mask-icon" href="/usio-icon.svg" color={BRAND.color} />
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="msapplication-TileColor" content={BRAND.color} />
				<meta name="theme-color" content="#f6f6f3" />
			</head>
			<body suppressHydrationWarning>
				<Script src="/theme-script.js" strategy="beforeInteractive" />
				{buildEnv.NEXT_PUBLIC_OPENPANEL_CLIENT_ID ? (
					<OpenPanelComponent
						apiUrl="/api/op"
						clientId={buildEnv.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}
						scriptUrl="/api/op/op1.js"
						trackOutgoingLinks
						trackScreenViews
					/>
				) : null}
				<main className="w-full">{children}</main>
			</body>
		</html>
	);
}
