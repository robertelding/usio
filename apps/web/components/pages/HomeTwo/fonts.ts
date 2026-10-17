import { Figtree, JetBrains_Mono } from "next/font/google";

export const htSans = Figtree({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-ht-sans",
});

export const htSerif = Figtree({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-ht-serif",
});

export const htGeist = Figtree({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-ht-geist",
});

export const htMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-ht-mono",
});
