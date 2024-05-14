import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Package2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <Link
        className="flex items-center gap-2 font-semibold"
        prefetch={true}
        href="/"
      >
        <Package2Icon className="h-6 w-6" />
        <span className="">Acme Store</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Button variant="secondary" asChild>
          <Link
            target="_blank"
            className="space-x-2"
            href="https://github.com/vercel"
          >
            <GitHubLogoIcon className="h-5 w-5" />
            <span>GitHub</span>
          </Link>
        </Button>
        <Button asChild className="pl-1">
          <Link
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world"
            className="flex flex-row justify-center items-center"
          >
            <Image
              className="h-8 w-8"
              width={32}
              height={32}
              src="/logo.svg"
              alt="Deploy with Vercel"
            />
            <span>Deploy</span>
          </Link>
        </Button>
      </nav>
    </header>
  );
}
