import { useState } from "react";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function getMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-");
  return new Date(year, month - 1, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

const inputClass =
  "flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 placeholder-gray-400 transition-colors";

export default function BudgetProgress({
  currentBudget,
  currentMonthExpenses,
  currentMonthKey,
  onSet,
  onClear,
}) {
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState(false);

  const monthLabel = getMonthLabel(currentMonthKey);

  function handleSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(inputValue);
    if (amount > 0) {
      onSet(currentMonthKey, amount);
      setInputValue("");
      setEditing(false);
    }
  }

  function handleEditClick() {
    setInputValue(String(currentBudget));
    setEditing(true);
  }

  if (currentBudget === null || editing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-base font-semibold text-gray-800">
            Budget mensuel
          </h2>
        </div>
        <p className="text-xs font-medium text-gray-400 mb-4 capitalize tracking-wide">
          {monthLabel}
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Montant limite (€)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={inputClass}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Définir
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-gray-400 hover:text-gray-600 px-3 py-2.5 text-sm rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Annuler
            </button>
          )}
        </form>
      </div>
    );
  }

  const percentage = (currentMonthExpenses / currentBudget) * 100;
  const isOver = currentMonthExpenses > currentBudget;
  const barWidth = Math.min(percentage, 100);
  const barColor = isOver
    ? "bg-red-500"
    : percentage >= 75
    ? "bg-amber-400"
    : "bg-emerald-500";

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-5 transition-colors ${
        isOver ? "border-red-200 bg-red-50/30" : "border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between mb-1">
        <h2 className="text-base font-semibold text-gray-800">
          Budget mensuel
        </h2>
        <div className="flex gap-1 mt-0.5">
          <button
            onClick={handleEditClick}
            className="text-xs font-medium text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Modifier
          </button>
          <button
            onClick={() => onClear(currentMonthKey)}
            className="text-xs font-medium text-gray-400 hover:text-red-500 px-2 py-1 rounded hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Désactiver
          </button>
        </div>
      </div>
      <p className="text-xs font-medium text-gray-400 mb-4 capitalize tracking-wide">
        {monthLabel}
      </p>

      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="flex justify-between items-baseline text-sm">
        <span className={isOver ? "text-red-500 font-semibold" : "text-gray-700 font-medium"}>
          {formatter.format(currentMonthExpenses)}{" "}
          <span className="font-normal text-gray-400 text-xs">dépensés</span>
        </span>
        <span className="text-xs text-gray-400">
          sur {formatter.format(currentBudget)}
        </span>
      </div>

      <div className="mt-2">
        {isOver ? (
          <p className="text-red-500 text-xs font-medium flex items-center gap-1">
            <span aria-hidden="true">!</span>
            Dépassement de {formatter.format(currentMonthExpenses - currentBudget)}
          </p>
        ) : (
          <p className="text-gray-400 text-xs">
            {formatter.format(currentBudget - currentMonthExpenses)} restants
            <span className="ml-1 text-gray-300">·</span>
            <span className="ml-1">{Math.round(percentage)}%</span>
          </p>
        )}
      </div>
    </div>
  );
}
