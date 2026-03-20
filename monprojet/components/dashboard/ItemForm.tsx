import { FormEvent, useState } from "react";

type ManagedItem = {
  id: number;
  title: string;
  type: "Task" | "Note";
};

const initialItems: ManagedItem[] = [
  { id: 1, title: "Review onboarding funnel", type: "Task" },
  { id: 2, title: "Q2 launch ideas", type: "Note" },
];

export const ItemForm = () => {
  const [items, setItems] = useState<ManagedItem[]>(initialItems);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ManagedItem["type"]>("Task");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, title: cleanTitle, type } : item))
      );
    } else {
      setItems((prev) => [...prev, { id: Date.now(), title: cleanTitle, type }]);
    }

    setTitle("");
    setType("Task");
    setEditingId(null);
  };

  const handleEdit = (item: ManagedItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setType(item.type);
  };

  return (
    <section className="rounded-xl border border-white/10 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-white">Add or edit items</h2>

      <form className="mt-4 grid gap-3 sm:grid-cols-3" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Item title"
          className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2 sm:col-span-2"
        />
        <select
          value={type}
          onChange={(event) => setType(event.target.value as ManagedItem["type"])}
          className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-cyan-300 transition focus:ring-2"
        >
          <option>Task</option>
          <option>Note</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 sm:col-span-3"
        >
          {editingId ? "Update item" : "Add item"}
        </button>
      </form>

      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="text-xs text-slate-300">{item.type}</p>
            </div>
            <button
              type="button"
              onClick={() => handleEdit(item)}
              className="rounded-md border border-white/15 px-2 py-1 text-xs text-slate-200 hover:bg-white/5"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
