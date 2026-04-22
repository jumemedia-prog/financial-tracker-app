import { useState } from "react";
import { CATEGORIES } from "../../constants/categories";

const today = new Date().toISOString().split("T")[0];

const INITIAL_STATE = {
  type: "expense",
  amount: "",
  description: "",
  category: CATEGORIES[0],
  date: today,
};

const TYPE_LABELS = {
  expense: "Dépense",
  income: "Revenu",
};

const inputClass =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim()) {
      setError("La description est requise.");
      return;
    }
    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError("Le montant doit être supérieur à 0.");
      return;
    }
    onAdd(form);
    setForm({ ...INITIAL_STATE, date: today });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Ajouter une transaction
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Type toggle */}
        <div
          className="flex rounded-lg overflow-hidden border border-gray-200 p-0.5 bg-gray-50 gap-0.5"
          role="group"
          aria-label="Type de transaction"
        >
          {["expense", "income"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, type: t }))}
              aria-pressed={form.type === t}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 ${
                form.type === t
                  ? t === "income"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-red-500 text-white shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white"
              }`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tf-description" className="text-xs font-medium text-gray-500">
            Description
          </label>
          <input
            id="tf-description"
            name="description"
            type="text"
            placeholder="Ex : courses, loyer…"
            value={form.description}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tf-amount" className="text-xs font-medium text-gray-500">
            Montant (€)
          </label>
          <input
            id="tf-amount"
            name="amount"
            type="number"
            placeholder="0,00"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tf-category" className="text-xs font-medium text-gray-500">
            Catégorie
          </label>
          <select
            id="tf-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label htmlFor="tf-date" className="text-xs font-medium text-gray-500">
            Date
          </label>
          <input
            id="tf-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Validation error */}
        {error && (
          <p className="text-red-500 text-xs flex items-center gap-1" role="alert">
            <span aria-hidden="true">!</span>
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Ajouter la transaction
        </button>
      </form>
    </div>
  );
}
