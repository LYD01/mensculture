import {
	LOCATIONS,
	type PriceMenuItem,
	TIMELY_SERVICES,
	type TimelyService,
} from "@constants";

import { formatAudPrice, formatServiceDuration } from "./formatPrice";
import { buildServiceBookingUrl } from "./links";

export type ServiceBookingOption = {
	slug: string;
	shopName: string;
	streetAddress: string;
	/** Timely link for this shop. Null when the shop does not offer the service online. */
	href: string | null;
	/** What Timely charges at this shop, e.g. "From $98 · 45 mins". Null when unknown. */
	detail: string | null;
};

export type ServiceBookingJourney = {
	/** True when the service is preselected on Timely. False means visitors pick it there. */
	preselectsService: boolean;
	options: ServiceBookingOption[];
};

function describeOffer(offer: TimelyService): string {
	const price = `${offer.priceIsFrom ? "From " : ""}${formatAudPrice(offer.priceAud)}`;
	return `${price} · ${formatServiceDuration(offer.durationMinutes)}`;
}

/** Works out, for each shop, where a menu item's booking link should go. Server-side. */
export function buildServiceBookingJourney(
	item: PriceMenuItem,
): ServiceBookingJourney {
	const serviceIds = item.timelyServiceIds;

	return {
		preselectsService: serviceIds !== undefined,
		options: LOCATIONS.map((location) => {
			const base = {
				slug: location.slug,
				shopName: location.name,
				streetAddress: location.streetAddress,
			};

			if (!serviceIds) {
				return { ...base, href: location.bookingUrl, detail: null };
			}

			const serviceId = serviceIds[location.slug];
			if (!serviceId) {
				return { ...base, href: null, detail: null };
			}

			const offer = TIMELY_SERVICES[location.slug][serviceId];
			return {
				...base,
				href: buildServiceBookingUrl(location.timelyLocationId, serviceId),
				detail: offer ? describeOffer(offer) : null,
			};
		}),
	};
}
