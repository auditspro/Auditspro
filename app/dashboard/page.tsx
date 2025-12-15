import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDashboardData } from "@/lib/dashboard-data";
import { StatsCards } from "@/components/dashboard/StatsCards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Auditspro",
  description: "Monitor your email performance, subscription status, and audit logs.",
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const {
    summary,
    bounced,
    queryHealth,
  } = await getDashboardData();

  const hasIssues = !queryHealth.auditLog || !queryHealth.subscribers || !queryHealth.emailStatus || !queryHealth.bounced;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Overview
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Welcome back, {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
      </div>

      {hasIssues && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200">
          <p className="font-medium">System Notice</p>
          <div className="ml-4 mt-2 list-disc pl-4 text-sm">
             Some data streams are currently offline. Please check database connectivity.
          </div>
        </div>
      )}

      {/* Stats Cards Section */}
      <section>
        <StatsCards summary={summary} bounced={bounced} />
      </section>

      {/* Quick Actions / Shortcuts (Placeholder for "Billion Dollar" feel) */}
      <div className="grid gap-6 md:grid-cols-2">
         <div className="rounded-2xl border border-slate-200 bg-white/50 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-colors shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
            <div className="mt-4 flex gap-3">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-colors">Export Report</button>
                 <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Refresh Data</button>
            </div>
         </div>
         <div className="rounded-2xl border border-slate-200 bg-white/50 p-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-colors shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white">System Status</h3>
             <div className="mt-4 flex items-center gap-2">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">All systems operational</span>
            </div>
         </div>
      </div>
    </div>
  );
}
