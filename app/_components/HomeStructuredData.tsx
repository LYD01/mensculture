import {
	LOCATIONS,
	SITE_DESCRIPTION,
	SITE_URL,
	SOCIAL_LINKS,
} from "@constants";
import { buildOpeningHoursSpecifications } from "@utils";

export function HomeStructuredData() {
	const graph = [
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: "Men's Culture",
			description: SITE_DESCRIPTION,
		},
		...LOCATIONS.map((location, index) => ({
			"@type": "HairSalon",
			"@id": `${SITE_URL}/#location-${index}`,
			name: `Men's Culture ${location.name}`,
			image: `${SITE_URL}${location.image}`,
			telephone: location.phone,
			url: SITE_URL,
			hasMap: location.mapsUrl,
			priceRange: "$$",
			address: {
				"@type": "PostalAddress",
				streetAddress: location.streetAddress,
				addressLocality: location.suburb,
				addressRegion: location.state,
				postalCode: location.postcode,
				addressCountry: "AU",
			},
			openingHoursSpecification: buildOpeningHoursSpecifications(
				location.hours,
			),
			sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
			potentialAction: {
				"@type": "ReserveAction",
				target: {
					"@type": "EntryPoint",
					urlTemplate: location.bookingUrl,
					actionPlatform: [
						"http://schema.org/DesktopWebPlatform",
						"http://schema.org/MobileWebPlatform",
					],
				},
				result: {
					"@type": "Reservation",
					name: "Book a haircut",
				},
			},
		})),
	];

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": graph,
	};

	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD from site constants only
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
