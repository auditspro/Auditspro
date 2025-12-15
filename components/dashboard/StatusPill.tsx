import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: string }) {
  const normalized = status.toLowerCase();
  
  let classes = "bg-slate-50 text-slate-600 ring-slate-200/60";
  
  if (normalized === "active" || normalized === "subscribed") {
    classes = "bg-emerald-50 text-emerald-700 ring-emerald-200/60";
  } else if (normalized === "unsubscribed") {
    classes = "bg-amber-50 text-amber-700 ring-amber-200/60";
  } else if (normalized === "bounced" || normalized === "bounce") {
    classes = "bg-rose-50 text-rose-700 ring-rose-200/60";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset transition-colors hover:bg-opacity-80",
        classes
      )}
    >
      {normalized}
    </span>
  );
}
