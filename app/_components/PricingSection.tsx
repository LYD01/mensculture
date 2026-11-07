import { PRICING_CATEGORIES } from "@constants";
import { formatAudPrice, formatServiceDuration } from "@utils";

export function PricingSection() {
	return (
		<section id="pricing" className="scroll-mt-20 bg-cream text-ink">
			<div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
				<h2 className="mb-8 font-display text-4xl leading-tight text-gold-deep sm:text-5xl">
					Pricing
				</h2>

				<div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
					{PRICING_CATEGORIES.map((category) => (
						<div key={category.title}>
							<h3 className="border-b border-ink/15 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-deep">
								{category.title}
							</h3>
							<ul className="divide-y divide-ink/10">
								{category.items.map((item) => (
									<li
										key={item.name}
										className="flex items-baseline justify-between gap-4 py-2.5"
									>
										<div className="min-w-0 flex-1">
											<p className="text-sm leading-snug font-medium">
												{item.name}
											</p>
											{item.note ? (
												<p className="mt-0.5 text-xs leading-snug text-stone">
													{item.note}
												</p>
											) : null}
										</div>
										<p className="shrink-0 text-right text-sm leading-tight whitespace-nowrap tabular-nums">
											<span className="font-display text-lg text-ink">
												{formatAudPrice(item.priceAud)}
											</span>
											<span className="text-stone">
												{" "}
												· {formatServiceDuration(item.durationMinutes)}
											</span>
										</p>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
