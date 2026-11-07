import "server-only";

import { z } from "zod";

const databaseEnvSchema = z.object({
	DATABASE_URL: z.string().min(1),
});

const authEnvSchema = z.object({
	ADMIN_PASSWORD: z.string().min(16),
	SESSION_SECRET: z.string().min(32),
});

export type DatabaseEnv = z.infer<typeof databaseEnvSchema>;
export type AuthEnv = z.infer<typeof authEnvSchema>;

let databaseEnv: DatabaseEnv | undefined;
let authEnv: AuthEnv | undefined;

/**
 * Parsed once on first use. Database and auth variables are validated
 * separately so a missing admin secret never breaks the public site's data layer.
 */
export function getDatabaseEnv(): DatabaseEnv {
	databaseEnv ??= parseEnv(databaseEnvSchema, "database");
	return databaseEnv;
}

export function getAuthEnv(): AuthEnv {
	authEnv ??= parseEnv(authEnvSchema, "auth");
	return authEnv;
}

function parseEnv<T extends z.ZodType>(schema: T, label: string): z.infer<T> {
	const result = schema.safeParse(process.env);
	if (!result.success) {
		// Names only: never echo values.
		const names = result.error.issues.map((issue) => issue.path.join("."));
		throw new Error(
			`Invalid ${label} environment variables: ${names.join(", ")}`,
		);
	}
	return result.data;
}
