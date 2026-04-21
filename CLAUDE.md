# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build (outputs to dist/)
npm run preview   # preview the production build locally
```

There is no test runner or linter configured.

## Architecture

All application state lives in a single custom hook — `src/hooks/useTransactions.js`. It owns the `transactions` array, persists it to `localStorage` under the key `budget_tracker_transactions`, and exposes pre-computed derived values (`totalIncome`, `totalExpenses`, `balance`, `expensesByCategory`) via `useMemo`. No component manages transaction state directly; everything flows down as props from `App.jsx`.

`src/utils/calculations.js` contains the four pure aggregation functions that the hook depends on. These have no side effects and are the right place to add new financial computations.

`src/constants/categories.js` is the single source of truth for both the category list and their chart/badge colors. When adding a new category, update both `CATEGORIES` and `CATEGORY_COLORS` here — the form dropdown, chart slices, and item badges all derive their values from this file.

The `SpendingChart` component (`src/components/Charts/SpendingChart.jsx`) consumes the `expensesByCategory` array from the hook, which is already shaped as `[{ name, value, color }]` for Recharts. The chart only shows categories that have at least one expense transaction.

## Data Model

```js
// Transaction (localStorage key: "budget_tracker_transactions")
{
  id: string,           // crypto.randomUUID()
  type: "income" | "expense",
  amount: number,       // always positive float
  description: string,
  category: string,     // one of CATEGORIES (French names)
  date: string,         // ISO date "YYYY-MM-DD"
}

// Monthly budgets (localStorage key: "budget_tracker_monthly_budgets")
{ "YYYY-MM": number }   // e.g. { "2026-04": 1500 }
```

## Monthly Budget Feature

`src/hooks/useBudget.js` manages per-month budget limits stored in localStorage. It exposes `currentBudget` (the limit for the current month or `null` if unset), `currentMonthKey` ("YYYY-MM"), `setBudgetForMonth`, and `clearBudgetForMonth`.

`src/components/Dashboard/BudgetProgress.jsx` renders either a set-budget form (when `currentBudget === null`) or a progress bar showing current-month expenses vs. the limit. The bar turns yellow at 75% and red when over budget. "Désactiver" calls `onClear` to remove the budget for the month.

`currentMonthExpenses` is derived in `useTransactions` and filters transactions where `date.startsWith(currentMonthKey)` and `type === "expense"`.

## Localisation

The app is fully in French with EUR currency (`fr-FR` locale, `Intl.NumberFormat`). Category names in `constants/categories.js` are in French — these are the values stored in transactions, so any change to category names is a breaking change for existing localStorage data.

## Git Workflow

Commit all changes with clear messages and push to `origin/master` after every meaningful change so the backup is always current.
