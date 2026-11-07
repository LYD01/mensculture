import {
	AboutSection,
	BookingSection,
	HeroSection,
	HomeStructuredData,
	PricingSection,
	ServicesSection,
	SiteFooter,
	SiteHeader,
} from "@components";
import { homePageMetadata } from "@constants";

export const metadata = homePageMetadata;

export default function Home() {
	return (
		<>
			<HomeStructuredData />
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
