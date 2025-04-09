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

    // 서비스 계정 키 로딩
    const credentialsPath = path.join(process.cwd(), "google-service-account.json");
    const credentials = JSON.parse(await fs.readFile(credentialsPath, "utf8"));

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
      insertDataOption: "INSERT_ROWS", // ✅ 행을 아래로 추가
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
