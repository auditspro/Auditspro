import type { QueryResultRow } from "pg";
import { formatCellValue } from "./utils";

export function TablePreview({
  title,
  description,
  rows,
}: {
  title: string;
  description: string;
  rows: QueryResultRow[];
}) {
  const columns = Object.keys(rows[0] ?? {}).slice(0, 6);

  return (
    <div className="group relative rounded-2xl border bg-white shadow-sm overflow-hidden transition-all hover:shadow-lg dark:bg-slate-950 dark:border-slate-800 dark:shadow-slate-900/50">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-slate-500/5 blur-3xl transition-opacity group-hover:opacity-100 dark:bg-slate-500/10" />

      <div className="relative border-b px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 dark:border-slate-800">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">{description}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50/50 text-left text-xs font-medium uppercase text-muted-foreground backdrop-blur-sm dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-400">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-3 font-semibold tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 bg-white/40 dark:divide-slate-800 dark:bg-transparent">
            {rows.length === 0 ? (
              <tr>
                <td
                  className="px-6 py-8 text-center text-sm text-muted-foreground dark:text-slate-500"
                  colSpan={Math.max(columns.length, 1)}
                >
                  No rows found.
                </td>
              </tr>
            ) : (
              rows.slice(0, 10).map((row, index) => (
                <tr key={index} className="group transition-colors hover:bg-muted/50 dark:hover:bg-slate-800/50">
                  {columns.map((col) => (
                    <td key={col} className="px-6 py-3 text-muted-foreground group-hover:text-foreground transition-colors dark:text-slate-400 dark:group-hover:text-slate-200">
                      {formatCellValue(row[col])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
