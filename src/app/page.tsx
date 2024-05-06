import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Categories from "./_components/categories";
import { Suspense } from "react";
import CategorySkeleton from "./_components/categorySkeleton";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5">
      <SignedOut>
        <p>Se connecter pour voir la checklist</p>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Suspense fallback={<CategorySkeleton />}>
          <Categories />
        </Suspense>
      </SignedIn>
    </main>
  );
}
