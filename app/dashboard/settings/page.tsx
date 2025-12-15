import { UserProfile } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Auditspro",
  description: "Manage your account settings.",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your account and preferences.
        </p>
      </div>
      
      <div className="flex justify-center">
            <UserProfile 
                routing="hash"
                appearance={{
                    elements: {
                        rootBox: "w-full",
                        card: "w-full shadow-none border border-slate-200 dark:border-slate-800 bg-white/50 backdrop-blur-xl dark:bg-slate-900/50",
                        navbar: "hidden",
                        pageScrollBox: "p-0",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden"
                    }
                }}
            />
      </div>
    </div>
  );
}
