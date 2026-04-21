import { CATEGORY_COLORS } from "../constants/categories";

export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

export function getExpensesByCategory(transactions) {
  const map = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name] || "#94a3b8",
  }));
}
