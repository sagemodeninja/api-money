import { Context, Hono } from 'https://deno.land/x/hono@v3.11.12/mod.ts'
import { connect } from '@/mysql.ts';
import { routeUser } from '@/controllers/index.ts';
import { load } from 'https://deno.land/std@0.210.0/dotenv/mod.ts';

const dotenv = await load();

const app = new Hono()
const pool = connect();

app.route('/user', routeUser(pool))

app.get('/test', (c: Context) => c.text(dotenv['ENV_TEST']))

Deno.serve(app.fetch)
