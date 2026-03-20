import { FormEvent, useEffect, useState } from "react";

type DashboardItem = {
  id: string;
  name: string;
  type: string;
};

type ItemFormProps = {
  selectedItem: DashboardItem | null;
  onSave: (item: DashboardItem) => void;
  onCancelEdit: () => void;
};

export function ItemForm({ selectedItem, onSave, onCancelEdit }: ItemFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setType(selectedItem.type);
      return;
    }

    setName("");
    setType("");
  }, [selectedItem]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !type.trim()) {
      return;
    }

    onSave({
      id: selectedItem?.id ?? crypto.randomUUID(),
      name: name.trim(),
      type: type.trim(),
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-lg font-semibold text-slate-900">
        {selectedItem ? "Edit item" : "Add item"}
      </h3>

      <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Item name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
        />
        <input
          type="text"
          value={type}
          onChange={(event) => setType(event.target.value)}
          placeholder="Type"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-cyan-400/30 transition focus:ring"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {selectedItem ? "Update" : "Add"}
          </button>
          {selectedItem ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export type { DashboardItem };
