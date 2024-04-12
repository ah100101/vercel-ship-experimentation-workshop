import Image from "next/image";
import Link from "next/link";

export default function ProductHero(props: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}) {
  const { imageSrc, imageAlt, title, description } = props;
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
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {description}
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
