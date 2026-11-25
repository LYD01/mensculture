import type { LocationSlug } from "./site";

export type PriceMenuItem = {
	name: string;
	priceAud: number;
	durationMinutes: number;
	/** Eligibility or frequency, shown in smaller type under the name. */
	note?: string;
	/**
	 * Timely service id per shop, used to preselect this service on the booking page.
	 * A shop left out does not offer the service online. Omit the field when the
	 * service has no Timely match (visitors then choose it on the booking page).
	 * Ids come from `TIMELY_SERVICES` (run `pnpm timely:sync`).
	 */
	timelyServiceIds?: Partial<Record<LocationSlug, string>>;
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
				timelyServiceIds: {
					"day-street": "5197451",
					"martin-place": "5197450",
					"circular-quay": "5197450",
				},
				note: "Includes skin fades and classic cuts.",
			},
			{
				name: "Detailed cut and shampoo",
				priceAud: 55,
				durationMinutes: 20,
				timelyServiceIds: {
					"day-street": "5197448",
					"martin-place": "5198345",
					"circular-quay": "5198345",
				},
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
				timelyServiceIds: {
					"day-street": "5197481",
					"martin-place": "5197483",
					"circular-quay": "5197483",
				},
			},
			{
				name: "Regular premium",
				priceAud: 80,
				durationMinutes: 40,
				timelyServiceIds: { "day-street": "5197485" },
				note: "Existing clients, between 4-week visits.",
			},
			{
				name: "Ultimate hair & face treatment",
				priceAud: 110,
				durationMinutes: 55,
				timelyServiceIds: { "day-street": "5197494" },
			},
			{
				name: "Men styled cut plus scalp scrub treatment",
				priceAud: 85,
				durationMinutes: 45,
				timelyServiceIds: {
					"day-street": "5197472",
					"martin-place": "5197471",
					"circular-quay": "5197471",
				},
			},
			{
				name: "Detailed cut & wash plus hydrating face scrub",
				priceAud: 90,
				durationMinutes: 45,
				timelyServiceIds: { "day-street": "5197446" },
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
				timelyServiceIds: {
					"day-street": "5197425",
					"martin-place": "5197425",
					"circular-quay": "5197425",
				},
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
				timelyServiceIds: { "day-street": "5197476" },
			},
			{
				name: "Men's camouflage colour",
				priceAud: 45,
				durationMinutes: 15,
				timelyServiceIds: {
					"day-street": "5197439",
					"martin-place": "5197439",
					"circular-quay": "5197439",
				},
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
				timelyServiceIds: {
					"day-street": "5197486",
					"martin-place": "5197486",
					"circular-quay": "5197486",
				},
			},
			{
				name: "Ears & nose waxing",
				priceAud: 20,
				durationMinutes: 10,
				timelyServiceIds: {
					"day-street": "5197453",
					"martin-place": "5197453",
					"circular-quay": "5197453",
				},
			},
		],
	},
];
