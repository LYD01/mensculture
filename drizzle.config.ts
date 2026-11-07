import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
	dialect: "postgresql",
	schema: "./db/schema.ts",
	casing: "snake_case",
	dbCredentials: {
		// Direct (unpooled) connection: drizzle-kit needs it for schema changes.
		url: process.env.DATABASE_URL_UNPOOLED ?? "",
	},
});
