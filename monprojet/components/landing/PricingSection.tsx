const plans = [
  {
    name: "Free",
    price: "$0/mo",
    details: "Great for exploring the platform.",
    features: ["1 project", "Basic analytics", "Community support"],
  },
  {
    name: "Pro",
    price: "$29/mo",
    details: "Ideal for growing teams and startups.",
    features: ["Unlimited projects", "Advanced analytics", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    details: "Built for large scale organizations.",
    features: ["SSO + roles", "Custom integrations", "Dedicated success manager"],
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-bold text-white">Pricing</h2>
      <p className="mt-3 max-w-2xl text-slate-300">Simple and transparent plans for every stage.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/50"
          >
            <h3 className="text-xl font-semibold text-cyan-200">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold text-white">{plan.price}</p>
            <p className="mt-2 text-sm text-slate-300">{plan.details}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-cyan-300">•</span> {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
