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
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{description}</p>
          <p className="text-xs text-gray-400">
            <span
              className="inline-block px-1.5 py-0.5 rounded-full text-white text-xs mr-1"
              style={{ backgroundColor: color }}
            >
              {category}
            </span>
            {formatDate(date)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          className={`text-sm font-semibold ${
            isIncome ? "text-green-600" : "text-red-500"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatter.format(amount)}
        </span>
        <button
          onClick={() => onDelete(id)}
          className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
          aria-label="Supprimer la transaction"
        >
          ×
        </button>
      </div>
    </div>
  );
}
