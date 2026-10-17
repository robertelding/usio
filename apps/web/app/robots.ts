import { BRAND } from "@cap/utils";
import type { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/dashboard", "/login", "/invite", "/onboarding", "/record"],
			},
		],
		sitemap: `${BRAND.url}/sitemap.xml`,
	};
}
