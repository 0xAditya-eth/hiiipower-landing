import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getMongoDb } from "@/lib/mongodb";
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

type WaitlistEntry = {
  name: string;
  email: string;
  createdAt: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

type WaitlistFile = {
  entries: WaitlistEntry[];
};

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

let indexCreated = false;

function validateUtmParam(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 50) return undefined;
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return undefined;
  return trimmed;
}

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

    const utm_source = validateUtmParam(body.utm_source);
    const utm_medium = validateUtmParam(body.utm_medium);
    const utm_campaign = validateUtmParam(body.utm_campaign);

    const mongoUri = process.env.MONGODB_URI || "";
    const mongoDbName = process.env.MONGODB_DB || undefined;
    if (mongoUri) {
      try {
        const db = await getMongoDb(mongoUri, mongoDbName);
        const collection = db.collection<WaitlistEntry>("waitlist");
        
        if (!indexCreated) {
          await collection.createIndex({ email: 1 }, { unique: true });
          await collection.createIndex({ createdAt: 1 });
          indexCreated = true;
        }

        const createdAt = new Date().toISOString();
        const doc: WaitlistEntry = {
          name,
          email,
          createdAt,
        };

        if (utm_source) doc.utm_source = utm_source;
        if (utm_medium) doc.utm_medium = utm_medium;
        if (utm_campaign) doc.utm_campaign = utm_campaign;

        await collection.updateOne(
          { email },
          { $setOnInsert: doc },
          { upsert: true }
        );
        return NextResponse.json({ ok: true });
      } catch (err: unknown) {
        console.error("MongoDB error:", err);
        const mongoErr = err as { code?: number };
        if (mongoErr?.code === 11000) {
          return NextResponse.json({ ok: true });
        }
        if (mongoUri) {
          return NextResponse.json(
            { error: "Database temporarily unavailable" },
            { status: 503 }
          );
        }
      }
    }

    try {
      await ensureDataFile();
    } catch (fileErr) {
      console.error("File system error (read-only?):", fileErr);
      return NextResponse.json(
        { error: "Storage unavailable" },
        { status: 503 }
      );
    }

    const raw = await fs.readFile(DATA_FILE, "utf8");
    const json: WaitlistFile = raw ? (JSON.parse(raw) as WaitlistFile) : { entries: [] };

    const exists = json.entries.some(
      (e) => typeof e?.email === "string" && e.email.toLowerCase() === email
    );
    if (!exists) {
      const entry: WaitlistEntry = {
        name,
        email,
        createdAt: new Date().toISOString(),
      };

      if (utm_source) entry.utm_source = utm_source;
      if (utm_medium) entry.utm_medium = utm_medium;
      if (utm_campaign) entry.utm_campaign = utm_campaign;

      json.entries.push(entry);
      await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
