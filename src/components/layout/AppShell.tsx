"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAppContext } from "@/context/AppContext";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/inscription", label: "Inscription" },
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/sources", label: "Sources officielles" },
  { href: "/admin", label: "Admin" },
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { currentUser, notifications } = useAppContext();

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Obligo TPE/PME</p>
            <h1 className="text-base font-semibold">Suivi fiscal et social</h1>
          </div>

          <nav className="hidden gap-2 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="text-right text-xs text-zinc-500">
            <p>
              {currentUser
                ? `${currentUser.profile.ownerName} · ${currentUser.role}`
                : "Non connecté"}
            </p>
            <p>{notifications.length} alertes actives</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
