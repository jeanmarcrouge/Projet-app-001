export type ActivityRow = {
  id: string;
  item: string;
  status: "Done" | "In Progress" | "Pending";
  updatedAt: string;
};

type ActivityTableProps = {
  rows: ActivityRow[];
};

export function ActivityTable({ rows }: ActivityTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Item
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Status
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Last Update
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-3 text-slate-800">{row.item}</td>
              <td className="px-4 py-3 text-slate-600">{row.status}</td>
              <td className="px-4 py-3 text-slate-600">{row.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
