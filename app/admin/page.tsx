import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LogoutButton, PromotionForm } from "@components";
import { adminMainClass } from "@components/admin/adminStyles";
import { ADMIN_LOGIN_PATH, PROMOTION_TIME_ZONE } from "@constants";
import { getTodayInTimeZone } from "@utils";
import { getPromotion } from "@/db/queries/promotions";
import { isAuthenticated } from "@/lib/session";

export default function AdminPage() {
	return (
		<main className={adminMainClass}>
			<div className="mb-8 flex items-center justify-between gap-4">
				<h1 className="font-display text-3xl text-cream">Promotion banner</h1>
				<LogoutButton />
			</div>
			<Suspense fallback={<p className="text-cream-muted">Loading...</p>}>
				<AdminPanel />
			</Suspense>
		</main>
	);
}

async function AdminPanel() {
	if (!(await isAuthenticated())) redirect(ADMIN_LOGIN_PATH);

	// Read straight from the database (uncached) so the owner always sees current data.
	const promotion = await getPromotion();

	return (
		<PromotionForm
			initial={promotion}
			today={getTodayInTimeZone(PROMOTION_TIME_ZONE)}
		/>
	);
}
