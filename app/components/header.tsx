import Routes from "@/routes";
import ThemeSelector from "@/theme/theme-selector";
import { currentUser } from "@clerk/nextjs/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Auth from "./auth";
import Logo from "./logo";
import NavLink from "./navlink";

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="drawer fixed top-0 left-0 w-full bg-base-100 bg-opacity-70 backdrop-blur-lg z-10">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar px-4 md:px-32 py-3">
          <div className="flex-1 px-2 gap-16">
            <Link href={Routes.hub} className="flex items-center gap-1">
              <Logo />
              <p className="text-lg font-bold select-none">pyngme</p>
            </Link>
            <div className="flex-none hidden lg:block">
              <ul className="flex gap-4">
                <li>
                  <NavLink href={Routes.hub}>Hub</NavLink>
                </li>
                <li>
                  <NavLink href={Routes.pyngs}>Pyngs</NavLink>
                </li>
                <li>
                  <NavLink href={Routes.pricing}>Pricing</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="hidden lg:block">
              <ThemeSelector />
            </div>
            <Auth isSignedIn={!!user} />
          </div>
          <div className="flex-none ml-2 lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <MenuIcon className="w-6 h-6" />
            </label>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="p-4 w-48 min-h-full bg-base-200 space-y-2">
          <li>
            <NavLink href={Routes.hub}>Hub</NavLink>
          </li>
          <li>
            <NavLink href={Routes.pyngs}>Pyngs</NavLink>
          </li>
          <li>
            <NavLink href={Routes.pricing}>Pricing</NavLink>
          </li>
          <li className="lg:hidden mt-4">
            <ThemeSelector />
          </li>
        </ul>
      </div>
    </header>
  );
}
