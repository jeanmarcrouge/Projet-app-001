const getBadgeStyle = (dueDate) => {
  const days = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  if (days <= 7) return "bg-red-100 text-red-700";
  if (days <= 15) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
};

export default function DeadlineCard({ deadline }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{deadline.title}</h3>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getBadgeStyle(deadline.due_date)}`}>
          {deadline.type}
        </span>
      </div>
      <p className="text-sm text-slate-600">Due date: {new Date(deadline.due_date).toLocaleDateString()}</p>
      {deadline.action_text ? <p className="mt-2 text-sm text-slate-700">{deadline.action_text}</p> : null}
    </article>
  );
}
