import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { SITE_LOGO } from "@constants";

import { BookButton } from "./BookButton";
import { CallNowButton } from "./CallNowButton";
import { PromoBanner } from "./PromoBanner";

const navLinks = [
	{ href: "#about", label: "About" },
	{ href: "#services", label: "Services" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#locations", label: "Locations" },
];

const logoLinkClass = "flex shrink-0 items-center gap-3";

type SiteHeaderProps = {
	/** `minimal` shows only the logo, linking back to the home page (used on admin pages). */
	variant?: "full" | "minimal";
};

export function SiteHeader({ variant = "full" }: SiteHeaderProps) {
	const isMinimal = variant === "minimal";

	const logo = (
		<>
			<Image
				src={SITE_LOGO}
				alt="Men's Culture"
				width={44}
				height={44}
				className="h-9 w-9 rounded-full sm:h-11 sm:w-11"
			/>
			<span className="hidden font-display text-xl tracking-wide text-cream sm:inline sm:text-2xl">
				Men&apos;s <span className="text-gold-light">Culture</span>
			</span>
		</>
	);

	return (
		<header className="sticky top-0 z-20 border-b border-line/60 bg-ink/90 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6">
				{isMinimal ? (
					<Link href="/" className={logoLinkClass}>
						{logo}
					</Link>
				) : (
					<a href="#top" className={logoLinkClass}>
						{logo}
					</a>
				)}
				{isMinimal ? null : (
					<>
						<nav aria-label="Main" className="hidden md:block">
							<ul className="flex gap-8 text-sm text-cream/70">
								{navLinks.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											className="transition-colors hover:text-gold-light"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</nav>
						<div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
							<CallNowButton mobileIconOnly />
							<BookButton mobileIconOnly />
						</div>
					</>
				)}
			</div>
			{isMinimal ? null : (
				<Suspense fallback={null}>
					<PromoBanner />
				</Suspense>
			)}
		</header>
	);
}
