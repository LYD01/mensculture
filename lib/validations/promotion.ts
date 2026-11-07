import { PROMOTION_LIMITS, PROMOTION_TIME_ZONE } from "@constants";
import { getTodayInTimeZone } from "@utils";

import { z } from "zod";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isRealCalendarDate(value: string): boolean {
	const date = new Date(`${value}T00:00:00Z`);
	return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export const promotionInputSchema = z.object({
	message: z
		.string()
		.trim()
		.min(1, "Enter the banner message.")
		.max(
			PROMOTION_LIMITS.messageMax,
			`Keep the message to ${PROMOTION_LIMITS.messageMax} characters or fewer.`,
		),
	code: z
		.string()
		.trim()
		.toUpperCase()
		.max(
			PROMOTION_LIMITS.codeMax,
			`Keep the code to ${PROMOTION_LIMITS.codeMax} characters or fewer.`,
		)
		.regex(/^[A-Z0-9]*$/, "Use letters and numbers only.")
		.transform((value) => (value === "" ? null : value)),
	isActive: z.boolean(),
	endsOn: z
		.string()
		.trim()
		.refine(
			(value) =>
				value === "" || (DATE_PATTERN.test(value) && isRealCalendarDate(value)),
			"Enter a valid date.",
		)
		.refine(
			(value) =>
				value === "" || value >= getTodayInTimeZone(PROMOTION_TIME_ZONE),
			"The end date cannot be in the past.",
		)
		.transform((value) => (value === "" ? null : value)),
});

export type PromotionInput = z.output<typeof promotionInputSchema>;
