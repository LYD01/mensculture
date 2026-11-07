const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Server-only: Vercel system env vars are not inlined into client bundles. */
export const SITE_URL = productionHost
	? `https://${productionHost}`
	: "http://localhost:3000";

/** Server-only. False for preview deployments and local builds. */
export const IS_PRODUCTION_DEPLOYMENT = process.env.VERCEL_ENV === "production";

/** Logo for header / marketing (`public/mensculture-logo.png`). Favicons: `app/icon.png`. */
export const SITE_LOGO = "/mensculture-logo.png";

export const BOOKING_URL =
	"https://bookings.gettimely.com/mensculture/book?uri=https%3A%2F%2Fbook.gettimely.com%2FBooking%2FLocation%2F301694%3Fmobile%3DTrue%26params%3D%25253fclient-login%25253dtrue";

export type Location = {
	name: string;
	area: string;
	phone: string;
	image: string;
	imageAlt: string;
};

export const LOCATIONS: Location[] = [
	{
		name: "Sydney CBD",
		area: "City centre",
		phone: "(02) 9188 2841",
		image: "/Mens-Culture-Haymarket.webp",
		imageAlt: "Men's Culture Sydney CBD barbershop interior",
	},
	{
		name: "Martin Place",
		area: "Financial district",
		phone: "(02) 7202 9244",
		image: "/Mens-Culture-Martin-Place.webp",
		imageAlt: "Men's Culture Martin Place barbershop",
	},
	{
		name: "Circular Quay",
		area: "Harbourside",
		phone: "(02) 9516 0990",
		image: "/Mens-Culture-Circular-Quay.webp",
		imageAlt: "Men's Culture Circular Quay barbershop",
	},
];

export const SOCIAL_LINKS = {
	facebook: "https://www.facebook.com/MensCultureSydney/",
	instagram: "https://www.instagram.com/mensculturebarber/",
} as const;
