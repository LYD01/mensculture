"use server";

import { updateTag } from "next/cache";

import { PROMOTION_CACHE_TAG } from "@constants";
import {
	type PromotionRecord,
	deletePromotion,
	getPromotion,
	upsertPromotion,
} from "@/db/queries/promotions";
import { isAuthenticated } from "@/lib/session";
import { promotionInputSchema } from "@/lib/validations/promotion";

import { z } from "zod";

export type PromotionActionState =
	| { ok: true; promotion: PromotionRecord | null }
	| {
			ok: false;
			error: string;
			fieldErrors?: Partial<Record<string, string[]>>;
	  };

const UNAUTHORIZED: PromotionActionState = {
	ok: false,
	error: "Your session has expired. Log in again.",
};
const SAVE_FAILED: PromotionActionState = {
	ok: false,
	error: "Could not save the banner. Try again in a moment.",
};

function readText(formData: FormData, name: string): string {
	const value = formData.get(name);
	return typeof value === "string" ? value : "";
}

export async function savePromotionAction(
	_previous: PromotionActionState | null,
	formData: FormData,
): Promise<PromotionActionState> {
	// Server Actions are public endpoints: always re-check the session.
	if (!(await isAuthenticated())) return UNAUTHORIZED;

	const parsed = promotionInputSchema.safeParse({
		message: readText(formData, "message"),
		code: readText(formData, "code"),
		isActive: formData.get("isActive") === "on",
		endsOn: readText(formData, "endsOn"),
	});
	if (!parsed.success) {
		return {
			ok: false,
			error: "Fix the highlighted fields and try again.",
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
		};
	}

	try {
		await upsertPromotion(parsed.data);
		updateTag(PROMOTION_CACHE_TAG);
		return { ok: true, promotion: await getPromotion() };
	} catch {
		return SAVE_FAILED;
	}
}

export async function removePromotionAction(): Promise<PromotionActionState> {
	if (!(await isAuthenticated())) return UNAUTHORIZED;

	try {
		await deletePromotion();
		updateTag(PROMOTION_CACHE_TAG);
		return { ok: true, promotion: null };
	} catch {
		return {
			ok: false,
			error: "Could not remove the banner. Try again in a moment.",
		};
	}
}
