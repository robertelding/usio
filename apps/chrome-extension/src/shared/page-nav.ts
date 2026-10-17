import { loadSettings } from "./storage";

export const PAGE_NAV_LINKS = [
	{ id: "welcome", label: "Welcome", href: "welcome.html" },
	{ id: "how-it-works", label: "How it works", href: "how-it-works.html" },
	{ id: "camera", label: "Camera access", href: "camera-permission.html" },
	{ id: "options", label: "Options", href: "options.html" },
] as const;

export type PageNavId = (typeof PAGE_NAV_LINKS)[number]["id"];

const DEFAULT_DASHBOARD_URL =
	import.meta.env.MODE === "development"
		? "http://localhost:3000/dashboard"
		: "https://usio.co.uk/dashboard";

const CAP_LOGO_SVG = `<svg class="page-nav-logo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 103 40" aria-hidden="true"><rect x="0" y="0" width="40" height="40" rx="11.2" fill="#F2542D" /><circle cx="20" cy="20" r="10.8" fill="none" stroke="#fff" stroke-width="3.4" /><circle cx="20" cy="20" r="5" fill="#fff" /><text x="48" y="28.5" font-size="25" font-weight="600" letter-spacing="-0.5" fill="currentColor">usio</text></svg>`;

export const mountPageNav = (active: PageNavId) => {
	if (document.querySelector(".page-nav")) return;

	const nav = document.createElement("nav");
	nav.className = "page-nav";
	nav.setAttribute("aria-label", "usio extension pages");

	const inner = document.createElement("div");
	inner.className = "page-nav-inner";

	const brand = document.createElement("a");
	brand.className = "page-nav-brand";
	brand.href = "welcome.html";
	brand.setAttribute("aria-label", "usio");
	brand.innerHTML = CAP_LOGO_SVG;

	const links = document.createElement("div");
	links.className = "page-nav-links";
	for (const link of PAGE_NAV_LINKS) {
		const anchor = document.createElement("a");
		anchor.className =
			link.id === active ? "page-nav-link is-active" : "page-nav-link";
		anchor.href = link.href;
		anchor.textContent = link.label;
		if (link.id === active) {
			anchor.setAttribute("aria-current", "page");
		}
		links.append(anchor);
	}

	const dashboard = document.createElement("a");
	dashboard.className = "page-nav-link";
	dashboard.href = DEFAULT_DASHBOARD_URL;
	dashboard.target = "_blank";
	dashboard.rel = "noopener";
	dashboard.textContent = "Dashboard";
	links.append(dashboard);
	// The user may point the extension at a self-hosted instance, so resolve
	// the real base URL once settings load and leave the default until then.
	void loadSettings()
		.then((settings) => {
			dashboard.href = new URL("/dashboard", settings.apiBaseUrl).toString();
		})
		.catch(() => undefined);

	inner.append(brand, links);
	nav.append(inner);
	document.body.prepend(nav);
};
