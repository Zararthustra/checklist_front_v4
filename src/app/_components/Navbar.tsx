"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import CategoryForm from "./forms/categoryForm";
import Darkmode from "./buttons/darkmode";
import Settings from "./dialogs/settings";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className="flex w-full justify-between px-[17px] py-5 text-xl font-bold">
      <div>Checklist</div>
      <SignedIn>
        <CategoryForm />
      </SignedIn>
      <Settings title="Paramètres">
        <div className="flex items-center justify-between">
          Mode {theme === "light" ? "clair" : "sombre"}
          <Darkmode />
        </div>
        <div className="flex items-center justify-between">
          <div />
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
      </Settings>
    </nav>
  );
}
