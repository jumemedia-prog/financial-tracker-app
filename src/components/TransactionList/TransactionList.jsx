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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-base font-semibold text-gray-800">
          Transactions
          {transactions.length > 0 && (
            <span className="ml-2 text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {transactions.length}
            </span>
          )}
        </h2>
        <div
          className="flex rounded-lg overflow-hidden border border-gray-200 bg-gray-50 p-0.5 gap-0.5"
          role="group"
          aria-label="Filtrer les transactions"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset ${
                filter === f.value
                  ? "bg-white text-blue-600 shadow-sm"
                  : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-400">
          <span className="text-4xl text-gray-200 select-none" aria-hidden="true">—</span>
          <p className="text-sm text-center">
            {transactions.length === 0
              ? "Aucune transaction. Ajoutez-en une ci-dessus."
              : "Aucune transaction ne correspond à ce filtre."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-gray-50">
          {filtered.map((t) => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
