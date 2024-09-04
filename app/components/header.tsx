import Routes from "@/routes";
import ThemeSelector from "@/theme/theme-selector";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Auth from "./auth";
import Logo from "./logo";
import NavLink from "./navlink";

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-base-100 bg-opacity-70 backdrop-blur-lg z-10">
      <div className="px-4 md:px-32 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-16">
          <Link href={Routes.hub} className="flex items-center gap-1">
            <Logo />
            <p className="text-lg font-bold select-none">pyngme</p>
          </Link>
          <div className="flex gap-1 md:gap-8">
            <NavLink href={Routes.hub}>Hub</NavLink>
            <NavLink href={Routes.pyngs}>Pyngs</NavLink>
            <NavLink href={Routes.pricing}>Pricing</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-4">
          <ThemeSelector />
          <Auth isSignedIn={!!user} />
        </div>
      </div>
    </header>
  );
}
