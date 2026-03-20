import { ReactNode } from "react";
import { useRouter } from "next/router";
import { logout } from "@/utils/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

type DashboardLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function DashboardLayout({
  title,
  subtitle,
  children,
}: DashboardLayoutProps) {
  const router = useRouter();

  function handleLogout() {
    logout();
    void router.push("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6 md:py-8">
        <DashboardSidebar onLogout={handleLogout} />
        <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 md:p-8">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">{subtitle}</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
