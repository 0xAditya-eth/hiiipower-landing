import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getMongoDb } from "@/lib/mongodb";
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
};

type WaitlistEntry = {
  name: string;
  email: string;
  createdAt: string;
};

type WaitlistFile = {
  entries: WaitlistEntry[];
};

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

async function ensureDataFile() {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ entries: [] }, null, 2));
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Prefer MongoDB if configured; gracefully fall back to file storage.
    const mongoUri = process.env.MONGODB_URI || "";
    const mongoDbName = process.env.MONGODB_DB || undefined;
    if (mongoUri) {
      try {
        const db = await getMongoDb(mongoUri, mongoDbName);
        const collection = db.collection<WaitlistEntry>("waitlist");
        // Ensure a unique index on email so we do not store duplicates
        await collection.createIndex({ email: 1 }, { unique: true });
        const createdAt = new Date().toISOString();
        await collection.updateOne(
          { email },
          { $setOnInsert: { name, email, createdAt } },
          { upsert: true }
        );
        return NextResponse.json({ ok: true, storage: "mongodb" });
      } catch (err) {
        // If MongoDB is misconfigured or temporarily unavailable, fall back to file storage.
        // Continue to file-based storage below.
      }
    }

    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const json: WaitlistFile = raw ? (JSON.parse(raw) as WaitlistFile) : { entries: [] };

    const exists = json.entries.some(
      (e) => typeof e?.email === "string" && e.email.toLowerCase() === email
    );
    if (!exists) {
      json.entries.push({ name, email, createdAt: new Date().toISOString() });
      await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));
    }

    return NextResponse.json({ ok: true, storage: "file" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


