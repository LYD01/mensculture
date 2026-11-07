import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { connection } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@constants";

import { getAuthEnv } from "./env";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Key derived from both secrets, so changing ADMIN_PASSWORD invalidates
 * every existing session.
 */
function getSigningKey(): Buffer {
	const { SESSION_SECRET, ADMIN_PASSWORD } = getAuthEnv();
	return createHash("sha256")
		.update(`${SESSION_SECRET}:${ADMIN_PASSWORD}`)
		.digest();
}

function sign(payload: string): string {
	return createHmac("sha256", getSigningKey()).update(payload).digest("hex");
}

function isValidToken(token: string): boolean {
	const [expiresAtRaw, signature, ...rest] = token.split(".");
	if (!expiresAtRaw || !signature || rest.length > 0) return false;

	const expected = Buffer.from(sign(expiresAtRaw));
	const actual = Buffer.from(signature);
	if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
		return false;
	}

	const expiresAt = Number(expiresAtRaw);
	return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function createSession(): Promise<void> {
	const expiresAt = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
	const store = await cookies();
	store.set(ADMIN_SESSION_COOKIE, `${expiresAt}.${sign(expiresAt)}`, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE_SECONDS,
	});
}

export async function destroySession(): Promise<void> {
	const store = await cookies();
	store.delete(ADMIN_SESSION_COOKIE);
}

/** Verifies the cookie signature and expiry. Call from the admin page and every admin action. */
export async function isAuthenticated(): Promise<boolean> {
	// Expiry checks read the clock, so wait for a real request (not a prefetch render).
	await connection();
	const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
	return token ? isValidToken(token) : false;
}
