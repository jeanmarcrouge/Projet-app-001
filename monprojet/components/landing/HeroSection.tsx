import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 md:py-28">
      <div className="max-w-3xl space-y-6">
        <p className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-200">
          Modern SaaS Platform
        </p>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
          Build, track and grow your business from one dashboard.
        </h1>
        <p className="text-lg text-slate-300">
          monprojet centralizes your product metrics, user management and billing insights so your
          team can focus on shipping value faster.
        </p>
      </div>

      <div>
        <Link
          href="/signup"
          className="inline-flex rounded-lg bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};
