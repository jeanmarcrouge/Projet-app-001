import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-20 md:py-28">
      <span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
        SaaS Platform
      </span>
      <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
        Launch and manage your business faster with one modern dashboard.
      </h1>
      <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
        Track activity, collaborate with your team, and automate repetitive
        workflows in a single place designed for growing companies.
      </p>
      <Link
        href="/signup"
        className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Get Started
      </Link>
    </section>
  );
}
