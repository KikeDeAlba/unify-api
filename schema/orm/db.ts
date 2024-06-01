import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as dotenv from 'dotenv'
dotenv.config()

export const sql = postgres(process.env.POSTGRE_URL ?? '');
export const db = drizzle(sql);