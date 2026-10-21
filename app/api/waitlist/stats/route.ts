import { NextResponse } from "next/server";
import { getMongoDb } from "@/lib/mongodb";
import { timingSafeEqual } from "crypto";
export const runtime = "nodejs";

type WaitlistEntry = {
  name: string;
  email: string;
  createdAt: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function validateDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

export async function GET(request: Request) {
  const token = process.env.WAITLIST_STATS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const authHeader = request.headers.get("authorization");
  const providedToken = authHeader?.replace(/^Bearer\s+/i, "");
  
  if (!providedToken || providedToken.length !== token.length) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tokenBuf = Buffer.from(token, "utf8");
    const providedBuf = Buffer.from(providedToken, "utf8");
    if (!timingSafeEqual(tokenBuf, providedBuf)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  if (from && !validateDate(from)) {
    return NextResponse.json({ error: "Invalid from date" }, { status: 400 });
  }
  if (to && !validateDate(to)) {
    return NextResponse.json({ error: "Invalid to date" }, { status: 400 });
  }

  const mongoUri = process.env.MONGODB_URI || "";
  const mongoDbName = process.env.MONGODB_DB || undefined;

  if (!mongoUri) {
    return NextResponse.json(
      { error: "Stats only available with MongoDB" },
      { status: 503 }
    );
  }

  try {
    const db = await getMongoDb(mongoUri, mongoDbName);
    const collection = db.collection<WaitlistEntry>("waitlist");

    const dateFilter: { $gte?: string; $lte?: string } = {};
    if (from) dateFilter.$gte = new Date(from).toISOString();
    if (to) dateFilter.$lte = new Date(to).toISOString();
    const matchStage = Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};

    const dailyMatchStage = from || to ? matchStage : {
      createdAt: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };

    const [
      totalResult,
      sourceResults,
      mediumResults,
      campaignResults,
      dailyResults,
    ] = await Promise.all([
      collection.countDocuments(matchStage),
      collection
        .aggregate([
          ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
          { $group: { _id: "$utm_source", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .toArray(),
      collection
        .aggregate([
          ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
          { $group: { _id: "$utm_medium", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .toArray(),
      collection
        .aggregate([
          ...(Object.keys(matchStage).length > 0 ? [{ $match: matchStage }] : []),
          { $group: { _id: "$utm_campaign", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .toArray(),
      collection
        .aggregate([
          { $match: dailyMatchStage },
          {
            $addFields: {
              date: { $substr: ["$createdAt", 0, 10] },
            },
          },
          {
            $group: {
              _id: { date: "$date", source: "$utm_source" },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.date": 1 } },
        ])
        .toArray(),
    ]);

    type AggResult = { _id: string | null; count: number };
    type DailyAggResult = { _id: { date: string; source: string | null }; count: number };

    const bySource = Object.fromEntries(
      (sourceResults as AggResult[]).map((r) => [r._id || "unknown", r.count])
    );
    const byMedium = Object.fromEntries(
      (mediumResults as AggResult[]).map((r) => [r._id || "unknown", r.count])
    );
    const byCampaign = Object.fromEntries(
      (campaignResults as AggResult[]).map((r) => [r._id || "unknown", r.count])
    );

    const dailySeries: Record<string, Record<string, number>> = {};
    for (const row of dailyResults as DailyAggResult[]) {
      const date = row._id.date;
      const source = row._id.source || "unknown";
      if (!dailySeries[date]) dailySeries[date] = {};
      dailySeries[date][source] = row.count;
    }

    const dailyLabel = from || to ? "daily_by_source" : "daily_by_source_last_30d";

    return NextResponse.json({
      total: totalResult,
      by_utm_source: bySource,
      by_utm_medium: byMedium,
      by_utm_campaign: byCampaign,
      [dailyLabel]: dailySeries,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
