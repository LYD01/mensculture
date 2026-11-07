"use client";

import { useActionState, useState } from "react";

import { PROMOTION_CODE_PATTERN, PROMOTION_LIMITS } from "@constants";
import {
	type PromotionActionState,
	removePromotionAction,
	savePromotionAction,
} from "@/app/_actions/promotion";
import type { PromotionRecord } from "@/db/queries/promotions";

import { PromoBannerStrip } from "../PromoBannerStrip";
import {
	adminButtonIntents,
	adminErrorClass,
	adminHintClass,
	adminInputClass,
	adminLabelClass,
} from "./adminStyles";
import { ConfirmDialog } from "./ConfirmDialog";
import { SubmitButton } from "./SubmitButton";

type PromotionFormProps = {
	initial: PromotionRecord | null;
	/** Today's date in Sydney (`YYYY-MM-DD`), computed on the server. */
	today: string;
};

type FormValues = {
	message: string;
	code: string;
	endsOn: string;
	isActive: boolean;
};

function toFormValues(promotion: PromotionRecord | null): FormValues {
	return {
		message: promotion?.message ?? "",
		code: promotion?.code ?? "",
		endsOn: promotion?.endsOn ?? "",
		isActive: promotion?.isActive ?? true,
	};
}

function describeLiveStatus(
	saved: PromotionRecord | null,
	today: string,
): { live: boolean; detail: string } {
	if (!saved) return { live: false, detail: "No banner has been saved." };
	if (!saved.isActive) {
		return { live: false, detail: "The saved banner is switched off." };
	}
	if (saved.endsOn && saved.endsOn < today) {
		return { live: false, detail: "The end date has passed." };
	}
	return {
		live: true,
		detail: saved.endsOn
			? `It hides at the end of ${saved.endsOn} (Sydney time).`
			: "It stays up until you switch it off or remove it.",
	};
}

