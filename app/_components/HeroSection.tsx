import Image from "next/image";

import { HERO_IMAGE } from "@constants";

import { BookButton } from "./BookButton";

const highlights = [
	{ value: "3", label: "CBD locations" },
	{ value: "Wash", label: "included with every cut" },
	{ value: "Online", label: "booking, 24/7" },
];

export function HeroSection() {
	return (
		<section
			id="top"
			className="relative min-h-[min(100vh,52rem)] overflow-hidden border-b border-line/60"
		>
			<Image
				src={HERO_IMAGE.src}
				alt={HERO_IMAGE.alt}
				fill
				priority
				sizes="100vw"
				className="object-cover object-center"
			/>
			<div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-shadow-hero sm:pt-28 lg:pb-28 lg:pt-36">
				<p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-sun">
					<span aria-hidden="true" className="h-px w-10 bg-gold" />
					Sydney CBD Barbers
				</p>
				<h1 className="max-w-3xl font-display text-5xl leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
					Men&apos;s haircuts in Sydney CBD
				</h1>
				<p className="mt-4 max-w-3xl font-display text-2xl leading-snug text-cream sm:text-3xl">
					Sharp cuts for the{" "}
					<em className="text-sun not-italic">working week.</em>
				</p>
				<p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80">
					Precision men&apos;s haircuts and grooming for city professionals.
					Book a dedicated barber around your calendar and walk back into the
					office looking the part.
				</p>
				<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
					<BookButton label="Book your cut" size="lg" />
					<a
						href="#services"
						className="link-inline px-2 py-4 text-sm font-semibold uppercase tracking-[0.18em]"
					>
						View services
					</a>
				</div>
				<dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-cream/15 pt-8">
					{highlights.map((item) => (
						<div key={item.label} className="flex flex-col-reverse">
							<dt className="mt-1 text-xs leading-snug text-cream-muted sm:text-sm">
								{item.label}
							</dt>
							<dd className="font-display text-2xl text-cream sm:text-3xl">
								{item.value}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
