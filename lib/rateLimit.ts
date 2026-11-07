import "server-only";

/**
 * Best-effort in-memory limiter. Each server instance keeps its own counts,
 * so this is a speed bump rather than a hard guarantee.
 */
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_TRACKED_KEYS = 1000;

type Entry = { failures: number; resetAt: number };

const entries = new Map<string, Entry>();

function pruneExpired(now: number): void {
	for (const [key, entry] of entries) {
		if (entry.resetAt <= now) entries.delete(key);
	}
}

export type RateLimitResult =
	| { limited: false }
	| { limited: true; retryAfterSeconds: number };

export function checkRateLimit(key: string): RateLimitResult {
	const now = Date.now();
	const entry = entries.get(key);
	if (!entry || entry.resetAt <= now || entry.failures < MAX_FAILURES) {
		return { limited: false };
	}
	return {
		limited: true,
		retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
	};
}

export function recordFailure(key: string): void {
	const now = Date.now();
	if (entries.size >= MAX_TRACKED_KEYS) pruneExpired(now);

	const entry = entries.get(key);
	if (!entry || entry.resetAt <= now) {
		entries.set(key, { failures: 1, resetAt: now + WINDOW_MS });
		return;
	}
	entry.failures += 1;
}

export function clearFailures(key: string): void {
	entries.delete(key);
}
