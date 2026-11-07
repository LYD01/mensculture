export type PriceMenuItem = {
	name: string;
	priceAud: number;
	durationMinutes: number;
	/** Eligibility or frequency, shown in smaller type under the name. */
	note?: string;
};

export type PriceCategory = {
	title: string;
	items: PriceMenuItem[];
};

export const PRICING_CATEGORIES: PriceCategory[] = [
	{
		title: "Haircuts",
		items: [
			{
				name: "Detailed men's reshape and shampoo",
				priceAud: 60,
				durationMinutes: 30,
				note: "Includes skin fades and classic cuts.",
			},
			{
				name: "Detailed cut and shampoo",
				priceAud: 55,
				durationMinutes: 20,
				note: "Regular clients, booked within 4 weeks of last visit.",
			},
		],
	},
	{
		title: "Premium packages",
		items: [
			{
				name: "Premium hair & beard",
				priceAud: 85,
				durationMinutes: 45,
			},
			{
				name: "Regular premium",
				priceAud: 80,
				durationMinutes: 40,
				note: "Existing clients, between 4-week visits.",
			},
			{
				name: "Ultimate hair & face treatment",
				priceAud: 110,
				durationMinutes: 55,
			},
			{
				name: "Men styled cut plus scalp scrub treatment",
				priceAud: 85,
				durationMinutes: 45,
			},
			{
				name: "Detailed cut & wash plus hydrating face scrub",
				priceAud: 90,
				durationMinutes: 45,
			},
		],
	},
	{
		title: "Beard & shave",
		items: [
			{
				name: "Hot towel shave",
				priceAud: 45,
				durationMinutes: 20,
				note: "Traditional straight-razor barber shave.",
			},
			{
				name: "Beard grooming & shaping plus cleanse",
				priceAud: 55,
				durationMinutes: 40,
			},
			{
				name: "Beard line up & trim",
				priceAud: 40,
				durationMinutes: 25,
			},
			{
				name: "Beard line up (no trim)",
				priceAud: 25,
				durationMinutes: 20,
			},
		],
	},
	{
		title: "Treatments & colour",
		items: [
			{
				name: "Men's keratin smoothing service",
				priceAud: 80,
				durationMinutes: 45,
			},
			{
				name: "Men's camouflage colour",
				priceAud: 45,
				durationMinutes: 15,
			},
			{
				name: "Men's premium face cleanse",
				priceAud: 40,
				durationMinutes: 15,
			},
			{
				name: "Scalp scrub treatment",
				priceAud: 25,
				durationMinutes: 30,
			},
			{
				name: "Ears & nose waxing",
				priceAud: 20,
				durationMinutes: 10,
			},
		],
	},
];
