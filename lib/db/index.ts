import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleDB | null = null;

function getDB(): DrizzleDB {
  if (!_db) {
    _db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  }
  return _db;
}

// Proxy permite usar db.select() etc. sem chamar getDB() manualmente
// A conexão só é criada na primeira operação real (não no import)
export const db = new Proxy({} as DrizzleDB, {
  get(_, prop) {
    return Reflect.get(getDB(), prop as string);
  },
});
