import Image from "next/image";

import { LOCATIONS } from "@constants";
import { buildTelHref } from "@utils";

import { BookButton } from "./BookButton";

const steps = [
	{
		title: "Pick a location",
		body: "Sydney CBD, Martin Place or Circular Quay. Whichever is closest to your desk.",
	},
	{
		title: "Choose your barber & time",
		body: "See live availability and lock in a slot that fits around your meetings.",
	},
	{
		title: "Walk in, sit down",
		body: "Your chair is ready when you arrive. No waiting, no walk-in queue.",
	},
];

export function BookingSection() {
	return (
		<section id="locations" className="scroll-mt-20 bg-ink-soft">
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<div className="text-center">
					<p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
						How to book
					</p>
					<h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-cream sm:text-5xl">
						Booked in under a minute.
					</h2>
				</div>

				<ol className="mt-16 grid gap-10 md:grid-cols-3">
					{steps.map((step, index) => (
						<li key={step.title} className="text-center md:text-left">
							<span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold font-display text-xl text-gold-light md:mx-0">
								{index + 1}
							</span>
							<h3 className="mt-6 text-lg font-semibold text-cream">
								{step.title}
							</h3>
							<p className="mt-2 leading-relaxed text-cream/60">{step.body}</p>
						</li>
					))}
				</ol>

				<div className="mt-14 flex justify-center">
					<BookButton label="Book an appointment" size="lg" />
				</div>

				<div className="mt-24 border-t border-line pt-16">
					<h3 className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
						Our CBD locations
					</h3>
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
									<p className="text-xs uppercase tracking-[0.2em] text-cream/50">
										{location.area}
									</p>
									<p className="mt-2 font-display text-2xl text-cream">
										{location.name}
									</p>
									<a
										href={buildTelHref(location.phone)}
										className="mt-4 inline-block text-gold-light underline-offset-4 hover:underline"
									>
										{location.phone}
									</a>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
