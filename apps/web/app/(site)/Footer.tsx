"use client";

import { Logo } from "@cap/ui/logo";
import { BRAND } from "@cap/utils";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

type FooterLink = {
	label: string;
	href: string;
	isExternal?: boolean;
};

const footerLinks = {
	product: [
		{ label: "Docs", href: "/docs" },
		{ label: "usio for Agents", href: "/agents" },
		{ label: "Pricing", href: "/pricing" },
		...(BRAND.desktopAppAvailable
			? [{ label: "Download", href: "/download" }]
			: []),
		{
			label: "Open Source",
			href: BRAND.githubUrl,
			isExternal: true,
		},
		{
			label: "OSS Friends",
			href: "/oss-friends",
		},
	] as FooterLink[],
	help: [
		{ label: "FAQs", href: "/faq" },
		{ label: "Self-hosting", href: "/self-hosting" },
		{ label: "Support", href: "/support" },
		{ label: "Email Support", href: `mailto:${BRAND.contactEmail}` },
	] as FooterLink[],
	tools: [
		{ label: "WebM to MP4", href: "/tools/convert/webm-to-mp4" },
		{ label: "MOV to MP4", href: "/tools/convert/mov-to-mp4" },
		{ label: "AVI to MP4", href: "/tools/convert/avi-to-mp4" },
		{ label: "MP4 to GIF", href: "/tools/convert/mp4-to-gif" },
		{ label: "MP4 to MP3", href: "/tools/convert/mp4-to-mp3" },
		{ label: "MP4 to WebM", href: "/tools/convert/mp4-to-webm" },
		{ label: "Video Speed Controller", href: "/tools/video-speed-controller" },
		{ label: "Trim Video", href: "/tools/trim" },
	] as FooterLink[],
	useCases: [
		{
			label: "Remote Team Collaboration",
			href: "/solutions/remote-team-collaboration",
		},
		{
			label: "Employee Onboarding Platform",
			href: "/solutions/employee-onboarding-platform",
		},
		{
			label: "Daily Standup Software",
			href: "/solutions/daily-standup-software",
		},
		{
			label: "Online Classroom Tools",
			href: "/solutions/online-classroom-tools",
		},
		{
			label: "Agencies",
			href: "/solutions/agencies",
		},
	] as FooterLink[],
	additional: [
		{ label: "Loom Video Importer", href: "/loom-alternative" },
		{ label: "Migrate from Loom", href: "/migrate-from-loom" },
		{ label: "Loom Video Downloader", href: "/tools/loom-downloader" },
		{ label: "Screen Recorder", href: "/screen-recorder" },
		{ label: "Free Screen Recorder", href: "/free-screen-recorder" },
		{ label: "Screen Recording Software", href: "/screen-recording-software" },
		{
			label: "Chrome Screen Recorder",
			href: "/google-chrome-screen-recorder",
		},
		{
			label: "Google Drive Screen Recorder",
			href: "/google-drive-screen-recorder",
		},
		{ label: "usio vs Loom", href: "/loom-alternative" },
		{ label: "Student Discount", href: "/student-discount" },
	] as FooterLink[],
};

const FooterColumn = ({
	title,
	titleHref,
	links,
}: {
	title: string;
	titleHref?: string;
	links: FooterLink[];
}) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b border-gray-4 lg:border-none">
			<button
				type="button"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex justify-between items-center py-4 w-full text-lg font-semibold text-left text-gray-12 lg:hidden"
			>
				{title}
				<FontAwesomeIcon
					icon={faChevronDown}
					className={`size-3.5 text-gray-10 transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{titleHref ? (
				<Link
					href={titleHref}
					className="hidden pb-2 text-lg font-semibold transition-colors text-gray-12 hover:text-gray-11 lg:block"
				>
					{title}
				</Link>
			) : (
				<h3 className="hidden pb-2 text-lg font-semibold text-gray-12 lg:block">
					{title}
				</h3>
			)}

			<div
				className={`grid transition-[grid-template-rows] duration-200 ease-out lg:grid-rows-[1fr] ${
					isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className="overflow-hidden">
					<ul className="grid grid-cols-1 gap-2 pb-4 lg:pb-0">
						{links.map((link) => (
							<li key={`${link.href}:${link.label}`}>
								<Link
									className="transition-colors text-gray-10 hover:text-gray-12"
									href={link.href}
									target={link.isExternal ? "_blank" : undefined}
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export const Footer = () => {
	return (
		<footer className="overflow-hidden relative border-t border-gray-4">
			<div className="wrapper relative pt-20 pb-10">
				<div
					aria-hidden="true"
					className="absolute bottom-0 left-1/2 w-[700px] -translate-x-1/2 translate-y-2/3 select-none pointer-events-none opacity-[0.05] sm:w-[1000px] lg:w-[1300px]"
				>
					<Logo
						hideLogoName
						viewBoxDimensions="0 0 40 40"
						className="w-full h-auto"
					/>
				</div>

				<div className="relative z-10">
					<div className="flex flex-col gap-12 xl:flex-row xl:gap-16">
						<div className="xl:w-[260px] xl:shrink-0">
							<Logo className="w-[104px] h-auto" />
							<p className="mt-5 max-w-sm text-sm leading-6 text-gray-11">
								{BRAND.description}
							</p>
						</div>

						<div className="grid flex-1 grid-cols-1 border-t border-gray-4 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10 lg:border-none">
							<FooterColumn title="Product" links={footerLinks.product} />
							<FooterColumn
								title="Additional Links"
								links={footerLinks.additional}
							/>
							<FooterColumn title="usio" links={footerLinks.help} />
							<FooterColumn title="Use Cases" links={footerLinks.useCases} />
							<FooterColumn
								title="Tools"
								titleHref="/tools"
								links={footerLinks.tools}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-6 pt-8 mt-20 border-t sm:flex-row sm:justify-between sm:items-end border-gray-4">
						<div />
						<div className="flex flex-wrap gap-x-8 gap-y-2">
							<a
								className="text-sm transition-colors text-gray-9 hover:text-gray-12"
								href="/terms"
							>
								Terms of Service
							</a>
							<a
								className="text-sm transition-colors text-gray-9 hover:text-gray-12"
								href="/privacy"
							>
								Privacy Policy
							</a>
							<a
								className="text-sm transition-colors text-gray-9 hover:text-gray-12"
								href="/dpa"
							>
								Data Processing Agreement
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
