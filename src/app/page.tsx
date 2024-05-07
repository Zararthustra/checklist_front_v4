import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Categories from "./_components/categories";
import { Suspense } from "react";
import CategorySkeleton from "./_components/categorySkeleton";
import { IconLogo } from "./_assets/icons/iconLogo";
import { IconLogin } from "./_assets/icons";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5">
      <SignedOut>
        <IconLogo width={200} height={200} className="mt-[150px]" />
        <SignInButton>
          <button className="flex items-center justify-evenly gap-2 rounded bg-green-600 px-5 py-2 text-white transition-colors hover:bg-green-500">
            <IconLogin width={25} height={25} />
            <p className="text-xl font-bold">Se connecter</p>
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Suspense fallback={<CategorySkeleton />}>
          <Categories />
        </Suspense>
      </SignedIn>
    </main>
  );
}
