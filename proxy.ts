import { type NextRequest, NextResponse } from "next/server";

import { ADMIN_LOGIN_PATH, ADMIN_SESSION_COOKIE } from "@constants/admin";

/**
 * Optimistic gate for the admin area: only checks that a session cookie exists.
 * The signature is verified in the admin page and every Server Action, because
 * Server Actions on routes outside this matcher never pass through here.
 */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isLoginPage = pathname === ADMIN_LOGIN_PATH;

	const response =
		isLoginPage || request.cookies.has(ADMIN_SESSION_COOKIE)
			? NextResponse.next()
			: NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));

	response.headers.set("X-Robots-Tag", "noindex, nofollow");
	response.headers.set("Referrer-Policy", "no-referrer");

	return response;
}

export const config = {
	matcher: "/admin/:path*",
};
