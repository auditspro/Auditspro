"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Activity, Settings, Shield } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Subscribers", href: "/dashboard/subscribers", icon: Users },
  { name: "Activity", href: "/dashboard/activity", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white/50 backdrop-blur-xl dark:bg-slate-950/50 dark:border-slate-800">
      <div className="flex h-16 items-center px-6 border-b dark:border-slate-800">
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600">
                <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Auditspro</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900/20 dark:text-indigo-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t dark:border-slate-800">
        <div className="rounded-xl bg-slate-900 p-4 shadow-lg dark:bg-slate-800">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-medium text-slate-400">System Online</p>
            </div>
            <p className="text-sm font-bold text-white">Admin Console</p>
            <p className="text-[10px] text-slate-500 mt-1">v1.2.0 • Stable</p>
        </div>
      </div>
    </div>
  );
}
