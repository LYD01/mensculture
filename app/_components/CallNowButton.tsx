import { PhoneIcon } from "./PhoneIcon";

type CallNowButtonProps = {
	size?: "md" | "lg";
};

const sizes = {
	md: "px-5 py-2.5 text-xs",
	lg: "px-8 py-4 text-sm",
};

export function CallNowButton({ size = "md" }: CallNowButtonProps) {
	return (
		<a
			href="#locations"
			className={`inline-flex items-center justify-center gap-2 border border-gold font-semibold uppercase tracking-[0.18em] text-gold-light shadow-none transition-colors hover:bg-gold-button hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light [text-shadow:none] ${sizes[size]}`}
		>
			<PhoneIcon className="h-5 w-5 shrink-0" />
			Call now
		</a>
	);
}
