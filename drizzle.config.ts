import { defineConfig } from 'drizzle-kit';

require('dotenv').config({ path: ['.env.local', '.env'] });
// console.log(process.env);

export default defineConfig({
    schema: "./db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL!,
    },
    verbose: true,
    strict: true,
});

