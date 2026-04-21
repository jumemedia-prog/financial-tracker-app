import { useState } from "react";
import { CATEGORIES } from "../../constants/categories";

const today = new Date().toISOString().split("T")[0];

const INITIAL_STATE = {
  type: "expense",
  amount: "",
  description: "",
  category: "Food",
  date: today,
};

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
      setError("Description is required.");
      return;
    }
    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }
    onAdd(form);
    setForm({ ...INITIAL_STATE, date: today });
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Type toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          {["expense", "income"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, type: t }))}
              className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                form.type === t
                  ? t === "income"
                    ? "bg-green-600 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <input
          name="description"
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className={inputClass}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          value={form.amount}
          onChange={handleChange}
          className={inputClass}
        />

        <select
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

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className={inputClass}
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
