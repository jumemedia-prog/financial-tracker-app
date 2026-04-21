import { useState } from "react";
import TransactionItem from "./TransactionItem";

const FILTERS = [
  { value: "All", label: "Tout" },
  { value: "Income", label: "Revenus" },
  { value: "Expense", label: "Dépenses" },
];

export default function TransactionList({ transactions, onDelete }) {
  const [filter, setFilter] = useState("All");

  const filtered = transactions
    .filter((t) => {
      if (filter === "Income") return t.type === "income";
      if (filter === "Expense") return t.type === "expense";
      return true;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-8">
          {transactions.length === 0
            ? "Aucune transaction. Ajoutez-en une ci-dessus."
            : "Aucune transaction ne correspond à ce filtre."}
        </p>
      ) : (
        <div>
          {filtered.map((t) => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
