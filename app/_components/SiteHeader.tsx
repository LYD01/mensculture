import Image from "next/image";

import { SITE_LOGO } from "@constants";

import { BookButton } from "./BookButton";

const navLinks = [
	{ href: "#about", label: "About" },
	{ href: "#services", label: "Services" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#locations", label: "Locations" },
];

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-20 border-b border-line/60 bg-ink/90 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
				<a href="#top" className="flex shrink-0 items-center gap-3">
					<Image
						src={SITE_LOGO}
						alt="Men's Culture"
						width={44}
						height={44}
						className="h-9 w-9 rounded-full sm:h-11 sm:w-11"
						priority
					/>
					<span className="font-display text-xl tracking-wide text-cream sm:text-2xl">
						Men&apos;s <span className="text-gold-light">Culture</span>
					</span>
				</a>
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
				<BookButton />
			</div>
		</header>
	);
}
