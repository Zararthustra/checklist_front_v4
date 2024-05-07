// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `checklist_${name}`);

export const categories = createTable(
  "category",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    color: varchar("color", { length: 50 }).notNull(),
    textColor: varchar("textColor", { length: 50 }).notNull(),
    isHidden: boolean("isHidden").default(false).notNull(),
    isRecurrent: boolean("isRecurrent").default(false).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  // (example) => ({
  //   nameIndex: index("name_idx").on(example.name),
  // }),
);

export const tasks = createTable(
  "task",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    isDisabled: boolean("isDisabled").default(false).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    categoryId: integer("categoryId")
      .references(() => categories.id, {
        onDelete: "cascade",
      })
      .notNull(),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  // (example) => ({
  //   nameIndex: index("name_idx").on(example.name),
  // }),
);
