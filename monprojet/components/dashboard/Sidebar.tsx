import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/profile", label: "Profile" },
];

type SidebarProps = {
  onLogout: () => void;
};

export const Sidebar = ({ onLogout }: SidebarProps) => {
  const router = useRouter();

  return (
    <aside className="w-full border-b border-white/10 bg-slate-900/90 p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <p className="text-lg font-semibold text-cyan-300">monprojet</p>

      <nav className="mt-6 space-y-2">
        {links.map((link) => {
          const isActive =
            router.pathname === link.href ||
            (link.href === "/dashboard" && router.pathname === "/dashboard/index");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? "bg-cyan-500/20 text-cyan-200" : "text-slate-200 hover:bg-white/5 hover:text-white"
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
        className="mt-6 rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-200 hover:bg-white/5"
      >
        Logout
      </button>
    </aside>
  );
};
