/** Decorative padlock in a gold ring, straddling the top edge of the login card. */
export function LockBadge() {
	return (
		<span
			aria-hidden="true"
			className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-ink bg-gold-light text-ink"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-7 w-7"
				focusable="false"
			>
				<title>Lock</title>
				<rect x="4" y="11" width="16" height="10" rx="2" />
				<path d="M8 11V7a4 4 0 0 1 8 0v4" />
				<circle cx="12" cy="16" r="1" fill="currentColor" />
			</svg>
		</span>
	);
}
