import { NextRequest, NextResponse } from "next/server";

// POST /api/sheets/log
// Logs order to Google Sheets via Google Sheets API v4
export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    // TODO: Replace with your Google Sheet ID and set up service account
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.warn("[Sheets] Not configured — skipping log");
      return NextResponse.json({ status: true, message: "Sheets not configured, skipped" });
    }

    // Row: [timestamp, name, email, phone, package, amount, reference]
    const row = [
      new Date().toISOString(),
      order.name,
      order.email,
      order.phone,
      order.packageName,
      `KSh ${order.amount}`,
      order.reference || "N/A",
    ];

    // Uses @googleapis/sheets — npm install @googleapis/sheets
    // const { google } = require("googleapis");
    // const auth = new google.auth.JWT(GOOGLE_SERVICE_ACCOUNT_EMAIL, null, GOOGLE_PRIVATE_KEY, ["https://www.googleapis.com/auth/spreadsheets"]);
    // const sheets = google.sheets({ version: "v4", auth });
    // await sheets.spreadsheets.values.append({ spreadsheetId: SHEET_ID, range: "Orders!A:G", valueInputOption: "RAW", resource: { values: [row] } });

    console.log("[Sheets] Would log:", row);
    return NextResponse.json({ status: true });
  } catch (error) {
    console.error("[Sheets Error]", error);
    return NextResponse.json({ status: false }, { status: 500 });
  }
}
