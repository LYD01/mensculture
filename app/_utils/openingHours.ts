import { WEEK_DAYS, type WeekHours } from "@constants";

type SchemaOpeningHoursSpecification = {
	"@type": "OpeningHoursSpecification";
	dayOfWeek: string[];
	opens: string;
	closes: string;
};

/** `"09:30"` becomes `"9:30am"`, `"18:00"` becomes `"6pm"`. */
function formatTime(time: string): string {
	const [hourPart = "0", minutePart = "00"] = time.split(":");
	const hour = Number(hourPart);
	const suffix = hour >= 12 ? "pm" : "am";
	const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
	return minutePart === "00"
		? `${twelveHour}${suffix}`
		: `${twelveHour}:${minutePart}${suffix}`;
}

/** One row per day for the location cards. */
export function formatDisplayHours(
	hours: WeekHours,
): { day: string; hours: string }[] {
	return WEEK_DAYS.map((day) => {
		const slot = hours[day];
		return {
			day,
			hours: slot
				? `${formatTime(slot.opens)}–${formatTime(slot.closes)}`
				: "Closed",
		};
	});
}

/** Schema.org slots for one shop. Days with identical hours share a slot; closed days are omitted. */
export function buildOpeningHoursSpecifications(
	hours: WeekHours,
): SchemaOpeningHoursSpecification[] {
	const slots = new Map<string, SchemaOpeningHoursSpecification>();

	for (const day of WEEK_DAYS) {
		const slot = hours[day];
		if (!slot) continue;

		const key = `${slot.opens}-${slot.closes}`;
		const existing = slots.get(key);
		if (existing) {
			existing.dayOfWeek.push(day);
		} else {
			slots.set(key, {
				"@type": "OpeningHoursSpecification",
				dayOfWeek: [day],
				opens: slot.opens,
				closes: slot.closes,
			});
		}
	}

	return [...slots.values()];
}
