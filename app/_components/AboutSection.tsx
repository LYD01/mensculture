import Image from "next/image";

import { ABOUT_IMAGE } from "@constants";

const pillars = [
	{
		title: "On your schedule",
		body: "Book online in seconds and get a set time with a barber reserved just for you. In and out in your lunch break.",
	},
	{
		title: "Experienced barbers",
		body: "Years behind the chair in classic cuts, modern fades, beard work and traditional hot towel shaves.",
	},
	{
		title: "Boardroom ready",
		body: "Every cut includes a wash, so you leave without hair down your collar and ready for your next meeting.",
	},
];

export function AboutSection() {
	return (
		<section
			id="about"
			className="scroll-mt-(--header-offset) bg-cream text-ink"
		>
			<div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
				<div className="grid gap-14 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-center lg:gap-16">
					<div className="mx-auto w-full max-w-[17.5rem] border border-ink/10 bg-ink/5 lg:mx-0">
						<Image
							src={ABOUT_IMAGE.src}
							alt={ABOUT_IMAGE.alt}
							width={500}
							height={500}
							sizes="(min-width: 1024px) 280px, min(100vw - 3rem, 280px)"
							loading="lazy"
							className="h-auto w-full object-cover"
						/>
					</div>
					<div>
						<p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
							Who we are
						</p>
						<h2 className="font-display text-4xl leading-tight sm:text-5xl">
							A premium barbershop in the heart of the city.
						</h2>
						<p className="mt-6 text-lg leading-relaxed text-stone">
							Men&apos;s Culture is a gentleman&apos;s barbershop with three
							locations across Sydney&apos;s CBD: Day Street, Martin Place and
							Circular Quay. We use quality products and tools, listen to how
							you work and live, and give you a cut that holds its shape from
							Monday to Friday.
						</p>
					</div>
				</div>
				<ul className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 lg:grid-cols-3">
					{pillars.map((pillar, index) => (
						<li key={pillar.title} className="flex gap-6 bg-cream p-8">
							<span className="font-display text-2xl text-gold-deep">
								{`0${index + 1}`}
							</span>
							<div>
								<h3 className="text-lg font-semibold">{pillar.title}</h3>
								<p className="mt-2 leading-relaxed text-stone">{pillar.body}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
