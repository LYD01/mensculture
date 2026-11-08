import Image from "next/image";

import { SERVICE_HIGHLIGHT_IMAGES } from "@constants";

const services = [
	{
		name: "Men's haircut",
		description:
			"A tailored cut, wash and style suited to your face shape and your workplace.",
	},
	{
		name: "Skin fade",
		description:
			"Clean, precise fades blended by hand. Priced as a detailed men's reshape and shampoo (see pricing).",
	},
	{
		name: "Beard trim & shape",
		description:
			"Defined lines and a tidy shape to keep your beard looking deliberate.",
	},
	{
		name: "Hot towel shave",
		description:
			"The traditional straight razor shave, finished with a hot towel.",
	},
	{
		name: "Cut & beard",
		description:
			"The full refresh: haircut, wash and beard work in one appointment.",
	},
	{
		name: "Styling & colour",
		description:
			"Blow-outs, styling and colour for an event, a pitch or a change.",
	},
];

export function ServicesSection() {
	return (
		<section
			id="services"
			className="scroll-mt-(--header-offset) bg-white text-navy"
		>
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
							What we do
						</p>
						<h2 className="max-w-xl font-display text-4xl leading-tight text-navy sm:text-5xl">
							Cuts and grooming, done properly.
						</h2>
					</div>
					<p className="max-w-sm leading-relaxed text-stone">
						Not sure what to ask for? Your barber will recommend a style that
						suits you. See{" "}
						<a href="#pricing" className="link-inline-light">
							pricing
						</a>{" "}
						below or book for the full Timely menu.
					</p>
				</div>

				<ul className="mt-12 grid gap-4 sm:grid-cols-3">
					{SERVICE_HIGHLIGHT_IMAGES.map((image) => (
						<li
							key={image.src}
							className="relative aspect-4/3 overflow-hidden border border-navy/10"
						>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								loading="lazy"
								sizes="(min-width: 640px) 33vw, 100vw"
								className="object-cover transition-[filter] duration-300 hover:brightness-105"
							/>
						</li>
					))}
				</ul>

				<ul className="mt-16 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
					{services.map((service) => (
						<li
							key={service.name}
							className="group bg-paper p-8 transition-colors hover:bg-cream"
						>
							<span
								aria-hidden="true"
								className="mb-6 block h-px w-8 bg-gold transition-all group-hover:w-14"
							/>
							<h3 className="font-display text-2xl text-navy">
								{service.name}
							</h3>
							<p className="mt-3 leading-relaxed text-stone">
								{service.description}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
