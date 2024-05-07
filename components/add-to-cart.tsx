"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { trackAddToCart } from "@/lib/actions";

export default function AddToCartButton() {
  return (
    <Button
      className="w-full"
      onClick={(e) => {
        trackAddToCart();
        toast.info("Product added to cart!");
      }}
    >
      Add to Cart
    </Button>
  );
}
