"use client";

import { useFormStatus } from "react-dom";

import { type AdminButtonIntent, adminButtonIntents } from "./adminStyles";

type SubmitButtonProps = {
	label: string;
	pendingLabel: string;
	intent?: AdminButtonIntent;
	disabled?: boolean;
};

export function SubmitButton({
	label,
	pendingLabel,
	intent = "success",
	disabled = false,
}: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending || disabled}
			className={adminButtonIntents[intent]}
		>
			{pending ? pendingLabel : label}
		</button>
	);
}
