import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Payload = {
  name?: string;
  email?: string;
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

    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const json = raw ? JSON.parse(raw) : { entries: [] as any[] };

    const exists = (json.entries as any[]).some(
      (e) => typeof e?.email === "string" && e.email.toLowerCase() === email
    );
    if (!exists) {
      json.entries.push({ name, email, createdAt: new Date().toISOString() });
      await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


