export type SiteImage = {
	src: string;
	alt: string;
};

export const HERO_IMAGE: SiteImage = {
	src: "/banner.webp",
	alt: "Men's Culture barbershop interior with barbers at work in Sydney CBD",
};

export const ABOUT_IMAGE: SiteImage = {
	src: "/barber.webp",
	alt: "Barber styling a client's fade at Men's Culture",
};

/** A few service highlights; keeps the services grid text-first. */
export const SERVICE_HIGHLIGHT_IMAGES: SiteImage[] = [
	{
		src: "/shaving.webp",
		alt: "Straight-razor shave with hot towel",
	},
	{
		src: "/hair-wash.webp",
		alt: "Hair wash included with every cut",
	},
	{
		src: "/male-1.webp",
		alt: "Finished corporate-ready men's haircut",
	},
];
