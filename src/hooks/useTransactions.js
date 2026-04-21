import { useState, useEffect, useMemo } from "react";
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getExpensesByCategory,
} from "../utils/calculations";

const LS_KEY = "budget_tracker_transactions";

export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(formData) {
    const transaction = {
      id: crypto.randomUUID(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description.trim(),
      category: formData.category,
      date: formData.date,
    };
    setTransactions((prev) => [transaction, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  const totalIncome = useMemo(() => getTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => getTotalExpenses(transactions), [transactions]);
  const balance = useMemo(() => getBalance(transactions), [transactions]);
  const expensesByCategory = useMemo(() => getExpensesByCategory(transactions), [transactions]);
  const currentMonthExpenses = useMemo(() => {
    const monthKey = new Date().toISOString().slice(0, 7);
    return transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(monthKey))
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpenses,
    balance,
    expensesByCategory,
    currentMonthExpenses,
  };
}
