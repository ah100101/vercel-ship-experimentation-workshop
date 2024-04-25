import { NextRequest, NextResponse } from "next/server";
import { verifyAccess, type ApiData } from "@vercel/flags";

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  if (!process.env.OPTIMIZELY_PROJECT_ID || !process.env.OPTIMIZELY_API_KEY) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  const apiData = {
    definitions: {
      buynow: {
        description: "Controls the visibility of the Buy Now button",
        options: [
          { value: "off", label: "Off" },
          { value: "on", label: "On" },
        ],
      },
    },
    overrideEncryptionMode: "encrypted" as const,
  };
  return NextResponse.json<ApiData>(apiData);
}
