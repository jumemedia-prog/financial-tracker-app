import { useState, useEffect } from "react";

const LS_KEY = "budget_tracker_monthly_budgets";

export function useBudget() {
  const [budgets, setBudgets] = useState(() => {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(budgets));
  }, [budgets]);

  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const currentBudget = budgets[currentMonthKey] ?? null;

  function setBudgetForMonth(monthKey, amount) {
    setBudgets((prev) => ({ ...prev, [monthKey]: amount }));
  }

  function clearBudgetForMonth(monthKey) {
    setBudgets((prev) => {
      const next = { ...prev };
      delete next[monthKey];
      return next;
    });
  }

  return { currentBudget, currentMonthKey, setBudgetForMonth, clearBudgetForMonth };
}
