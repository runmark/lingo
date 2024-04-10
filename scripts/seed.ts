import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";


require('dotenv').config({ path: ['.env.local', '.env'] });

const sql = neon(process.env.DB_URL!);
// @ts-ignore
const db = drizzle(sql, schema);

const main = async () => {
    try {
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
        ]);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();