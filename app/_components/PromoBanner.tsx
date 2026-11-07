import { cacheLife, cacheTag } from "next/cache";

import { PROMOTION_CACHE_TAG } from "@constants";
import { type PromotionRecord, getPromotion } from "@/db/queries/promotions";

import { PromoBannerStrip } from "./PromoBannerStrip";

/** Seconds until the ISO instant, or 0 when it has passed. */
function secondsUntil(isoInstant: string): number {
	return Math.max(0, Math.floor((Date.parse(isoInstant) - Date.now()) / 1000));
}

/**
 * Cached under the `promotion` tag: admin edits call `updateTag`, so they show
 * immediately. Exactly one `cacheLife` call runs per branch.
 */
export async function PromoBanner() {
	"use cache";
	cacheTag(PROMOTION_CACHE_TAG);

	let promotion: PromotionRecord | null;
	try {
		promotion = await getPromotion();
	} catch {
		// Never cache an outage for long, and never break the public site.
		cacheLife("seconds");
		return null;
	}

	if (!promotion?.isActive) {
		cacheLife("hours");
		return null;
	}

	if (promotion.endsAt) {
		const secondsLeft = secondsUntil(promotion.endsAt);
		if (secondsLeft === 0) {
			cacheLife("hours");
			return null;
		}
		// Turn the cache over exactly when the promo ends.
		cacheLife({ revalidate: secondsLeft, expire: secondsLeft + 60 });
	} else {
		cacheLife("hours");
	}

	return (
		<div data-promo-banner>
			<PromoBannerStrip message={promotion.message} code={promotion.code} />
		</div>
	);
}
