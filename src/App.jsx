import { useTransactions } from "./hooks/useTransactions";
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
  } = useTransactions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white py-5 px-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Budget Tracker</h1>
          <p className="text-blue-200 text-sm mt-0.5">
            Track your income and expenses
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Dashboard
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
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
