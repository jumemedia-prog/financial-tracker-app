import SummaryCard from "./SummaryCard";

export default function Dashboard({ totalIncome, totalExpenses, balance }) {
  const balanceColor =
    balance >= 0 ? "text-blue-600" : "text-red-600";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        label="Total Income"
        amount={totalIncome}
        colorClass="text-green-600"
        icon="💰"
      />
      <SummaryCard
        label="Total Expenses"
        amount={totalExpenses}
        colorClass="text-red-500"
        icon="💸"
      />
      <SummaryCard
        label="Balance"
        amount={balance}
        colorClass={balanceColor}
        icon="📊"
      />
    </div>
  );
}
