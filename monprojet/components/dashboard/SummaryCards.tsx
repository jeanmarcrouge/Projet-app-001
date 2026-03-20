const stats = [
  { label: "Active users", value: "1,284", change: "+12%" },
  { label: "MRR", value: "$24,980", change: "+8%" },
  { label: "Churn rate", value: "2.1%", change: "-0.4%" },
];

export const SummaryCards = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-300">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
          <p className="mt-1 text-sm text-cyan-300">{stat.change} this month</p>
        </article>
      ))}
    </div>
  );
};
