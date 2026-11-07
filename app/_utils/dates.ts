const DISPLAY_LOCALE = "en-AU";

/** Format a date for display on the public site (fixed locale avoids SSR/client drift). */
export function formatDisplayDate(
	date: Date,
	options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
	return date.toLocaleDateString(DISPLAY_LOCALE, options);
}

/** Today's calendar date as `YYYY-MM-DD` in the given IANA timezone. */
export function getTodayInTimeZone(timeZone: string): string {
	// The `en-CA` locale formats dates as YYYY-MM-DD.
	return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}
