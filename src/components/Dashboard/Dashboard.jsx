import SummaryCard from "./SummaryCard";
import BudgetProgress from "./BudgetProgress";

export default function Dashboard({
  totalIncome,
  totalExpenses,
  balance,
  currentMonthExpenses,
  currentBudget,
  currentMonthKey,
  onSetBudget,
  onClearBudget,
}) {
  const balanceColor = balance >= 0 ? "text-blue-600" : "text-red-600";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Revenus totaux"
          amount={totalIncome}
          colorClass="text-green-600"
          icon="↑"
        />
        <SummaryCard
          label="Dépenses totales"
          amount={totalExpenses}
          colorClass="text-red-500"
          icon="↓"
        />
        <SummaryCard
          label="Solde actuel"
          amount={balance}
          colorClass={balanceColor}
          icon="="
        />
      </div>
      <BudgetProgress
        currentBudget={currentBudget}
        currentMonthExpenses={currentMonthExpenses}
        currentMonthKey={currentMonthKey}
        onSet={onSetBudget}
        onClear={onClearBudget}
      />
    </div>
  );
}
