import "server-only";

import { PROMOTION_TIME_ZONE } from "@constants";

import { sql } from "drizzle-orm";

import { db } from "../index";
import { promotions } from "../schema";

/** Serialisable promotion: dates are strings so it can cross to Client Components. */
export type PromotionRecord = {
	message: string;
	code: string | null;
	isActive: boolean;
	/** Calendar date (`YYYY-MM-DD`) the promo runs until, inclusive. */
	endsOn: string | null;
	/** ISO instant the end date finishes in Sydney time (start of the next day). */
	endsAt: string | null;
	updatedAt: string;
};

export type PromotionWriteInput = {
	message: string;
	code: string | null;
	isActive: boolean;
	endsOn: string | null;
};

export async function getPromotion(): Promise<PromotionRecord | null> {
	const [row] = await db
		.select({
			message: promotions.message,
			code: promotions.code,
			isActive: promotions.isActive,
			endsOn: promotions.endsOn,
			// Postgres resolves daylight saving; returned as an ISO text instant.
			endsAt: sql<string | null>`to_char(
				((${promotions.endsOn} + 1)::timestamp at time zone ${PROMOTION_TIME_ZONE}) at time zone 'UTC',
				'YYYY-MM-DD"T"HH24:MI:SS"Z"'
			)`,
			updatedAt: sql<string>`to_char(
				${promotions.updatedAt} at time zone 'UTC',
				'YYYY-MM-DD"T"HH24:MI:SS"Z"'
			)`,
		})
		.from(promotions)
		.limit(1);

	return row ?? null;
}

export async function upsertPromotion(
	input: PromotionWriteInput,
): Promise<void> {
	await db
		.insert(promotions)
		.values({ id: 1, ...input })
		.onConflictDoUpdate({
			target: promotions.id,
			set: { ...input, updatedAt: sql`now()` },
		});
}

export async function deletePromotion(): Promise<void> {
	await db.delete(promotions);
}
