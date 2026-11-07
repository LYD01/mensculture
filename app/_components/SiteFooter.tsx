import { BookButton } from "./BookButton";
import { SocialLinks } from "./SocialLinks";

export function SiteFooter() {
	return (
		<footer className="border-t border-line/60">
			<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-12 sm:flex-row sm:items-center">
				<div>
					<p className="font-display text-2xl text-cream">
						Men&apos;s <span className="text-gold-light">Culture</span>
					</p>
					<p className="mt-2 text-sm text-cream/50">
						Barbers to Sydney&apos;s CBD. Sydney CBD · Martin Place · Circular
						Quay
					</p>
					<SocialLinks />
				</div>
				<BookButton variant="outline" />
			</div>
		</footer>
	);
}
