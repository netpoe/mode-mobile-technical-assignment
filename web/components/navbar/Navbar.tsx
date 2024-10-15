"use client";

import clsx from "clsx";
import { NavbarProps } from "./Navbar.types";

import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import { WalletSelector } from "../wallet-selector/WalletSelector";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const routes = useRoutes();

  return (
    <header className={clsx(className, "fixed top-0 z-30 w-screen border-b bg-background")}>
      <section className="flex items-center justify-between px-4 py-3 sm:h-auto sm:border-0 sm:px-6">
        <div>
          <Link href={routes.home()} className="no-underline">
            <h3 className="mb-0">Mode Mobile</h3>
          </Link>
        </div>

        <div className="flex [&>div]:ml-2">
          <WalletSelector />
        </div>
      </section>
    </header>
  );
};
