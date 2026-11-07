const buttonBase =
	"inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light disabled:cursor-not-allowed disabled:opacity-60";

export const adminButtonIntents = {
	success: `${buttonBase} bg-action-success text-cream hover:bg-action-success-hover`,
	warning: `${buttonBase} bg-action-warning text-ink hover:bg-action-warning-hover`,
	destructive: `${buttonBase} bg-action-destructive text-cream hover:bg-action-destructive-hover`,
	// Inverts on hover: light fill, dark text.
	neutral: `${buttonBase} border border-cream-muted text-cream hover:bg-cream hover:text-ink`,
} as const;

/** Page wrapper for admin routes (the root layout's body is a flex column). */
export const adminMainClass =
	"relative mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12";

export type AdminButtonIntent = keyof typeof adminButtonIntents;

export const adminLabelClass = "block text-sm font-medium text-cream";

export const adminInputClass =
	"mt-2 block w-full min-h-11 border border-cream-muted bg-ink px-4 py-2.5 text-cream placeholder:text-cream-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light aria-[invalid=true]:border-action-warning";

export const adminHintClass = "mt-2 text-sm text-cream-muted";

export const adminErrorClass = "mt-2 text-sm font-medium text-action-warning";
