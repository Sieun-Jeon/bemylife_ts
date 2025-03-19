import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function parseLine(randomLine) {
  const speakerMap = { b: 'bride', g: 'groom', c: 'common' };

  if (randomLine.includes('`')) {
    const parts = randomLine.split('`');

    return parts.map(item => {
      const [speaker, message, effect = ""] = item.split("|");
      return { speaker: speakerMap[speaker] || speaker, message, effect };
    });
  } else {
    const [speaker, message, effect = ""] = randomLine.split("|");
    return { speaker: speakerMap[speaker] || speaker, message, effect };
  }
}

export async function POST(req) {
  try {
    const { type } = await req.json();
    if (!type) {
      return NextResponse.json(
        { message: "Missing 'type' in request body" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "story", `${type}.line`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { message: `File ${type}.line not found` },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n").filter(line => line.trim() !== "");

    if (lines.length === 0) {
      return NextResponse.json(
        { message: "No valid entries in file" },
        { status: 500 }
      );
    }

     const randomLine = lines[Math.floor(Math.random() * lines.length)];
	  const rslt=parseLine(randomLine);
	  
    return NextResponse.json({ result: rslt });
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
