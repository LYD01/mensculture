import { BookButton } from "./BookButton";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
	return (
		<footer className="border-t-4 border-sun bg-navy">
			<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-12 sm:flex-row sm:items-center">
				<div>
					<p className="font-display text-2xl text-cream">
						Men&apos;s <span className="text-sun">Culture</span>
					</p>
					<p className="mt-2 text-sm text-cream-muted">
						Barbers to Sydney&apos;s CBD. Day Street · Martin Place · Circular
						Quay
					</p>
					<SocialLinks />
				</div>
				<BookButton variant="outline" />
			</div>
		</footer>
	);
}
