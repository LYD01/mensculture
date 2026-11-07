import Image from "next/image";

import { LOCATIONS } from "@constants";
import { buildTelHref } from "@utils";

export function BookingSection() {
	return (
		<section id="locations" className="scroll-mt-(--header-offset) bg-ink-soft">
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<h2 className="text-center font-display text-4xl leading-tight text-cream sm:text-5xl">
					Our CBD locations
				</h2>
				<ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
					{LOCATIONS.map((location) => (
						<li key={location.name} className="bg-ink">
							<div className="relative aspect-3/2 border-b border-line">
								<Image
									src={location.image}
									alt={location.imageAlt}
									fill
									loading="lazy"
									sizes="(min-width: 768px) 33vw, 100vw"
									className="object-cover"
								/>
							</div>
							<div className="p-8">
								<p className="text-xs uppercase tracking-[0.2em] text-cream-muted">
									{location.area}
								</p>
								<p className="mt-2 font-display text-2xl text-cream">
									{location.name}
								</p>
								<a
									href={buildTelHref(location.phone)}
									className="link-inline mt-4 inline-block"
								>
									{location.phone}
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
