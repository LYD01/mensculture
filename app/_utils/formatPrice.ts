/** Format an AUD whole-dollar menu price (no cents). */
export function formatAudPrice(dollars: number): string {
	return new Intl.NumberFormat("en-AU", {
		style: "currency",
		currency: "AUD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(dollars);
}

export function formatServiceDuration(minutes: number): string {
	return `${minutes} mins`;
}
