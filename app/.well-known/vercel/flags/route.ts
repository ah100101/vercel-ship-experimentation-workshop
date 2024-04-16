import { NextResponse } from "next/server";
import { type ApiData } from "@vercel/flags";

export async function GET() {
  const apiData = {
    definitions: {},
    overrideEncryptionMode: "encrypted" as const,
  };
  return NextResponse.json<ApiData>(apiData);
}
