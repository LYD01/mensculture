import Image from "next/image";

import { LOCATIONS } from "@constants";
import { buildTelHref, formatDisplayHours } from "@utils";

import { BookButton } from "./BookButton";
import { MapIcon } from "./MapIcon";
import { PhoneIcon } from "./PhoneIcon";

export function BookingSection() {
	return (
		<section
			id="locations"
			className="scroll-mt-(--header-offset) bg-cream text-navy"
		>
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<h2 className="text-center font-display text-4xl leading-tight text-navy sm:text-5xl">
					Our CBD locations
				</h2>
				<p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-stone">
					Book online for a reserved time at Day Street, Martin Place or
					Circular Quay. Call the shop if you are new and want help choosing a
					service before you book.
				</p>
				<ul className="mt-10 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 md:grid-cols-3">
					{LOCATIONS.map((location) => (
						<li key={location.name} className="bg-white">
							<div className="relative aspect-3/2 border-b border-navy/10">
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
								<p className="text-xs uppercase tracking-[0.2em] text-stone">
									{location.area}
								</p>
								<p className="mt-2 font-display text-2xl text-navy">
									{location.name}
								</p>
								<address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-stone">
									<span className="block text-navy">
										{location.streetAddress}
									</span>
									<span className="block">
										{location.suburb}, {location.state} {location.postcode}
									</span>
								</address>
								<a
									href={buildTelHref(location.phone)}
									className="link-inline-light group mt-4 inline-flex items-center gap-2.5"
								>
									<PhoneIcon
										variant="solid"
										className="h-6 w-6 shrink-0 text-action-success transition-colors group-hover:text-action-success-hover"
									/>
									{location.phone}
								</a>
								<div className="mt-6">
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
										Opening hours
									</p>
									<dl className="mt-2 space-y-1 text-sm text-stone">
										{formatDisplayHours(location.hours).map((row) => (
											<div key={row.day} className="flex justify-between gap-4">
												<dt>{row.day}</dt>
												<dd className="text-navy">{row.hours}</dd>
											</div>
										))}
									</dl>
								</div>
								<a
									href={location.mapsUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="link-inline-light mt-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em]"
								>
									<MapIcon />
									View on Google Maps
									<span className="sr-only">
										{" "}
										for {location.name} (opens in a new tab)
									</span>
								</a>
								<div className="mt-6">
									<BookButton
										href={location.bookingUrl}
										shopName={location.name}
									/>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
