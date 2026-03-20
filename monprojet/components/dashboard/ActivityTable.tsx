type ActivityItem = {
  id: number;
  customer: string;
  plan: "Free" | "Pro" | "Enterprise";
  status: "Active" | "Trial" | "Cancelled";
};

const rows: ActivityItem[] = [
  { id: 1, customer: "Apex Studio", plan: "Pro", status: "Active" },
  { id: 2, customer: "Nova Labs", plan: "Enterprise", status: "Trial" },
  { id: 3, customer: "Pulse Works", plan: "Free", status: "Cancelled" },
  { id: 4, customer: "Brix Agency", plan: "Pro", status: "Active" },
];

export const ActivityTable = () => {
  return (
    <section className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Recent accounts</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-300">
            <tr>
              <th className="px-2 py-3 font-medium">Customer</th>
              <th className="px-2 py-3 font-medium">Plan</th>
              <th className="px-2 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-100">
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-2 py-3">{row.customer}</td>
                <td className="px-2 py-3">{row.plan}</td>
                <td className="px-2 py-3">
                  <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-200">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
