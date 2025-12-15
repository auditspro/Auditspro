import { Mail, UserMinus, Users, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { SubscriptionSummary } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  summary: SubscriptionSummary;
  bounced: number;
}

export function StatsCards({ summary, bounced }: StatsCardsProps) {
  const total = summary.total || 1; // Prevent div by zero
  const activeRate = (summary.active / total) * 100;
  const unsubRate = (summary.unsubscribed / total) * 100;
  const bounceRate = (bounced / total) * 100;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Audience"
        value={summary.total}
        icon={Users}
        description="All time subscribers"
        color="blue"
      />
      <StatCard
        label="Active Subscribers"
        value={summary.active}
        icon={Mail}
        percentage={activeRate}
        description="Delivery success rate"
        color="emerald"
        trend="positive"
      />
      <StatCard
        label="Unsubscribed"
        value={summary.unsubscribed}
        icon={UserMinus}
        percentage={unsubRate}
        description="Opt-out rate"
        color="amber"
        trend="neutral"
      />
      <StatCard
        label="Bounced"
        value={bounced}
        icon={AlertTriangle}
        percentage={bounceRate}
        description="Invalid emails"
        color="rose"
        trend="negative"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  percentage,
  description,
  color,
  trend,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  percentage?: number;
  description: string;
  color: "blue" | "emerald" | "amber" | "rose";
  trend?: "positive" | "negative" | "neutral";
}) {
  const themeStyles = {
    blue: {
      bg: "bg-blue-50/50 dark:bg-blue-950/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/50",
      ring: "group-hover:ring-blue-100 dark:group-hover:ring-blue-900",
      gradient: "from-blue-500/10 to-transparent",
      bar: "bg-blue-500",
    },
    emerald: {
      bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/50",
      ring: "group-hover:ring-emerald-100 dark:group-hover:ring-emerald-900",
      gradient: "from-emerald-500/10 to-transparent",
      bar: "bg-emerald-500",
    },
    amber: {
      bg: "bg-amber-50/50 dark:bg-amber-950/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/50",
      ring: "group-hover:ring-amber-100 dark:group-hover:ring-amber-900",
      gradient: "from-amber-500/10 to-transparent",
      bar: "bg-amber-500",
    },
    rose: {
      bg: "bg-rose-50/50 dark:bg-rose-950/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-900/50",
      ring: "group-hover:ring-rose-100 dark:group-hover:ring-rose-900",
      gradient: "from-rose-500/10 to-transparent",
      bar: "bg-rose-500",
    },
  };

  const currentTheme = themeStyles[color];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 dark:bg-slate-950 dark:shadow-slate-900/50",
        currentTheme.border
      )}
    >
      {/* Background radial gradient */}
      <div
        className={cn(
          "absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br blur-3xl opacity-50 transition-opacity group-hover:opacity-100",
          currentTheme.gradient
        )}
      />

      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "rounded-xl p-3 bg-opacity-50 transition-colors",
              currentTheme.bg,
              currentTheme.text
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          {percentage !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border",
                currentTheme.bg,
                currentTheme.text,
                currentTheme.border
              )}
            >
              {percentage.toFixed(1)}%
              {trend === "positive" && <ArrowUpRight className="h-3 w-3" />}
              {trend === "negative" && <ArrowDownRight className="h-3 w-3" />}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {label}
          </h3>
          <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>

        {percentage !== undefined ? (
          <div className="space-y-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={cn("h-full rounded-full transition-all duration-500", currentTheme.bar)}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {description}
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-auto pt-3">
             {description}
          </p>
        )}
      </div>
    </div>
  );
}
