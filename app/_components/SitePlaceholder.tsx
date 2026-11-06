type SitePlaceholderProps = {
	message: string;
};

export function SitePlaceholder({ message }: SitePlaceholderProps) {
	return (
		<p className="text-sm text-neutral-500" data-testid="site-placeholder">
			{message}
		</p>
	);
}
