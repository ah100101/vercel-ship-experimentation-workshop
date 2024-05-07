"use server";

import optimizely from "@optimizely/optimizely-sdk";

export async function trackAddToCart() {
  const client = optimizely.createInstance({
    sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
  });

  await client!.onReady();

  const context = client?.createUserContext("demo-user-1")!;
  context.trackEvent("add_to_cart");
}

export async function trackProductPurchase() {
  const client = optimizely.createInstance({
    sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
  });

  await client!.onReady();

  const context = client?.createUserContext("demo-user-1")!;
  context.trackEvent("product_purchase");
}
