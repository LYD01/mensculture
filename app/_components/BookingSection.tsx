import Image from "next/image";

import { LOCATIONS, OPENING_HOURS_DISPLAY } from "@constants";
import { buildTelHref } from "@utils";

import { PhoneIcon } from "./PhoneIcon";

export function BookingSection() {
	return (
		<section id="locations" className="scroll-mt-(--header-offset) bg-ink-soft">
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<h2 className="text-center font-display text-4xl leading-tight text-cream sm:text-5xl">
					Our CBD locations
				</h2>
				<p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-cream-muted">
					Book online for a reserved time at Haymarket, Martin Place or Circular
					Quay. Call the shop if you are new and want help choosing a service
					before you book.
				</p>
				<ul className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
					{LOCATIONS.map((location) => (
						<li key={location.name} className="bg-ink">
							<div className="relative aspect-3/2 border-b border-line">
								<Image
									src={location.image}
									alt={location.imageAlt}
									fill
									loading="lazy"
									fetchPriority="low"
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
								<address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-cream-muted">
									<span className="block text-cream">
										{location.streetAddress}
									</span>
									<span className="block">
										{location.suburb}, {location.state} {location.postcode}
									</span>
								</address>
								<a
									href={buildTelHref(location.phone)}
									className="link-inline group mt-4 inline-flex items-center gap-2.5"
								>
									<PhoneIcon className="h-5 w-5 shrink-0 text-phone transition-colors group-hover:text-phone-hover" />
									{location.phone}
								</a>
								<div className="mt-6">
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-muted">
										Opening hours
									</p>
									<dl className="mt-2 space-y-1 text-sm text-cream-muted">
										{OPENING_HOURS_DISPLAY.map((row) => (
											<div key={row.day} className="flex justify-between gap-4">
												<dt>{row.day}</dt>
												<dd className="text-cream">{row.hours}</dd>
											</div>
										))}
									</dl>
								</div>
								<a
									href={location.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="link-inline mt-6 inline-block text-sm font-semibold uppercase tracking-[0.18em]"
								>
									View on Google Maps
									<span className="sr-only">
										{" "}
										for {location.name} (opens in a new tab)
									</span>
								</a>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
