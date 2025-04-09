import { NextResponse } from "next/server";
import fs from "fs/promises"; // 비동기 fs 모듈
import path from "path";
import { google } from "googleapis";

export async function POST(req) {
  try {
    const { name, attend, num } = await req.json();

    if (!name || attend === undefined || num === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const base64 = process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;
    if (!base64) throw new Error("Service account not found in env");

    const jsonString = Buffer.from(base64, "base64").toString("utf-8");
    const credentials = JSON.parse(jsonString);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = "1V6sdH9aefM0NHaKtPlwg5cCTaKWXx5VZ-YTwT7i4Pcc";
    const range = "list!A:C";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS", 
      requestBody: {
        values: [[name, attend, num]],
      },
    });

    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Google Sheets Error:", error);
    return NextResponse.json(
      { message: "Failed to write to spreadsheet", error: error.message },
      { status: 500 }
    );
  }
}
