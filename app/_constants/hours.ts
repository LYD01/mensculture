export type OpeningHoursSlot = {
	days: readonly string[];
	opens: string;
	closes: string;
};

/** Schema.org day/time slots (24-hour HH:MM). Shared across CBD shops. */
export const OPENING_HOURS_SLOTS: OpeningHoursSlot[] = [
	{ days: ["Monday", "Tuesday", "Friday"], opens: "09:30", closes: "18:00" },
	{ days: ["Wednesday"], opens: "09:00", closes: "17:30" },
	{ days: ["Thursday"], opens: "09:00", closes: "20:00" },
	{ days: ["Saturday"], opens: "08:00", closes: "16:00" },
];

export const OPENING_HOURS_DISPLAY: { day: string; hours: string }[] = [
	{ day: "Monday", hours: "9:30am–6pm" },
	{ day: "Tuesday", hours: "9:30am–6pm" },
	{ day: "Wednesday", hours: "9am–5:30pm" },
	{ day: "Thursday", hours: "9am–8pm" },
	{ day: "Friday", hours: "9:30am–6pm" },
	{ day: "Saturday", hours: "8am–4pm" },
	{ day: "Sunday", hours: "Closed" },
];
