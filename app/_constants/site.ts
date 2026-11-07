import {
	CIRCULAR_QUAY_HOURS,
	DAY_STREET_HOURS,
	MARTIN_PLACE_HOURS,
	type WeekHours,
} from "./hours";

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

const BOOKING_BASE_URL = "https://bookings.gettimely.com/mensculture/book";

/** Opens Timely with this shop already selected, skipping the location picker. */
function buildLocationBookingUrl(timelyLocationId: string): string {
	return `${BOOKING_BASE_URL}?location=${timelyLocationId}`;
}

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
	hours: WeekHours;
	/** Timely booking link with this shop preselected. */
	bookingUrl: string;
};

export const LOCATIONS: Location[] = [
	{
		name: "Day Street",
		area: "Sydney CBD",
		streetAddress: "158 Day St",
		suburb: "Sydney",
		state: "NSW",
		postcode: "2000",
		phone: "(02) 9188 2841",
		mapsUrl:
			"https://www.google.com/maps/search/?api=1&query=Men%27s+Culture+158+Day+St+Sydney+NSW+2000",
		image: "/Mens-Culture-Haymarket.webp",
		imageAlt: "Men's Culture Day Street barbershop interior",
		hours: DAY_STREET_HOURS,
		bookingUrl: buildLocationBookingUrl("390542"),
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
			"https://www.google.com/maps/place/Men%27s+Culture+Barber+25+Martin+PL/@-33.868427,151.1996901,16z/data=!3m1!5s0x6b12ae1496d20a6f:0xc1a1f6815998f2cf!4m10!1m2!2m1!1sMen%27s+Culture+607+19+Martin+Place+Sydney+NSW+2000!3m6!1s0x6b12af5f458c0f69:0x176afb3b2990248f!8m2!3d-33.868427!4d151.2092173!15sCjFNZW4ncyBDdWx0dXJlIDYwNyAxOSBNYXJ0aW4gUGxhY2UgU3lkbmV5IE5TVyAyMDAwWjMiMW1lbidzIGN1bHR1cmUgNjA3IDE5IG1hcnRpbiBwbGFjZSBzeWRuZXkgbnN3IDIwMDCSAQtiYXJiZXJfc2hvcJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOS2REbFlVM2hCUlJBQuABAPoBBAhjEEA!16s%2Fg%2F11jv8133kz",
		image: "/Mens-Culture-Martin-Place.webp",
		imageAlt: "Men's Culture Martin Place barbershop",
		hours: MARTIN_PLACE_HOURS,
		bookingUrl: buildLocationBookingUrl("390543"),
	},
	{
		name: "Circular Quay",
		area: "Harbourside",
		streetAddress: "Retail CB3, 180 George St",
		suburb: "Sydney",
		state: "NSW",
		postcode: "2000",
		phone: "(02) 9516 0990",
		mapsUrl:
			"https://www.google.com/maps/search/?api=1&query=Men%27s+Culture+Retail+CB3+180+George+St+Sydney+NSW+2000",
		image: "/Mens-Culture-Circular-Quay.webp",
		imageAlt: "Men's Culture Circular Quay barbershop",
		hours: CIRCULAR_QUAY_HOURS,
		bookingUrl: buildLocationBookingUrl("389687"),
	},
];

export const SOCIAL_LINKS = {
	facebook: "https://www.facebook.com/MensCultureSydney/",
	instagram: "https://www.instagram.com/mensculturebarber/",
} as const;
