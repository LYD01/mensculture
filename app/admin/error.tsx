"use client";

import {
	adminButtonIntents,
	adminMainClass,
} from "@components/admin/adminStyles";

export default function AdminError({ reset }: { reset: () => void }) {
	return (
		<main className={adminMainClass}>
			<div role="alert" className="space-y-4">
				<h1 className="font-display text-3xl text-cream">
					Something went wrong
				</h1>
				<p className="text-cream-muted">
					The admin page could not load. Check the connection and try again.
				</p>
				<button
					type="button"
					onClick={reset}
					className={adminButtonIntents.neutral}
				>
					Try again
				</button>
			</div>
		</main>
	);
}
