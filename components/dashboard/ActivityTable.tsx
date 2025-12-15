import { Activity } from "lucide-react";
import { formatDateTime } from "./utils";
import { StatusPill } from "./StatusPill";
import type { RecentEvent } from "@/lib/dashboard-data";

export function ActivityTable({ rows }: { rows: RecentEvent[] }) {
  return (
    <div className="group relative rounded-2xl border bg-white shadow-sm overflow-hidden transition-all hover:shadow-lg dark:bg-slate-950 dark:border-slate-800 dark:shadow-slate-900/50">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl transition-opacity group-hover:opacity-100 dark:bg-emerald-500/10" />

      <div className="relative flex items-center justify-between border-b px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-100/50 p-2 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent activity</h2>
            <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
              Live event log
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50/50 text-left text-xs font-medium uppercase text-muted-foreground backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-6 py-3 font-semibold tracking-wider">Email</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Action</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 bg-white/40 dark:divide-slate-800 dark:bg-transparent">
            {rows.length === 0 ? (
              <tr>
                <td
                  className="px-6 py-8 text-center text-sm text-muted-foreground dark:text-slate-500"
                  colSpan={3}
                >
                  No events yet.
                </td>
              </tr>
            ) : (
              rows.map((event, index) => (
                <tr
                  key={`${event.email}-${event.created_at}-${index}`}
                  className="group transition-colors hover:bg-muted/50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-3 font-medium text-foreground group-hover:text-primary transition-colors dark:text-slate-200 dark:group-hover:text-white">
                    {event.email}
                  </td>
                  <td className="px-6 py-3">
                    <StatusPill status={event.action} />
                  </td>
                  <td className="px-6 py-3 text-muted-foreground font-mono text-xs dark:text-slate-500">
                    {formatDateTime(event.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
