import type { CSSProperties } from "react";

export type ModeKey = "instant" | "studio" | "screenshot" | "share";

export const INK = "#15171c";

export const SIGNAL = "#f2542d";

export const CREAM = "#f6f6f3";

export const SHELL = "#FFFFFF";

export const BAND = "#ecece7";

export const BODY_COLOR = "rgba(21,23,28,0.82)";

export const MUTED = "#585d68";

export const HAIRLINE = "#d9d9d2";

export const CARD_BG = CREAM;

export const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const grainBg = (color: string): CSSProperties => ({
	backgroundColor: color,
	backgroundImage: GRAIN,
	backgroundSize: "200px 200px",
});

export type ModeTheme = {
	/** Radial layers of the mesh (exactly four, see meshStyle's size list). */
	image: string;

	base: string;

	pill: string;

	chip: string;

	glyph: string;

	panel: string;

	bars: string;

	accent: string;
};

export const meshStyle = (t: ModeTheme): CSSProperties => ({
	backgroundColor: t.base,
	backgroundImage: `${GRAIN}, ${t.image}`,
	backgroundSize: "200px 200px, auto, auto, auto, auto",
});

export const MODE_THEME: Record<ModeKey, ModeTheme> = {
	instant: {
		image: [
			"radial-gradient(92% 95% at 6% 6%, #8FC1F7 0%, rgba(143,193,247,0) 66%)",
			"radial-gradient(70% 78% at 96% 2%, #CDEBF4 0%, rgba(205,235,244,0) 60%)",
			"radial-gradient(82% 76% at 92% 96%, #DDD7F8 0%, rgba(221,215,248,0) 62%)",
			"radial-gradient(92% 88% at 24% 100%, #AFD6F8 0%, rgba(175,214,248,0) 70%)",
		].join(","),
		base: "#E4F0FB",
		pill: "#BFDCFC",
		chip: "#E1EFFE",
		glyph: "#3D77C2",
		panel: "rgba(143,193,247,0.18)",
		bars: "rgba(111,168,232,0.32)",
		accent: "#8DBCF0",
	},
	studio: {
		image: [
			"radial-gradient(80% 88% at 92% 8%, #B9A5F2 0%, rgba(185,165,242,0) 60%)",
			"radial-gradient(72% 80% at 4% 4%, #C3DCF8 0%, rgba(195,220,248,0) 60%)",
			"radial-gradient(84% 80% at 6% 98%, #F6D9EC 0%, rgba(246,217,236,0) 62%)",
			"radial-gradient(88% 72% at 68% 100%, #D5EDE6 0%, rgba(213,237,230,0) 66%)",
		].join(","),
		base: "#EFE9FB",
		pill: "#DACBF9",
		chip: "#EFE7FD",
		glyph: "#7B5FD0",
		panel: "rgba(185,165,242,0.18)",
		bars: "rgba(167,139,240,0.30)",
		accent: "#BCA7F4",
	},
	screenshot: {
		image: [
			"radial-gradient(80% 88% at 8% 92%, #8FDCBB 0%, rgba(143,220,187,0) 60%)",
			"radial-gradient(72% 78% at 88% 4%, #E0D8F7 0%, rgba(224,216,247,0) 60%)",
			"radial-gradient(80% 80% at 96% 92%, #F8E7C8 0%, rgba(248,231,200,0) 64%)",
			"radial-gradient(88% 80% at 28% 2%, #C8EEDD 0%, rgba(200,238,221,0) 66%)",
		].join(","),
		base: "#E5F3EC",
		pill: "#BFEDD8",
		chip: "#E2F6EC",
		glyph: "#3F9974",
		panel: "rgba(143,220,187,0.20)",
		bars: "rgba(111,203,164,0.32)",
		accent: "#93D9BC",
	},
	share: {
		image: [
			"radial-gradient(80% 88% at 92% 88%, #F5BE85 0%, rgba(245,190,133,0) 60%)",
			"radial-gradient(70% 74% at 4% 8%, #D6EDE1 0%, rgba(214,237,225,0) 60%)",
			"radial-gradient(80% 80% at 2% 94%, #F9D4C6 0%, rgba(249,212,198,0) 64%)",
			"radial-gradient(84% 74% at 58% 0%, #FBEAD0 0%, rgba(251,234,208,0) 68%)",
		].join(","),
		base: "#F9F0E2",
		pill: "#FFD9AC",
		chip: "#FCEEDB",
		glyph: "#B07430",
		panel: "rgba(245,190,133,0.20)",
		bars: "rgba(240,168,96,0.32)",
		accent: "#F5C08A",
	},
};

export const SANS =
	"[font-family:var(--font-ht-sans),ui-sans-serif,system-ui,sans-serif]";

export const SERIF_BODY =
	"[font-family:var(--font-ht-serif),system-ui,sans-serif] font-normal";

export const DISPLAY =
	"[font-family:var(--font-usio-display),Helvetica_Neue,Arial,sans-serif]";

export const MONO = "[font-family:var(--font-ht-mono),ui-monospace,monospace]";

export const EYEBROW = `${MONO} text-[12px] font-normal uppercase leading-none tracking-[0.05em]`;

export const H_HERO = `${DISPLAY} font-[800] leading-[0.98] tracking-[-0.035em] text-[#15171c]`;

export const H_SECTION = `${DISPLAY} font-[700] leading-[1.0] tracking-[-0.02em] text-[#15171c]`;

export const H_CARD = `${DISPLAY} font-[700] leading-[1.04] tracking-[-0.01em] text-[#15171c]`;

export const BODY_TEXT = `${SERIF_BODY} tracking-[-0.01em]`;

export const BTN_PRIMARY = [
	"group relative inline-flex h-[48px] items-center justify-center rounded-[10px] px-6",
	"text-[16px] font-medium text-white bg-[#c2391a] hover:bg-[#a8311a]",
	"transition-colors duration-200 active:translate-y-px",
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2747c9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f6f3]",
].join(" ");

export const BTN_SECONDARY =
	"inline-flex h-[48px] items-center justify-center rounded-[10px] border border-[#878b94] bg-white px-6 text-[16px] font-normal text-[#15171c] transition-colors duration-200 hover:bg-[#ecece7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2747c9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f6f3]";
