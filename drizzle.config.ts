import { defineConfig } from 'drizzle-kit';

// Generates SQL only. wrangler applies it: `npm run db:migrate:local`, and `npm run db:migrate:remote` against the real database.
export default defineConfig({ dialect: 'sqlite', out: './drizzle', schema: './src/lib/db/schema.ts' });
