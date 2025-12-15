import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <aside className="hidden w-64 md:block">
        <DashboardSidebar />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-end gap-4 border-b bg-white/50 px-6 backdrop-blur-xl dark:bg-slate-900/50 dark:border-slate-800">
           <UserButton afterSignOutUrl="/"/>
        </header>

        {/* Global Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-purple-100/40 to-pink-100/20 pointer-events-none mix-blend-multiply dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/20 dark:mix-blend-screen -z-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="mx-auto max-w-6xl">
                 {children}
            </div>
        </main>
      </div>
    </div>
  );
}
