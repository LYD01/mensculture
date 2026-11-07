type MapIconProps = {
	className?: string;
};

/** Full-colour folded map with a pin. Colours are fixed, so it reads as a map on dark surfaces. */
export function MapIcon({ className = "h-6 w-6 shrink-0" }: MapIconProps) {
	return (
		<svg className={className} viewBox="0 0 24 24" aria-hidden>
			<path fill="#34A853" d="M2 7.5 8 5.5v13l-6 2z" />
			<path fill="#FBBC04" d="m8 5.5 8 2v13l-8-2z" />
			<path fill="#4285F4" d="m16 7.5 6-2v13l-6 2z" />
			<path
				fill="#EA4335"
				stroke="#121418"
				strokeWidth="0.75"
				d="M12 2.5a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z"
			/>
			<circle cx="12" cy="6.5" r="1.4" fill="#FFFFFF" />
		</svg>
	);
}
