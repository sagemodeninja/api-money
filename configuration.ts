import { load } from 'https://deno.land/std@0.210.0/dotenv/mod.ts';

const dotenv = await load();

export function configuration(token: string): string {
    return Deno.env.get(token) ?? dotenv[token];
}