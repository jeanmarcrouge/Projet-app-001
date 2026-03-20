const features = [
  {
    title: "Analytics in real time",
    description: "Track usage, conversions and retention with live dashboards and automated reports.",
  },
  {
    title: "Team collaboration",
    description: "Assign tasks, share updates and align your team with clear project activity streams.",
  },
  {
    title: "Automated workflows",
    description: "Save time using reusable flows to onboard users, trigger actions and sync data.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold text-white">Features</h2>
      <p className="mt-3 max-w-2xl text-slate-300">
        Everything you need to run and scale your SaaS, with a clean experience for your users.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/50"
          >
            <h3 className="text-xl font-semibold text-cyan-200">{feature.title}</h3>
            <p className="mt-3 text-slate-300">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
