import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex w-full justify-between p-5 text-xl font-bold">
      <div>Home</div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </nav>
  );
}
