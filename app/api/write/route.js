import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { name, attend, num } = await req.json();
    
    if (!name || attend === undefined || num === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "rsvp.list");

    const data = [name, attend, num].join("|") + "\n"; 

    fs.appendFileSync(filePath, data, "utf8");

    return NextResponse.json({ message: "Data saved successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to write file", error: error.message },
      { status: 500 }
    );
  }
}