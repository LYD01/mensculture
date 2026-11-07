import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LockBadge, LoginForm, SiteHeader } from "@components";
import { adminMainClass } from "@components/admin/adminStyles";
import { ADMIN_HOME_PATH } from "@constants";
import { isAuthenticated } from "@/lib/session";

export default function AdminLoginPage() {
	return (
		<>
			<SiteHeader variant="minimal" />
			<main className={adminMainClass}>
				<div className="relative mx-auto mt-4 w-full max-w-sm border border-line bg-ink-soft px-8 pt-14 pb-8">
					<LockBadge />
					<h1 className="text-center font-display text-3xl text-cream">
						Admin login
					</h1>
					<p className="mt-2 mb-8 text-center text-sm text-cream-muted">
						Sign in to manage the promotion banner.
					</p>
					<Suspense fallback={null}>
						<RedirectIfAuthenticated />
					</Suspense>
					<LoginForm />
				</div>
			</main>
		</>
	);
}

async function RedirectIfAuthenticated() {
	if (await isAuthenticated()) redirect(ADMIN_HOME_PATH);
	return null;
}
