import { BRAND } from "@cap/utils";
import { notFound } from "next/navigation";

const CAP_AUTHORED_PATHS = [
	"/blog",
	"/changelog",
	"/about",
	"/testimonials",
	"/hipaa-compliant-screen-recording",
];

const DESKTOP_ONLY_PATHS = [
	"/download",
	"/deactivate-license",
	"/features/studio-mode",
	"/screen-recorder-mac",
	"/screen-recorder-windows",
	"/mac-screen-recording-with-audio",
];

export const HIDDEN_MARKETING_PATHS: readonly string[] = [
	...CAP_AUTHORED_PATHS,
	...(BRAND.desktopAppAvailable ? [] : DESKTOP_ONLY_PATHS),
];

export function isHiddenMarketingPath(path: string) {
	const pathname = path.split(/[?#]/)[0] ?? path;
	return HIDDEN_MARKETING_PATHS.some(
		(hidden) => pathname === hidden || pathname.startsWith(`${hidden}/`),
	);
}

export function hideMarketingPage(path: string) {
	if (isHiddenMarketingPath(path)) notFound();
}
