const plans = [
  {
    name: "Free",
    price: "$0",
    details: "Perfect to explore the platform.",
    highlights: ["1 workspace", "Basic analytics", "Community support"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    details: "Best for growing startups.",
    highlights: ["Unlimited projects", "Advanced analytics", "Email support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    details: "Built for scale and compliance.",
    highlights: ["SSO and security", "Custom reporting", "Dedicated manager"],
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Pricing</h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Flexible plans that adapt as your business grows.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-2xl border p-6 ${
              plan.featured
                ? "border-cyan-400 bg-cyan-500/10"
                : "border-slate-800 bg-slate-900/60"
            }`}
          >
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-2 text-4xl font-bold text-white">{plan.price}</p>
            <p className="mt-2 text-sm text-slate-300">{plan.details}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              {plan.highlights.map((highlight) => (
                <li key={highlight}>• {highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
