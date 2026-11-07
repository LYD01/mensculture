const explicitSiteUrl = process.env.SITE_URL?.trim().replace(/\/$/, "");
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** Server-only: Vercel system env vars are not inlined into client bundles. */
export const SITE_URL = explicitSiteUrl
	? explicitSiteUrl
	: productionHost
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
	streetAddress: string;
	suburb: string;
	state: string;
	postcode: string;
	phone: string;
	mapsUrl: string;
	image: string;
	imageAlt: string;
};

export const LOCATIONS: Location[] = [
	{
		name: "Haymarket",
		area: "Sydney CBD",
		streetAddress: "Shop 5, 5 Steam Mill Lane",
		suburb: "Haymarket",
		state: "NSW",
		postcode: "2000",
		phone: "(02) 9188 2841",
		mapsUrl:
			"https://www.google.com/maps/search/?api=1&query=Men%27s+Culture+Shop+5+5+Steam+Mill+Lane+Haymarket+NSW+2000",
		image: "/Mens-Culture-Haymarket.webp",
		imageAlt: "Men's Culture Haymarket barbershop interior",
	},
	{
		name: "Martin Place",
		area: "Financial district",
		streetAddress: "Shop 607, 19 Martin Place",
		suburb: "Sydney",
		state: "NSW",
		postcode: "2000",
		phone: "(02) 7202 9244",
		mapsUrl:
			"https://www.google.com/maps/search/?api=1&query=Men%27s+Culture+607+19+Martin+Place+Sydney+NSW+2000",
		image: "/Mens-Culture-Martin-Place.webp",
		imageAlt: "Men's Culture Martin Place barbershop",
	},
	{
		name: "Circular Quay",
		area: "Harbourside",
		streetAddress: "CQT 3, 180 George Street",
		suburb: "Sydney",
		state: "NSW",
		postcode: "2000",
		phone: "(02) 9516 0990",
		mapsUrl:
			"https://www.google.com/maps/search/?api=1&query=Men%27s+Culture+180+George+Street+Sydney+NSW+2000",
		image: "/Mens-Culture-Circular-Quay.webp",
		imageAlt: "Men's Culture Circular Quay barbershop",
	},
];

export const SOCIAL_LINKS = {
	facebook: "https://www.facebook.com/MensCultureSydney/",
	instagram: "https://www.instagram.com/mensculturebarber/",
} as const;
