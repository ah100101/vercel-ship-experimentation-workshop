/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Tvqbl2oDV7M
 */
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { showPromoBannerFlag } from "@/lib/middleware-flags";
import Link from "next/link";
import Image from "next/image";

export default async function Home({ params }: { params: { code: string } }) {
  const showPromoBanner = await showPromoBannerFlag(params.code);

  return (
    <main className="min-h-screen max-w-5xl py-6 mx-auto">
      <div className="flex flex-col">
        {showPromoBanner && (
          <section className="flex w-full py-4 bg-amber-300 justify-center rounded-lg mx-4 md:mx-6 font-bold">
            Acme Sale Week is here! Get 20% off all products.
          </section>
        )}
        <section className="flex w-full py-4 md:py-8 lg:py-12 justify-center">
          <ProductHero product={products[0]} />
        </section>
        <section className="flex flex-col w-full justify-center py-12 space-y-4 md:py-24 lg:py-32 px-4 md:px-6">
          <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
            Popular Products
          </h2>
          <div className="container grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard product={products[1]} />
            <ProductCard product={products[2]} />
            <ProductCard product={products[3]} />
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductHero({
  product,
}: {
  product: {
    slug: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    summary: string;
  };
}) {
  const { imageSrc, imageAlt, title, summary, slug } = product;
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
        <Image
          alt={imageAlt}
          className="object-cover rounded-lg bg-slate-300"
          height="500"
          width="500"
          src={imageSrc}
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {summary}
          </p>
          <Link
            prefetch={true}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            href={`/product/${slug}`}
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
