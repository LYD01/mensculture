import { BOOKING_URL } from "@constants";

type BookButtonProps = {
	label?: string;
	variant?: "solid" | "outline";
	size?: "md" | "lg";
};

const variants = {
	solid:
		"bg-gold-button text-ink shadow-none hover:bg-gold-light hover:text-ink focus-visible:outline-ink",
	outline:
		"border border-gold text-gold-light shadow-none hover:bg-gold-button hover:text-ink focus-visible:outline-gold-light",
};

const sizes = {
	md: "px-5 py-2.5 text-xs",
	lg: "px-8 py-4 text-sm",
};

export function BookButton({
	label = "Book now",
	variant = "solid",
	size = "md",
}: BookButtonProps) {
	return (
		<a
			href={BOOKING_URL}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 [text-shadow:none] ${variants[variant]} ${sizes[size]}`}
		>
			{label}
			<span aria-hidden="true">→</span>
			<span className="sr-only">(opens in a new tab)</span>
		</a>
	);
}
