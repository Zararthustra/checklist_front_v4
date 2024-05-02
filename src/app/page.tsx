import { SignedIn, SignedOut } from "@clerk/nextjs";
import Images from "./_components/Images";

// export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Checklist</h1>
      <SignedOut>Se connecter pour voir les images</SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
