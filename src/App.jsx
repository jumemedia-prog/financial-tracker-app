import { useTransactions } from "./hooks/useTransactions";
import { useBudget } from "./hooks/useBudget";
import Dashboard from "./components/Dashboard/Dashboard";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";
import SpendingChart from "./components/Charts/SpendingChart";

export default function App() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    currentMonthExpenses,
  } = useTransactions();

  const {
    currentBudget,
    currentMonthKey,
    setBudgetForMonth,
    clearBudgetForMonth,
  } = useBudget();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white py-5 px-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Suivi de budget</h1>
          <p className="text-blue-200 text-sm mt-0.5">
            Suivez vos revenus et dépenses
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Dashboard
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          currentMonthExpenses={currentMonthExpenses}
          currentBudget={currentBudget}
          currentMonthKey={currentMonthKey}
          onSetBudget={setBudgetForMonth}
          onClearBudget={clearBudgetForMonth}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionForm onAdd={addTransaction} />
          <SpendingChart expensesByCategory={expensesByCategory} />
        </div>

        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </main>
    </div>
  );
}
