import { BOOKING_URL } from "@constants";

import { BookIcon } from "./BookIcon";

type BookButtonProps = {
	label?: string;
	/** Booking link. Defaults to the general link that lets the visitor pick a shop. */
	href?: string;
	/** Shop name announced by screen readers, e.g. "Day Street". */
	shopName?: string;
	variant?: "solid" | "outline";
	size?: "md" | "lg";
	/** On viewports below `sm`, show only the calendar icon (for compact headers). */
	mobileIconOnly?: boolean;
};

const variants = {
	solid:
		"bg-sun text-navy shadow-none hover:bg-sun-hover hover:text-navy focus-visible:outline-cream",
	outline:
		"border border-sun text-sun shadow-none hover:bg-sun hover:text-navy focus-visible:outline-sun",
};

const sizes = {
	md: "px-5 py-2.5 text-xs",
	lg: "px-8 py-4 text-sm",
};

const mobileIconOnlySizes = {
	md: "p-2.5 sm:px-5 sm:py-2.5 sm:text-xs",
	lg: "p-3 sm:px-8 sm:py-4 sm:text-sm",
};

export function BookButton({
	label = "Book now",
	href = BOOKING_URL,
	shopName,
	variant = "solid",
	size = "md",
	mobileIconOnly = false,
}: BookButtonProps) {
	const sizeClass = mobileIconOnly ? mobileIconOnlySizes[size] : sizes[size];
	// In-page anchors (e.g. "#locations") scroll on the same page instead of opening a tab.
	const isExternal = !href.startsWith("#");
	const newTabNote = isExternal ? "(opens in a new tab)" : "";

	return (
		<a
			href={href}
			{...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className={`inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 [text-shadow:none] ${variants[variant]} ${sizeClass}`}
		>
			{mobileIconOnly ? (
				<BookIcon className="h-5 w-5 shrink-0 sm:hidden" />
			) : null}
			{mobileIconOnly ? (
				<span className="sr-only sm:hidden">
					{label} {newTabNote}
				</span>
			) : null}

			<span className={mobileIconOnly ? "hidden sm:inline" : undefined}>
				{label}
			</span>
			{shopName ? <span className="sr-only">at {shopName}</span> : null}
			{mobileIconOnly ? (
				<span className="hidden sm:inline" aria-hidden="true">
					→
				</span>
			) : (
				<span aria-hidden="true">→</span>
			)}
			{isExternal ? (
				<span className={mobileIconOnly ? "sr-only max-sm:hidden" : "sr-only"}>
					{newTabNote}
				</span>
			) : null}
		</a>
	);
}
