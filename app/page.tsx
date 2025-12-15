import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-purple-100/40 to-pink-100/20 pointer-events-none mix-blend-multiply dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/20 dark:mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Auditspromails
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Simple dashboard to view your subscription list.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-slate-800 hover:shadow-indigo-500/40 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full border border-slate-200 bg-white/50 px-8 py-3 text-sm font-medium text-slate-700 backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              Sign up
            </Link>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col items-center gap-4">
              <UserButton />
              <Link
                href="/dashboard"
                className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40"
              >
                Go to dashboard
              </Link>
            </div>
          </SignedIn>
        </div>
      </div>
    </main>
  );
}
