import mysql from 'npm:mysql2@^3.6.5/promise'
import { load } from 'https://deno.land/std@0.210.0/dotenv/mod.ts';

const dotenv = await load();

export function connect() {
    const env = (token: string) => dotenv[`MYSQL_${token}`]

    return mysql.createPool({
        host: env('HOST'),
        port: 3306,
        user: env('USER'),
        password: env('PASSWORD'),
        database: env('DATABASE')
    })
}