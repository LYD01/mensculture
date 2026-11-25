"use client";

import { useRef, useState } from "react";

import type { ServiceBookingJourney, ServiceBookingOption } from "@utils";

type ServiceBookDialogProps = {
	serviceName: string;
	journey: ServiceBookingJourney;
};

const LAST_SHOP_STORAGE_KEY = "mensculture:last-shop";

function readLastShop(): string | null {
	try {
		return window.localStorage.getItem(LAST_SHOP_STORAGE_KEY);
	} catch {
		return null;
	}
}

function rememberShop(slug: string) {
	try {
		window.localStorage.setItem(LAST_SHOP_STORAGE_KEY, slug);
	} catch {
		// Storage can be blocked (private mode). The journey still works without it.
	}
}

/** Shops that can take the booking come first, and the visitor's usual shop leads. */
function orderOptions(
	options: ServiceBookingOption[],
	lastShop: string | null,
): ServiceBookingOption[] {
	const rank = (option: ServiceBookingOption) => {
		if (option.href === null) return 2;
		return option.slug === lastShop ? 0 : 1;
	};
	return [...options].sort((a, b) => rank(a) - rank(b));
}

export function ServiceBookDialog({
	serviceName,
	journey,
}: ServiceBookDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [lastShop, setLastShop] = useState<string | null>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	function openDialog() {
		setLastShop(readLastShop());
		setIsOpen(true);
	}

	function attachDialog(node: HTMLDialogElement | null) {
		dialogRef.current = node;
		// showModal makes the page behind inert, traps focus and closes on Escape.
		if (node && !node.open) node.showModal();
	}

	function handleClose() {
		setIsOpen(false);
		triggerRef.current?.focus();
	}

	function handleOptionClick(slug: string) {
		rememberShop(slug);
		// Let the new tab open before the dialog (and its link) leave the page.
		window.setTimeout(() => dialogRef.current?.close(), 200);
	}

	const titleId = `book-title-${serviceName.replace(/\W+/g, "-").toLowerCase()}`;
	const descriptionId = `${titleId}-description`;
	const options = orderOptions(journey.options, lastShop);

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				aria-haspopup="dialog"
				onClick={openDialog}
				className="inline-flex min-h-9 shrink-0 items-center border border-navy px-3 text-xs font-semibold uppercase tracking-[0.15em] text-navy transition-colors hover:border-sun hover:bg-sun focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
			>
				Book<span className="sr-only"> {serviceName}</span>
			</button>
			{isOpen ? (
				// biome-ignore lint/a11y/useKeyWithClickEvents: Escape already closes a modal dialog; the backdrop click is a pointer shortcut.
				<dialog
					ref={attachDialog}
					aria-labelledby={titleId}
					aria-describedby={descriptionId}
					onClose={handleClose}
					onClick={(event) => {
						if (event.target === event.currentTarget)
							event.currentTarget.close();
					}}
					className="m-auto w-[min(32rem,calc(100vw-2rem))] border-t-4 border-sun bg-paper p-0 text-navy backdrop:bg-navy/70"
				>
					<div className="p-6 sm:p-8">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
							Step 1 of 2: choose your shop
						</p>
						<h2
							id={titleId}
							className="mt-3 font-display text-3xl leading-tight"
						>
							Book {serviceName}
						</h2>
						<p id={descriptionId} className="mt-3 leading-relaxed text-stone">
							{journey.preselectsService
								? "We will select this service for you on our booking page."
								: "You will choose your service on our booking page."}{" "}
							It opens in a new tab.
						</p>

						<ul className="mt-6 space-y-3">
							{options.map((option) => (
								<li key={option.slug}>
									{option.href === null ? (
										<div className="border border-navy/15 bg-cream/60 p-4 text-stone">
											<span className="block font-display text-xl">
												{option.shopName}
											</span>
											<span className="mt-1 block text-sm">
												Not offered online at this shop.
											</span>
										</div>
									) : (
										<a
											href={option.href}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => handleOptionClick(option.slug)}
											className="group flex min-h-16 items-center justify-between gap-4 border border-navy/25 bg-white p-4 transition-colors hover:border-navy hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
										>
											<span>
												<span className="sr-only">Book at </span>
												<span className="block font-display text-xl">
													{option.shopName}
												</span>
												<span className="mt-1 block text-sm text-stone">
													{option.streetAddress}
													{option.slug === lastShop ? " · Your usual shop" : ""}
												</span>
											</span>
											<span className="flex items-center gap-3">
												{option.detail ? (
													<span className="text-right text-sm tabular-nums">
														{option.detail}
													</span>
												) : null}
												<span aria-hidden="true" className="text-lg">
													→
												</span>
											</span>
											<span className="sr-only">(opens in a new tab)</span>
										</a>
									)}
								</li>
							))}
						</ul>

						<p className="mt-6 text-sm text-stone">
							Step 2 is on the booking page: pick your barber and a time.
						</p>
						<button
							type="button"
							onClick={() => dialogRef.current?.close()}
							className="mt-6 inline-flex min-h-11 items-center border border-navy/40 px-5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-navy hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
						>
							Cancel
						</button>
					</div>
				</dialog>
			) : null}
		</>
	);
}
