const features = [
  {
    title: "Analytics in real-time",
    description:
      "Monitor usage, conversions, and trends with live metrics and actionable insights.",
  },
  {
    title: "Team collaboration",
    description:
      "Assign tasks, share updates, and keep every stakeholder aligned in one workspace.",
  },
  {
    title: "Workflow automation",
    description:
      "Automate repetitive operations and focus your team on strategic outcomes.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Features</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Everything your product team needs to ship and scale efficiently.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
