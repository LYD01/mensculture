export const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as const;

export type WeekDay = (typeof WEEK_DAYS)[number];

/** 24-hour `HH:MM` times, or `null` when the shop is closed that day. */
export type DayHours = { opens: string; closes: string } | null;

export type WeekHours = Record<WeekDay, DayHours>;

/** Builds a week: one rule for Monday to Friday, one for Saturday, closed Sunday. */
function buildWeek(
	weekdays: DayHours,
	saturday: DayHours,
	overrides: Partial<WeekHours> = {},
): WeekHours {
	return {
		Monday: weekdays,
		Tuesday: weekdays,
		Wednesday: weekdays,
		Thursday: weekdays,
		Friday: weekdays,
		Saturday: saturday,
		Sunday: null,
		...overrides,
	};
}

export const DAY_STREET_HOURS = buildWeek(
	{ opens: "10:00", closes: "19:00" },
	{ opens: "10:00", closes: "16:00" },
);

export const MARTIN_PLACE_HOURS = buildWeek(
	{ opens: "08:00", closes: "18:00" },
	null,
);

export const CIRCULAR_QUAY_HOURS = buildWeek(
	{ opens: "10:00", closes: "19:00" },
	{ opens: "10:00", closes: "16:00" },
	{ Friday: { opens: "10:00", closes: "18:00" } },
);
