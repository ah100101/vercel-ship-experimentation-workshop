"use server";

import optimizely from "@optimizely/optimizely-sdk";
import { cookies } from "next/headers";

export async function trackAddToCart() {
  const client = optimizely.createInstance({
    sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
  });

  if (!client) {
    throw new Error("Failed to create client");
  }

  await client.onReady();

  const cookieStore = cookies();
  const shopperId = cookieStore.get("shopper")?.value;
  const context = client?.createUserContext(shopperId);

  if (!context) {
    throw new Error("Failed to create user context");
  }

  context.trackEvent("add_to_cart");
}

export async function trackProductPurchase() {
  const client = optimizely.createInstance({
    sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
  });

  if (!client) {
    throw new Error("Failed to create client");
  }

  await client.onReady();

  const cookieStore = cookies();
  const shopperId = cookieStore.get("shopper")?.value;
  const context = client?.createUserContext(shopperId);

  if (!context) {
    throw new Error("Failed to create user context");
  }

  context.trackEvent("product_purchase");
}
