import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/products";
import {
  decrypt,
  encrypt,
  FlagOverridesType,
  FlagValuesType,
} from "@vercel/flags";
import { FlagValues } from "@vercel/flags/react";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import optimizely from "@optimizely/optimizely-sdk";

async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encrypt(values);
  return <FlagValues values={encryptedFlagValues} />;
}

async function getFlags() {
  const overrideCookie = cookies().get("vercel-flag-overrides")?.value;
  const overrides = overrideCookie
    ? await decrypt<FlagOverridesType>(overrideCookie)
    : {};

  const client = optimizely.createInstance({
    sdkKey: process.env.OPTIMIZELY_SDK_KEY!,
  });

  await client!.onReady();
  const context = client?.createUserContext("demo-user-123")!;

  const flags = {
    showBuyNowButton:
      overrides?.showBuyNowButton ??
      context.decide("showBuyNowButton").variationKey,
  };

  return flags;
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.filter((p) => p.slug === params.slug)[0];
  if (!product) {
    notFound();
  }
  const flags = await getFlags();
  return (
    <main className="max-w-5xl mx-auto py-6">
      <Suspense fallback={null}>
        <ConfidentialFlagValues values={flags} />
      </Suspense>
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
          <div className="hidden md:flex items-start">
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
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row w-full space-x-2">
              <Button className="w-full">Add to Cart</Button>
              {flags.showBuyNowButton === "on" && (
                <Button className="w-full" variant="outline">
                  Buy Now
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
      <RelatedProducts slug={product.slug} />
    </main>
  );
}

function RelatedProducts({ slug }: { slug: string }) {
  const relatedProducts = products.filter((p) => p.slug !== slug).slice(0, 3);
  if (!relatedProducts.length) {
    return null;
  }
  return (
    <section className="flex flex-col w-full justify-center py-6 space-y-4 md:py-8 lg:py-12 px-4 md:px-6">
      <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
        Related Products
      </h2>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>
    </section>
  );
}
