'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearAuthToken, getAuthToken } from '../lib/auth';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/regulations', label: 'Regulations' },
  { href: '/deadlines', label: 'Deadlines' },
  { href: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(Boolean(getAuthToken()));
  }, [pathname]);

  const logout = () => {
    clearAuthToken();
    setIsAuthed(false);
    router.push('/login');
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-indigo-700">
          Compliance MVP
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'font-semibold text-indigo-700' : 'text-slate-600 hover:text-slate-900'}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthed ? (
            <>
              <Link href="/login" className="button-secondary">
                Login
              </Link>
              <Link href="/register" className="button-primary">
                Register
              </Link>
            </>
          ) : (
            <button type="button" onClick={logout} className="button-secondary">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
