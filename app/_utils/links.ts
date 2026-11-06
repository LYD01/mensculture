/** Build a `tel:` href from a phone string (strips spaces and punctuation). */
export function buildTelHref(phone: string): string {
	const normalized = phone.replace(/[^\d+]/g, "");
	return `tel:${normalized}`;
}
