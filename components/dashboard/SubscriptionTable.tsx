import { formatDateTime } from "./utils";
import { StatusPill } from "./StatusPill";
import type { LatestSubscription } from "@/lib/dashboard-data";

export function SubscriptionTable({ rows }: { rows: LatestSubscription[] }) {
  return (
    <div className="group relative rounded-2xl border bg-white shadow-sm overflow-hidden transition-all hover:shadow-lg dark:bg-slate-950 dark:border-slate-800 dark:shadow-slate-900/50">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl transition-opacity group-hover:opacity-100 dark:bg-indigo-500/10" />
      
      <div className="relative flex items-center justify-between border-b px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 dark:border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Latest subscription status</h2>
          <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
            Real-time feed of subscriber updates
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50/50 text-left text-xs font-medium uppercase text-muted-foreground backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-6 py-3 font-semibold tracking-wider">Email</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 bg-white/40 dark:divide-slate-800 dark:bg-transparent">
            {rows.length === 0 ? (
              <tr>
                <td
                  className="px-6 py-8 text-center text-sm text-muted-foreground dark:text-slate-500"
                  colSpan={3}
                >
                  No rows found.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.email}
                  className="group transition-colors hover:bg-muted/50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-3 font-medium text-foreground group-hover:text-primary transition-colors dark:text-slate-200 dark:group-hover:text-white">
                    {row.email}
                  </td>
                  <td className="px-6 py-3">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-6 py-3 text-muted-foreground font-mono text-xs dark:text-slate-500">
                    {formatDateTime(row.last_event_at)}
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
