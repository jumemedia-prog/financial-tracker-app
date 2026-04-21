import { useState } from "react";
import TransactionItem from "./TransactionItem";

const FILTERS = ["All", "Income", "Expense"];

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
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-8">
          {transactions.length === 0
            ? "No transactions yet. Add one above."
            : "No transactions match this filter."}
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
