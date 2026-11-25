import { BOOKING_BASE_URL } from "@constants";

/** Build a `tel:` href from a phone string (strips spaces and punctuation). */
export function buildTelHref(phone: string): string {
	const normalized = phone.replace(/[^\d+]/g, "");
	return `tel:${normalized}`;
}

/**
 * Timely booking link for one shop with one service preselected. Timely skips the
 * service picker and opens on the "preferred staff" step.
 */
export function buildServiceBookingUrl(
	timelyLocationId: string,
	timelyServiceId: string,
): string {
	return `${BOOKING_BASE_URL}?location=${timelyLocationId}&service=${timelyServiceId}`;
}
