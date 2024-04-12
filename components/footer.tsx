import { Package2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-2">
        <Package2Icon className="h-6 w-6" />
        <span className="">Acme Store</span>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="https://www.vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </Link>
      </nav>
    </footer>
  );
}
