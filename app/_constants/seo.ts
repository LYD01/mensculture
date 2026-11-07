import type { Metadata } from "next";

import { HERO_IMAGE } from "./media";

export const SITE_TITLE =
	"Men's Culture | Professional Men's Haircuts in Sydney CBD";

export const SITE_DESCRIPTION =
	"Precision men's haircuts, fades, beard trims and hot towel shaves for Sydney CBD professionals. Three locations: Haymarket, Martin Place and Circular Quay.";

export const OPEN_GRAPH_IMAGE = {
	url: HERO_IMAGE.src,
	width: 1400,
	height: 759,
	alt: HERO_IMAGE.alt,
} as const;

export const homePageMetadata: Metadata = {
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "en_AU",
		url: "/",
		siteName: "Men's Culture",
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [OPEN_GRAPH_IMAGE],
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		images: [OPEN_GRAPH_IMAGE.url],
	},
};
