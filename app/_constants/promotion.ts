/** Shared by the Zod schema and the admin form so limits cannot drift apart. */
export const PROMOTION_LIMITS = {
	messageMax: 60,
	codeMax: 20,
} as const;

/** Allowed promo code characters (matches `pattern` on the admin input). */
export const PROMOTION_CODE_PATTERN = "[A-Z0-9]*";

/** Cache tag shared by the cached banner and the admin actions that invalidate it. */
export const PROMOTION_CACHE_TAG = "promotion";

/** Banner end dates are interpreted as the end of that day in this timezone. */
export const PROMOTION_TIME_ZONE = "Australia/Sydney";
