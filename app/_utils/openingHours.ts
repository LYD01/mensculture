import { OPENING_HOURS_SLOTS } from "@constants";

type SchemaOpeningHoursSpecification = {
	"@type": "OpeningHoursSpecification";
	dayOfWeek: readonly string[];
	opens: string;
	closes: string;
};

export function buildOpeningHoursSpecifications(): SchemaOpeningHoursSpecification[] {
	return OPENING_HOURS_SLOTS.map((slot) => ({
		"@type": "OpeningHoursSpecification",
		dayOfWeek: slot.days,
		opens: slot.opens,
		closes: slot.closes,
	}));
}
