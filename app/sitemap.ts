import type { MetadataRoute } from "next";

import {
	ABOUT_IMAGE,
	HERO_IMAGE,
	LOCATIONS,
	SERVICE_HIGHLIGHT_IMAGES,
	SITE_URL,
} from "@constants";

export default function sitemap(): MetadataRoute.Sitemap {
	const imagePaths = [
		HERO_IMAGE.src,
		ABOUT_IMAGE.src,
		...SERVICE_HIGHLIGHT_IMAGES.map((image) => image.src),
		...LOCATIONS.map((location) => location.image),
	];

	return [
		{
			url: SITE_URL,
			images: imagePaths.map((path) => `${SITE_URL}${path}`),
		},
	];
}
