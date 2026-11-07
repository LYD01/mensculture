type PromoBannerStripProps = {
	message: string;
	code: string | null;
};

/** Presentational single-line banner. Shared by the live banner and the admin preview. */
export function PromoBannerStrip({ message, code }: PromoBannerStripProps) {
	return (
		<div className="bg-promo text-cream">
			<p className="mx-auto flex h-12 max-w-6xl items-center justify-center gap-3 px-6 text-sm sm:text-base">
				<span className="truncate font-semibold">{message}</span>
				{code ? (
					<span className="shrink-0 bg-cream px-2.5 py-1 text-xs font-bold tracking-[0.18em] text-promo sm:text-sm">
						<span className="sr-only">Code: </span>
						{code}
					</span>
				) : null}
			</p>
		</div>
	);
}
