import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Database } from 'https://deno.land/x/denodb/mod.ts';

import { User } from './Models/User';

const ENV = config();

export const db = new Database('mongo', {
    database: ENV.DB_DATABASE_NAME,
    host: ENV.DB_HOST,
    username: ENV.USER,
    password: ENV.PASSWORD,
    port: DB_PORT,
});

db.link([
    User,
]);

await db.sync();
