"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import CategoryForm from "./forms/categoryForm";
import Darkmode from "./buttons/darkmode";
import Settings from "./dialogs/settings";
import { useTheme } from "next-themes";
import { IconLogout } from "../_assets/icons";
import ImportChecklist from "./dialogs/importChecklist";
import { IconLogo } from "../_assets/icons/iconLogo";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className="flex w-full items-center justify-between px-[17px] py-5 text-xl font-bold">
      <IconLogo width={50} height={50} />

      <CategoryForm />

      <Settings title="Paramètres">
        <div className="my-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <p className="text-zinc-500 dark:text-zinc-400">
              Mode {theme === "light" ? "clair" : "sombre"}
            </p>
            <Darkmode />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-zinc-500 dark:text-zinc-400">
              Importer ma checklist
            </p>
            <ImportChecklist />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div />
          <SignOutButton>
            <button className="flex items-center justify-evenly gap-2 rounded bg-red-500 px-4 py-1 text-white transition-colors hover:bg-red-600">
              <IconLogout />
              <p className="text-sm">Se déconnecter</p>
            </button>
          </SignOutButton>
        </div>
      </Settings>
    </nav>
  );
}
