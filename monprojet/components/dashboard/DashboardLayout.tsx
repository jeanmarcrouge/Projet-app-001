import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/utils/AuthContext";

type DashboardLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const DashboardLayout = ({ title, description, children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 md:flex">
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 px-5 py-8 md:px-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-1 text-sm text-slate-300">{description}</p>
          {user && <p className="mt-2 text-xs text-cyan-300">Signed in as {user.email}</p>}
        </header>
        {children}
      </main>
    </div>
  );
};
