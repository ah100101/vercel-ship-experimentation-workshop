import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { products } from "@/lib/products";
import { decrypt, FlagOverridesType } from "@vercel/flags";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import optimizely from "@optimizely/optimizely-sdk";
import RelatedProducts from "@/components/related-products";
import ConfidentialFlagValues from "@/components/confidential-flag-values";
import AddToCartButton from "@/components/add-to-cart";
import BuyNowButton from "@/components/buy-now";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.filter((p) => p.slug === params.slug)[0];
  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto py-6 px-4 md:px-6">
      <section className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start py-4 md:py-8 lg:py-12">
        <div className="grid md:grid-cols-5 gap-3">
          <div className="md:col-span-4">
            <Image
              alt={product.imageAlt}
              className="object-contain w-full rounded-lg overflow-hidden bg-slate-300"
              height="500"
              width="500"
              src={product.imageSrc}
            />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10">
          <div className="md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-3xl lg:text-4xl">
                {product.title}
              </h1>
              <div>
                <p>{product.details}</p>
              </div>
              <div className="text-4xl font-bold ml-auto">{product.price}</div>
            </div>
          </div>
          <form className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="color">
                Color
              </Label>
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="black"
                id="color"
              >
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                  htmlFor="color-black"
                >
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="size">
                Size
              </Label>
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="m"
                id="size"
              >
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                  htmlFor="size-xs"
                >
                  <RadioGroupItem id="size-xs" value="xs" />
                  XS
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                  htmlFor="size-s"
                >
                  <RadioGroupItem id="size-s" value="s" />S
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                  htmlFor="size-m"
                >
                  <RadioGroupItem id="size-m" value="m" />M
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                  htmlFor="size-l"
                >
                  <RadioGroupItem id="size-l" value="l" />L
                </Label>
                <Label
                  className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100"
                  htmlFor="size-xl"
                >
                  <RadioGroupItem id="size-xl" value="xl" />
                  XL
                </Label>
              </RadioGroup>
            </div>
            <div className="min-h-10">
              <Suspense fallback={null}>
                <Purchase />
              </Suspense>
            </div>
          </form>
        </div>
      </section>
      <RelatedProducts slug={product.slug} />
    </main>
  );
}

async function Purchase() {
  const flags = await getFlags();
  return (
    <div className="flex flex-row w-full space-x-2 -mx-2">
      <ConfidentialFlagValues values={flags} />
      <AddToCartButton />
      {flags.buynow === "on" && <BuyNowButton />}
    </div>
  );
}

async function getFlags() {
  const overrideCookieValue = cookies().get("vercel-flag-overrides")?.value;
  const overrides = overrideCookieValue
    ? await decrypt<FlagOverridesType>(overrideCookieValue)
    : null;

  const client = optimizely.createInstance({
    sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
  });

  await client!.onReady();
  const context = client?.createUserContext("demo-user-12345")!;

  const flags = {
    buynow: overrides?.buynow ?? context.decide("buynow").variationKey,
  };

  return flags;
}
