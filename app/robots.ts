import type { MetadataRoute } from "next";

import { IS_PRODUCTION_DEPLOYMENT, SITE_URL } from "@constants";

export default function robots(): MetadataRoute.Robots {
	if (!IS_PRODUCTION_DEPLOYMENT) {
		return { rules: { userAgent: "*", disallow: "/" } };
	}

	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
