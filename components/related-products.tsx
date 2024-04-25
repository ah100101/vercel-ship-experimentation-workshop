import { products } from "@/lib/products";
import ProductCard from "./product-card";

export default function RelatedProducts({ slug }: { slug: string }) {
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
