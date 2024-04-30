"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

export default function AddToCartButton() {
  return (
    <Button
      className="w-full"
      onClick={(e) => {
        e.preventDefault();
        toast.info("Product added to cart!");
      }}
    >
      Add to Cart
    </Button>
  );
}
