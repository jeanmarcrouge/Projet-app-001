import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/profile", label: "Profile" },
];

type DashboardSidebarProps = {
  onLogout: () => void;
};

export function DashboardSidebar({ onLogout }: DashboardSidebarProps) {
  const router = useRouter();

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 md:w-64 md:p-5">
      <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Navigation
      </p>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = router.pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-6 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Logout
      </button>
    </aside>
  );
}
