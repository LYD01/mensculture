import { PhoneIcon } from "./PhoneIcon";

type CallNowButtonProps = {
	size?: "md" | "lg";
	/** On viewports below `sm`, show only the phone icon (for compact headers). */
	mobileIconOnly?: boolean;
};

const sizes = {
	md: "px-5 py-2.5 text-xs",
	lg: "px-8 py-4 text-sm",
};

const mobileIconOnlySizes = {
	md: "p-2.5 sm:px-5 sm:py-2.5 sm:text-xs",
	lg: "p-3 sm:px-8 sm:py-4 sm:text-sm",
};

export function CallNowButton({
	size = "md",
	mobileIconOnly = false,
}: CallNowButtonProps) {
	const sizeClass = mobileIconOnly ? mobileIconOnlySizes[size] : sizes[size];

	return (
		<a
			href="#locations"
			className={`inline-flex items-center justify-center gap-2 border border-sun font-semibold uppercase tracking-[0.18em] text-sun shadow-none transition-colors hover:bg-sun hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun [text-shadow:none] ${sizeClass}`}
		>
			<PhoneIcon variant="solid" className="h-5 w-5 shrink-0" />
			{mobileIconOnly ? (
				<span className="sr-only sm:hidden">Call now</span>
			) : null}
			<span className={mobileIconOnly ? "hidden sm:inline" : undefined}>
				Call now
			</span>
		</a>
	);
}
