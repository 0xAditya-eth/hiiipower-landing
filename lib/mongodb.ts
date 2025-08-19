import { MongoClient, Db } from "mongodb";

type Cached = {
  client: MongoClient | null;
  db: Db | null;
  uri: string | null;
  dbName: string | null;
};

const cached: Cached = {
  client: null,
  db: null,
  uri: null,
  dbName: null,
};

export async function getMongoDb(uri: string, dbName?: string): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  // Reuse cached connection if URI/DB match
  if (
    cached.client &&
    cached.db &&
    cached.uri === uri &&
    (cached.dbName === (dbName || null))
  ) {
    return cached.db;
  }

  const client = new MongoClient(uri, {
    // Use stable API options; defaults are fine for most cases
  });
  await client.connect();

  const database = client.db(dbName);

  cached.client = client;
  cached.db = database;
  cached.uri = uri;
  cached.dbName = dbName || null;

  return database;
}


