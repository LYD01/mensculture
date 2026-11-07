"use server";

import { createHash, timingSafeEqual } from "node:crypto";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
	ADMIN_HONEYPOT_FIELD,
	ADMIN_LOGIN_PATH,
	ADMIN_PASSWORD_FIELD,
} from "@constants";
import { getAuthEnv } from "@/lib/env";
import { checkRateLimit, clearFailures, recordFailure } from "@/lib/rateLimit";
import { createSession, destroySession } from "@/lib/session";

export type LoginState =
	| { ok: true }
	| { ok: false; error: string; retryAfterSeconds?: number };

const FAILURE_DELAY_MS = 1000;
const GENERIC_ERROR = "Incorrect password.";

function digest(value: string): Buffer {
	return createHash("sha256").update(value).digest();
}

function passwordMatches(input: string): boolean {
	return timingSafeEqual(digest(input), digest(getAuthEnv().ADMIN_PASSWORD));
}

async function getClientKey(): Promise<string> {
	const forwarded = (await headers()).get("x-forwarded-for");
	return forwarded?.split(",")[0]?.trim() || "local";
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginAction(
	_previous: LoginState | null,
	formData: FormData,
): Promise<LoginState> {
	const key = await getClientKey();

	// Bots fill every field. Respond exactly like a wrong password.
	const honeypot = formData.get(ADMIN_HONEYPOT_FIELD);
	if (typeof honeypot === "string" && honeypot !== "") {
		recordFailure(key);
		await delay(FAILURE_DELAY_MS);
		return { ok: false, error: GENERIC_ERROR };
	}

	const limit = checkRateLimit(key);
	if (limit.limited) {
		return {
			ok: false,
			error: "Too many attempts. Try again later.",
			retryAfterSeconds: limit.retryAfterSeconds,
		};
	}

	const password = formData.get(ADMIN_PASSWORD_FIELD);
	if (typeof password !== "string" || password === "") {
		return { ok: false, error: "Enter the password." };
	}

	if (!passwordMatches(password)) {
		recordFailure(key);
		await delay(FAILURE_DELAY_MS);
		return { ok: false, error: GENERIC_ERROR };
	}

	clearFailures(key);
	await createSession();
	return { ok: true };
}

export async function logoutAction(): Promise<void> {
	await destroySession();
	redirect(ADMIN_LOGIN_PATH);
}
