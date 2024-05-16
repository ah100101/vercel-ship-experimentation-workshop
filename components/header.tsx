import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Package2Icon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import VercelShipLogo from "@/public/vercel-ship-logo.svg";

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
        <Button asChild className="pl-1">
          <Link
            target="_blank"
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fah100101%2Fvercel-ship-experimentation-workshop&env=OPTIMIZELY_API_KEY,OPTIMIZELY_SDK_KEY,OPTIMIZELY_PROJECT_ID,FLAGS_SECRET&project-name=vercel-ship-experimentation-workshop&repository-name=vercel-ship-experimentation-workshop"
            className="flex flex-row justify-center items-center"
          >
            <Image
              className="h-8 w-8"
              width={32}
              height={32}
              src="/logo.svg"
              alt="Deploy with Vercel"
            />
            Deploy
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link
            target="_blank"
            className="space-x-2"
            href="https://github.com/ah100101/vercel-ship-experimentation-workshop"
          >
            <GitHubLogoIcon className="h-5 w-5" />
            <span className="hidden sm:block">GitHub</span>
          </Link>
        </Button>
        <Link target="_blank" href="https://vercel.com/ship">
          <Image
            className="h-7 w-fit rounded-md"
            src={VercelShipLogo}
            alt="Vercel Ship Logo"
          />
        </Link>
      </nav>
    </header>
  );
}
