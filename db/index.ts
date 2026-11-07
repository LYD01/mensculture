import "server-only";

import { getDatabaseEnv } from "@/lib/env";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

export const db = drizzle({
	client: neon(getDatabaseEnv().DATABASE_URL),
	schema,
	casing: "snake_case",
});
