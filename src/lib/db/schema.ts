import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** Contact form submissions. Read them in the Cloudflare dashboard (D1) until the admin dashboard exists. */
export const enquiries = sqliteTable('enquiries', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull(),
    business: text('business'),
    phone: text('phone'),
    need: text('need').notNull(),
    message: text('message').notNull(),
    createdAt: text('created_at').notNull(),
});
