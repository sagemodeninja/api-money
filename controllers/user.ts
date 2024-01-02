import { Hono, Context, HTTPException } from 'https://deno.land/x/hono@v3.11.12/mod.ts'
import mysql from 'npm:mysql2@^3.6.5/promise'
import { GenericEntityStatus } from '@/enums/index.ts'

export function routeUser(pool: mysql.Pool): Hono {
    const user = new Hono()

    user.get('/', async (c: Context) => {
        try {
            const [users] = await pool.execute(
                'SELECT * FROM `user` WHERE `Status` = ?',
                [GenericEntityStatus.Active]
            )

            return c.json(users)
        } catch (e) {
            throw new HTTPException(400, { message: e.toString() })
        }
    })

    user.get('/:key', (c: Context) => c.text('Get Specific User!'))

    user.post('/', (c: Context) => c.text('Create User!'))

    user.patch('/:key', (c: Context) => c.text('Update User!'))

    user.delete('/:key', (c: Context) => c.text('Delete User!'))

    return user;
}