import { getDashboardData } from "@/lib/dashboard-data";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity | Auditspro",
  description: "View recent system activity and events.",
};

export default async function ActivityPage() {
  const { recentActivity } = await getDashboardData();

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Activity Log</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Real-time events from your application.
        </p>
      </div>
      <ActivityTable rows={recentActivity} />
    </div>
  );
}
