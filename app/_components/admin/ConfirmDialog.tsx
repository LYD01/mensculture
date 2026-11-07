"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { adminButtonIntents } from "./adminStyles";

type ConfirmDialogProps = {
	open: boolean;
	onClose: () => void;
	title: string;
	description: string;
	/** The confirm control (a form with a submit button), rendered beside Cancel. */
	children: ReactNode;
};

export function ConfirmDialog({
	open,
	onClose,
	title,
	description,
	children,
}: ConfirmDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			aria-labelledby="confirm-dialog-title"
			aria-describedby="confirm-dialog-description"
			className="m-auto w-[calc(100%-3rem)] max-w-md border border-cream-muted bg-ink-soft p-6 text-cream backdrop:bg-black/70"
		>
			<h2 id="confirm-dialog-title" className="font-display text-2xl">
				{title}
			</h2>
			<p id="confirm-dialog-description" className="mt-3 text-cream-muted">
				{description}
			</p>
			<div className="mt-6 flex flex-wrap justify-end gap-3">
				<button
					type="button"
					onClick={onClose}
					className={adminButtonIntents.neutral}
				>
					Cancel
				</button>
				{children}
			</div>
		</dialog>
	);
}
