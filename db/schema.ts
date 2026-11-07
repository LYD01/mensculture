import { sql } from "drizzle-orm";
import {
	boolean,
	check,
	date,
	pgTable,
	smallint,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
};

/** Single-row table: the one promo banner shown under the site header. */
export const promotions = pgTable(
	"promotions",
	{
		id: smallint().primaryKey().default(1),
		message: text().notNull(),
		code: text(),
		isActive: boolean().default(false).notNull(),
		endsOn: date({ mode: "string" }),
		...timestamps,
	},
	(table) => [check("promotions_single_row", sql`${table.id} = 1`)],
);
