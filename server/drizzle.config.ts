// drizzle.config.ts
import 'dotenv/config'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: './database/drizzle',
    schema: ['./database/schema/schema.ts'],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    }
});