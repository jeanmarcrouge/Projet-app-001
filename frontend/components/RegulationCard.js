export default function RegulationCard({ regulation }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">{regulation.title}</h3>
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          {regulation.category}
        </span>
      </div>
      <p className="mb-1 text-sm text-slate-700">{regulation.summary?.affectedIf}</p>
      <p className="mb-1 text-sm text-slate-700">{regulation.summary?.action}</p>
      <p className="mb-2 text-sm text-slate-700">{regulation.summary?.date}</p>
      <a href={regulation.sourceLink} target="_blank" rel="noreferrer" className="text-sm font-medium">
        Official source
      </a>
    </article>
  );
}
