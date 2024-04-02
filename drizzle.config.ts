import { defineConfig } from 'drizzle-kit';

require('dotenv').config({ path: ['.env.local', '.env'] });
// console.log(process.env);

export default defineConfig({
    schema: "./db/schema.ts",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DB_URL!,
    },
    verbose: true,
    strict: true,
});

