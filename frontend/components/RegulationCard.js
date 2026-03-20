export default function RegulationCard({ regulation }) {
  return (
    <article className="card space-y-3">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-900">{regulation.title}</h3>
        <span className="rounded bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">{regulation.category}</span>
      </div>
      <p className="text-sm text-slate-600">{regulation.affected_if}</p>
      <p className="text-sm text-slate-700">{regulation.action}</p>
      <p className="text-sm font-medium text-slate-800">{regulation.date}</p>
      {regulation.source_link && (
        <a
          href={regulation.source_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-sm font-medium text-indigo-700 hover:underline"
        >
          Official source
        </a>
      )}
    </article>
  );
}
