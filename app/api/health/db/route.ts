import { NextResponse } from "next/server";

import { pool } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await pool.query("select 1 as ok");
    return NextResponse.json({ ok: true, result: result.rows[0] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
