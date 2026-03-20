export default function DeadlineBadge({ daysRemaining }) {
  let classes = 'bg-emerald-100 text-emerald-800';

  if (daysRemaining <= 7) {
    classes = 'bg-red-100 text-red-800';
  } else if (daysRemaining <= 15) {
    classes = 'bg-orange-100 text-orange-800';
  }

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${classes}`}>
      {daysRemaining} days left
    </span>
  );
}
