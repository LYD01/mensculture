const DISPLAY_LOCALE = "en-AU";

/** Format a date for display on the public site (fixed locale avoids SSR/client drift). */
export function formatDisplayDate(
	date: Date,
	options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
	return date.toLocaleDateString(DISPLAY_LOCALE, options);
}
