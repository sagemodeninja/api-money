import mysql from 'npm:mysql2@^3.6.5/promise'
import { configuration } from '@/configuration.ts'

export function connect() {
    const config = (token: string) => configuration(`MYSQL_${token}`)

    return mysql.createPool({
        host: config('HOST'),
        port: 3306,
        user: config('USER'),
        password: config('PASSWORD'),
        database: config('DATABASE')
    })
}