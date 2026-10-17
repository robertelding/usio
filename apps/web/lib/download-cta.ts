import { BRAND } from "@cap/utils";

export const DOWNLOAD_HREF = "/download";

export const SIGNUP_CTA = {
	text: "Get started free",
	href: "/signup",
} as const;

export const isDownloadHref = (href: string) =>
	href === DOWNLOAD_HREF || href.startsWith(`${DOWNLOAD_HREF}/`);

export const resolveDownloadCta = (
	text: string,
	href: string = DOWNLOAD_HREF,
): { text: string; href: string } =>
	BRAND.desktopAppAvailable || !isDownloadHref(href)
		? { text, href }
		: SIGNUP_CTA;

export const isHiddenDownloadHref = (href: string | undefined) =>
	!BRAND.desktopAppAvailable && href !== undefined && isDownloadHref(href);
