import { NextResponse } from "next/server";
import { type ApiData } from "@vercel/flags";

export async function GET() {
  const apiData = {
    definitions: {
      showBuyNowButton: {
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
