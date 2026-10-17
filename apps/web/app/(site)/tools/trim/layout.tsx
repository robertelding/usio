import { BRAND } from "@cap/utils";
import { createBreadcrumbSchema } from "@/utils/web-schema";

export { metadata } from "./metadata";

const breadcrumbSchema = createBreadcrumbSchema([
	{ name: "Home", url: BRAND.url },
	{ name: "Tools", url: `${BRAND.url}/tools` },
	{ name: "Trim Video Online", url: `${BRAND.url}/tools/trim` },
]);

export default function TrimLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			{children}
		</>
	);
}
