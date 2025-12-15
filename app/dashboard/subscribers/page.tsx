import { getDashboardData } from "@/lib/dashboard-data";
import { SubscriptionTable } from "@/components/dashboard/SubscriptionTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribers | Auditspro",
  description: "Manage your subscriber list and status.",
};

export default async function SubscribersPage() {
  const { latestSubscriptions } = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Subscribers</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          View and manage key contacts.
        </p>
      </div>
      <SubscriptionTable rows={latestSubscriptions} />
    </div>
  );
}
