import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const message = sqliteTable("message", {
	id: text("id").primaryKey(),
	chatId: text("chat_id").notNull(),
	role: text("role").notNull(),
	content: text("content").notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const CreateMessageSchema = createInsertSchema(message, {
	role: z.enum(["user", "assistant"]),
	content: z.string().min(1).max(10_000),
}).omit({
	id: true,
	createdAt: true,
});
