import {
	AboutSection,
	BookingSection,
	HeroSection,
	PricingSection,
	ServicesSection,
	SiteFooter,
	SiteHeader,
} from "@components";

export default function Home() {
	return (
		<>
			<SiteHeader />
			<main className="flex-1">
				<HeroSection />
				<AboutSection />
				<ServicesSection />
				<PricingSection />
				<BookingSection />
			</main>
			<SiteFooter />
		</>
	);
}
