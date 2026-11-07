"use client";

import { useRouter } from "next/navigation";
import {
	useActionState,
	useEffect,
	useState,
	useSyncExternalStore,
} from "react";

import {
	ADMIN_HOME_PATH,
	ADMIN_HONEYPOT_FIELD,
	ADMIN_PASSWORD_FIELD,
} from "@constants";
import { type LoginState, loginAction } from "@/app/_actions/auth";

import {
	adminErrorClass,
	adminInputClass,
	adminLabelClass,
} from "./adminStyles";
import { SubmitButton } from "./SubmitButton";

const COOLDOWN_KEY = "mc_admin_cooldown_until";
const FAILURES_KEY = "mc_admin_failures";
const FAILURES_BEFORE_COOLDOWN = 3;
const BASE_COOLDOWN_SECONDS = 30;
const MAX_COOLDOWN_SECONDS = 300;

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
	listeners.add(listener);
	window.addEventListener("storage", listener);
	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", listener);
	};
}

function notify(): void {
	for (const listener of listeners) listener();
}

function readCooldownUntil(): string {
	return window.localStorage.getItem(COOLDOWN_KEY) ?? "0";
}

function readServerSnapshot(): string {
	return "0";
}

/** Client-side speed bump: escalating cooldown after repeated failures (the server enforces its own limit). */
function recordLoginResult(result: LoginState): void {
	if (result.ok) {
		window.localStorage.removeItem(FAILURES_KEY);
		window.localStorage.removeItem(COOLDOWN_KEY);
		notify();
		return;
	}

	const failures = Number(window.localStorage.getItem(FAILURES_KEY) ?? "0") + 1;
	window.localStorage.setItem(FAILURES_KEY, String(failures));

	let cooldownSeconds = result.retryAfterSeconds ?? 0;
	if (!cooldownSeconds && failures >= FAILURES_BEFORE_COOLDOWN) {
		cooldownSeconds = Math.min(
			BASE_COOLDOWN_SECONDS * 2 ** (failures - FAILURES_BEFORE_COOLDOWN),
			MAX_COOLDOWN_SECONDS,
		);
	}
	if (cooldownSeconds) {
		window.localStorage.setItem(
			COOLDOWN_KEY,
			String(Date.now() + cooldownSeconds * 1000),
		);
		notify();
	}
}

export function LoginForm() {
	const router = useRouter();
	const [state, formAction] = useActionState<LoginState | null, FormData>(
		async (previous, formData) => {
			const result = await loginAction(previous, formData);
			recordLoginResult(result);
			return result;
		},
		null,
	);

	const cooldownUntil = Number(
		useSyncExternalStore(subscribe, readCooldownUntil, readServerSnapshot),
	);
	const [now, setNow] = useState(0);

	useEffect(() => {
		if (cooldownUntil <= 0) return;
		const tick = () => setNow(Date.now());
		const timeout = window.setTimeout(tick, 0);
		const interval = window.setInterval(tick, 1000);
		return () => {
			window.clearTimeout(timeout);
			window.clearInterval(interval);
		};
	}, [cooldownUntil]);

	useEffect(() => {
		if (state?.ok) router.replace(ADMIN_HOME_PATH);
	}, [state, router]);

	const isCoolingDown = cooldownUntil > 0 && (now === 0 || cooldownUntil > now);
	const secondsLeft =
		now > 0 ? Math.max(0, Math.ceil((cooldownUntil - now) / 1000)) : null;
	const errorMessage = state && !state.ok ? state.error : null;

	return (
		<form action={formAction} className="space-y-6">
			{/* Lets password managers save and fill the password against a username. */}
			<input
				type="text"
				name="username"
				value="admin"
				readOnly
				autoComplete="username"
				tabIndex={-1}
				aria-hidden="true"
				className="sr-only"
			/>

			{/* Honeypot: invisible to people, tempting to bots. */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
			>
				<input
					type="text"
					name={ADMIN_HONEYPOT_FIELD}
					tabIndex={-1}
					autoComplete="off"
					defaultValue=""
				/>
			</div>

			<div>
				<label htmlFor="admin-password" className={adminLabelClass}>
					Password
				</label>
				<input
					id="admin-password"
					type="password"
					name={ADMIN_PASSWORD_FIELD}
					required
					autoComplete="current-password"
					aria-invalid={errorMessage ? true : undefined}
					aria-describedby={errorMessage ? "admin-login-error" : undefined}
					className={adminInputClass}
				/>
				{errorMessage ? (
					<p id="admin-login-error" role="alert" className={adminErrorClass}>
						{errorMessage}
					</p>
				) : null}
			</div>

			{isCoolingDown ? (
				<p role="status" className="text-sm text-cream-muted">
					{secondsLeft === null
						? "Please wait before trying again."
						: `Please wait ${secondsLeft} seconds before trying again.`}
				</p>
			) : null}

			<SubmitButton
				label="Log in"
				pendingLabel="Checking..."
				disabled={isCoolingDown}
			/>
		</form>
	);
}
