import Image from "next/image";
import { Button } from "./ui/button";

export default function ProductCard(props: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: string;
}) {
  const { imageSrc, imageAlt, title, price } = props;
  return (
    <div className="flex flex-col items-center gap-0 border border-gray-200 rounded-lg shadow-lg">
      <Image
        alt={imageAlt}
        className="object-cover rounded-t-lg bg-slate-300"
        height="300"
        width="300"
        src={imageSrc}
      />
      <div className="flex flex-col p-4 space-y-4 items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500">{price}</p>
        <Button>View Product</Button>
      </div>
    </div>
  );
}
