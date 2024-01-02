import { Context, Hono } from 'https://deno.land/x/hono@v3.11.12/mod.ts'
import { connect } from '@/mysql.ts';
import { routeUser } from '@/controllers/index.ts';
import { configuration } from '@/configuration.ts';

const app = new Hono()
const pool = connect();

app.route('/user', routeUser(pool))

app.get('/test', (c: Context) => c.text(configuration('ENV_TEST')))

Deno.serve(app.fetch)
