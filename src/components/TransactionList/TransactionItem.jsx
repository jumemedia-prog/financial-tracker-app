import { CATEGORY_COLORS } from "../../constants/categories";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionItem({ transaction, onDelete }) {
  const { id, type, amount, description, category, date } = transaction;
  const color = CATEGORY_COLORS[category] || "#94a3b8";
  const isIncome = type === "income";

  return (
    <div className="flex items-center justify-between py-3 gap-3 group">
      {/* Left: description + meta */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Category color strip */}
        <span
          className="w-1 h-10 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate leading-snug">
            {description}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="inline-block px-1.5 py-0.5 rounded text-white text-xs leading-none font-medium"
              style={{ backgroundColor: color }}
            >
              {category}
            </span>
            <span className="text-xs text-gray-400">{formatDate(date)}</span>
          </div>
        </div>
      </div>

      {/* Right: amount + delete */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <span
          className={`text-sm font-bold tabular-nums ${
            isIncome ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatter.format(amount)}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="ml-1 w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={`Supprimer ${description}`}
        >
          <span className="text-base leading-none" aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
