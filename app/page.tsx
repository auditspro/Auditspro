import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 dark:bg-black">
      <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
        Auditspromails
      </h1>

      <p className="text-zinc-600 dark:text-zinc-400">
        Simple dashboard to view your subscription list.
      </p>

      <SignedOut>
        <div className="flex gap-4">
          <Link
            href="/sign-in"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            Sign up
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-4">
          <UserButton />
          <Link
            href="/dashboard"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Go to dashboard
          </Link>
        </div>
      </SignedIn>
    </main>
  );
}
