import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv'
dotenv.config()

export const sql = neon(process.env.POSTGRE_URL ?? '');
export const db = drizzle(sql);