export function PromotionForm({ initial, today }: PromotionFormProps) {
	const [saved, setSaved] = useState(initial);
	const [values, setValues] = useState(() => toFormValues(initial));
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [lastAction, setLastAction] = useState<"save" | "remove" | null>(null);

	const [saveState, saveAction] = useActionState<
		PromotionActionState | null,
		FormData
	>(async (previous, formData) => {
		const result = await savePromotionAction(previous, formData);
		setLastAction("save");
		if (result.ok) {
			setSaved(result.promotion);
			setValues(toFormValues(result.promotion));
		}
		return result;
	}, null);

	const [removeState, removeAction] = useActionState<
		PromotionActionState | null,
		FormData
	>(async () => {
		const result = await removePromotionAction();
		setLastAction("remove");
		setConfirmOpen(false);
		if (result.ok) {
			setSaved(null);
			setValues(toFormValues(null));
		}
		return result;
	}, null);

	const status = describeLiveStatus(saved, today);
	const fieldErrors =
		saveState && !saveState.ok ? (saveState.fieldErrors ?? {}) : {};
	const activeResult = lastAction === "remove" ? removeState : saveState;

	function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
		setValues((current) => ({ ...current, [key]: value }));
	}

	return (
		<div className="space-y-8">
			<section aria-labelledby="preview-heading">
				<h2 id="preview-heading" className="text-sm font-medium text-cream">
					Preview
				</h2>
				<div className="mt-2 border border-line">
					{values.message.trim() ? (
						<PromoBannerStrip
							message={values.message.trim()}
							code={values.code.trim() || null}
						/>
					) : (
						<p className="flex h-12 items-center justify-center px-6 text-sm text-cream-muted">
							Type a message to see the banner.
						</p>
					)}
				</div>
				<p className="mt-2 text-sm text-cream-muted">
					<span className="font-semibold text-cream">
						{status.live ? "Live now." : "Not live."}
					</span>{" "}
					{status.detail}
				</p>
			</section>

			<form action={saveAction} className="space-y-6">
				<div>
					<label htmlFor="promo-message" className={adminLabelClass}>
						Banner message
					</label>
					<input
						id="promo-message"
						name="message"
						type="text"
						required
						maxLength={PROMOTION_LIMITS.messageMax}
						value={values.message}
						onChange={(event) => update("message", event.target.value)}
						aria-invalid={fieldErrors.message ? true : undefined}
						aria-describedby="promo-message-hint"
						className={adminInputClass}
					/>
					<p id="promo-message-hint" className={adminHintClass}>
						{values.message.length}/{PROMOTION_LIMITS.messageMax} characters.
						Fits on one line.
					</p>
					{fieldErrors.message?.[0] ? (
						<p role="alert" className={adminErrorClass}>
							{fieldErrors.message[0]}
						</p>
					) : null}
				</div>

				<div>
					<label htmlFor="promo-code" className={adminLabelClass}>
						Promo code (optional)
					</label>
					<input
						id="promo-code"
						name="code"
						type="text"
						maxLength={PROMOTION_LIMITS.codeMax}
						pattern={PROMOTION_CODE_PATTERN}
						title="Letters and numbers only"
						autoCapitalize="characters"
						autoComplete="off"
						value={values.code}
						onChange={(event) =>
							update("code", event.target.value.toUpperCase())
						}
						aria-invalid={fieldErrors.code ? true : undefined}
						className={`${adminInputClass} uppercase`}
					/>
					{fieldErrors.code?.[0] ? (
						<p role="alert" className={adminErrorClass}>
							{fieldErrors.code[0]}
						</p>
					) : null}
				</div>

				<div>
					<label htmlFor="promo-ends-on" className={adminLabelClass}>
						Ends on (optional)
					</label>
					<input
						id="promo-ends-on"
						name="endsOn"
						type="date"
						min={today}
						value={values.endsOn}
						onChange={(event) => update("endsOn", event.target.value)}
						aria-invalid={fieldErrors.endsOn ? true : undefined}
						aria-describedby="promo-ends-on-hint"
						className={adminInputClass}
					/>
					<p id="promo-ends-on-hint" className={adminHintClass}>
						The banner hides itself at the end of this day (Sydney time). Leave
						empty to keep it up until you switch it off.
					</p>
					{fieldErrors.endsOn?.[0] ? (
						<p role="alert" className={adminErrorClass}>
							{fieldErrors.endsOn[0]}
						</p>
					) : null}
				</div>

				<div className="flex items-center gap-3">
					<input
						id="promo-active"
						name="isActive"
						type="checkbox"
						checked={values.isActive}
						onChange={(event) => update("isActive", event.target.checked)}
						className="h-6 w-6 accent-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
					/>
					<label htmlFor="promo-active" className={adminLabelClass}>
						Show the banner on the website
					</label>
				</div>

				<div className="flex flex-wrap items-center gap-4">
					<SubmitButton
						label={values.isActive ? "Save banner" : "Save and keep it off"}
						pendingLabel="Saving..."
						intent={values.isActive ? "success" : "warning"}
					/>
					{saved ? (
						<button
							type="button"
							onClick={() => setConfirmOpen(true)}
							className={adminButtonIntents.destructive}
						>
							Remove banner
						</button>
					) : null}
				</div>

				<div aria-live="polite">
					{activeResult && !activeResult.ok ? (
						<p role="alert" className={adminErrorClass}>
							{activeResult.error}
						</p>
					) : null}
					{activeResult?.ok ? (
						<p className="mt-2 text-sm font-medium text-cream">
							{lastAction === "remove" ? "Banner removed." : "Banner saved."}
						</p>
					) : null}
				</div>
			</form>

			<ConfirmDialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				title="Remove the banner?"
				description="The banner will disappear from the website straight away and its message and code will be deleted."
			>
				<form action={removeAction}>
					<SubmitButton
						label="Remove banner"
						pendingLabel="Removing..."
						intent="destructive"
					/>
				</form>
			</ConfirmDialog>
		</div>
	);
}
