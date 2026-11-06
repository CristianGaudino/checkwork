import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

/** The D1 binding only exists per request on Workers (and under `next dev` via initOpenNextCloudflareForDev), so this is a function, not a constant. */
export const getDb = () => drizzle(getCloudflareContext().env.DB, { schema });
