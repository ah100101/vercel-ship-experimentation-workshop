"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

export default function BuyNowButton() {
  return (
    <Button
      className="w-full"
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        toast.success("Product purchased!");
      }}
    >
      Buy Now
    </Button>
  );
}
