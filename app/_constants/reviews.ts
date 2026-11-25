export type Review = {
	author: string;
	text: string;
	/** Shop the review was left for. Omitted when the live site did not say. */
	shop?: string;
	/** Reviewer's Google profile photo, saved under `public/reviews/`. Omit when they have none. */
	avatar?: string;
};

/**
 * 5-star Google reviews, most relevant first, shown in a carousel. Copied from each
 * shop's Google Maps listing (Day Street, Martin Place, Circular Quay) on 25 Nov 2026,
 * plus three from the live site (mensculture.com.au). Static, so they do not update
 * when new reviews are posted on Google.
 *
 * Reviews over 400 characters were skipped to keep the cards even. Two em dashes were
 * replaced with commas to match the site copy rules. Only real profile photos are used:
 * Google's default letter avatars are omitted so the carousel shows initials instead.
 */
export const REVIEWS: Review[] = [
	{
		author: "Morne Hill",
		shop: "Day Street",
		avatar: "/reviews/morne-hill.jpg",
		text: "Andrew from Men’s Culture did an outstanding job. Couldn’t be happier with the result. Professional, skilled, and really takes the time to get everything just right. Easily a 5-star experience. Highly recommend!",
	},
	{
		author: "Dion Vlachos",
		shop: "Martin Place",
		text: "Simeon is one of the best in the busines - a great professional who always looks after his clients.",
	},
	{
		author: "Brandon",
		shop: "Circular Quay",
		text: "Excellent service exactly what I wanted very skilled barber would absolutely recommend",
	},
	{
		author: "Desmond Ng",
		shop: "Day Street",
		avatar: "/reviews/desmond-ng.jpg",
		text: "One experience I won't forget; Having a haircut overseas while on holiday. But Andrew handled it well and took care of my needs. Came out feeling great ! Thank you Andrew for your great service ! 🤘🏻 …",
	},
	{
		author: "Narrth Jega",
		shop: "Martin Place",
		text: "Great scissor cuts, keratin treatment. Raj and Simeon are fantastic at what they do.",
	},
	{
		author: "Ricardo Medeiros",
		shop: "Circular Quay",
		avatar: "/reviews/ricardo-medeiros.jpg",
		text: "I had my haircut with Kumiko at Men's Culture Barbershop, and she was incredible! Kumiko, originally from Japan, was extremely detailed, friendly, and made the whole experience fantastic. I'm really happy with the cut, you can tell she takes great pride in her work. Highly, highly recommend visiting if you're in the city and need a haircut. Thank you, Kumiko!",
	},
	{
		author: "Jesse Warran-Rigby",
		shop: "Day Street",
		avatar: "/reviews/jesse-warran-rigby.jpg",
		text: "Had a cut with Andrew at Men’s Culture Barber in Haymarket and couldn’t be happier. He was amazing, professional, friendly, and really skilled. The whole experience was A+ from start to finish. Highly recommend!",
	},
	{
		author: "Zach K",
		shop: "Martin Place",
		text: "My go to place in the city for a haircut. Great service and amazing team.",
	},
	{
		author: "Hemal Kothari",
		shop: "Circular Quay",
		text: "Excellent professional guys. On time always. they know their work. No nonsense just good work. Very hardworking. 11 june 2026 job done- haircut and beard grooming",
	},
	{
		author: "Andersont Giovanni",
		shop: "Day Street",
		text: "I've been going here since 2021. Sam, Jun, and Andrew are amazing, friendly, and professional barbers. Being extremely skilled in what they do, I couldn't recommend of a better place for a great haircut. You'll come out at least being a 9/10 each time.",
	},
	{
		author: "DC",
		shop: "Martin Place",
		avatar: "/reviews/dc.jpg",
		text: "A great barber place and special mention to Linda who is a true artist when it comes to haircuts and styling. Every visit is an amazing experience where she transforms my look to perfectly match my face. I've tried many places in the city, but Linda’s skills and attention to detail are unmatched. Highly recommend her!",
	},
	{
		author: "sebbyswole",
		shop: "Circular Quay",
		avatar: "/reviews/sebbyswole.jpg",
		text: "Great location, clean and professional. Staff are very friendly and experienced. Monz (barber) consistently delivers on giving me a cracka fade every time. Monz is very experienced, funny, and easy to talk to. Never a bad experience, 10/10 best barber around.",
	},
	{
		author: "Kaydn McLachlan",
		shop: "Day Street",
		avatar: "/reviews/kaydn-mclachlan.jpg",
		text: "Andrew was such a great bloke and gave me an excellent haircut! Will be coming back!",
	},
	{
		author: "Patrick S",
		shop: "Martin Place",
		text: "Chrissy is amazing! She is an expert at styling Asian men’s hair and delivered a fresh cut tailored to the characteristics of my head shape and natural hair behaviour, going above and beyond with her time and attention to detail. Highly recommended!",
	},
	{
		author: "Shannon McCarthy",
		shop: "Circular Quay",
		text: "Fantastic service and great value for the price. Clean cuts, fantastic men.",
	},
	{
		author: "Micheal Joseph",
		text: "I cannot recommend this place enough. Allen is a legend when it come to haircut and styling. Not sure how he does it, but every time I come in the guy transforms it to suit your face and style . I tried a lot of places in the city, but finally decided on being a regular here. 100% recommend",
	},
	{
		author: "Joseph Mathew Jacob",
		avatar: "/reviews/joseph-mathew-jacob.png",
		text: "Great cuts and beard work. Alan is an absolute legend too, easy to deal with, and knows what he's doing. This place is my new regular for cuts and beard trims moving forward",
	},
	{
		author: "Marlisa Vanta",
		shop: "Day Street",
		text: "After the locked down, my hair was a complete mess and I needed a good hair cut to sort it out. Sam did an amazing job and was very professional. I would definitely recommend his cuts. I am very pleased with the results. I will be going back",
	},
];
