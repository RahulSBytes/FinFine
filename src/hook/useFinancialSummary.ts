// hooks/useFinancialSummary.ts
import { useMemo } from "react";
import { useTransactionStore } from "../store/useTransactionStore";

export function useFinancialSummary(month?: Date) {
  const transactions = useTransactionStore((s) => s.transactions);

  const monthlySpending = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const map: Record<string, number> = {};
    allMonths.slice(0, currentMonth + 1).forEach((m) => (map[m] = 0));

    transactions
      .filter((t) => {
        const date = new Date(t.date);
        return t.type === "expense" && date.getFullYear() === currentYear;
      })
      .forEach((t) => {
        const label = new Date(t.date).toLocaleString("default", {
          month: "short",
        });
        map[label] = (map[label] || 0) + t.amount;
      });

    const entries = Object.entries(map).map(([month, total]) => ({
      month,
      total,
    }));
    const yearTotal = entries.reduce((s, e) => s + e.total, 0);

    return entries.map((e) => ({
      ...e,
      percentage: yearTotal > 0 ? +((e.total / yearTotal) * 100).toFixed(1) : 0,
    }));
  }, [transactions]);

  const categoryBreakdown = useMemo(() => {
    const target = month ?? new Date();
    const targetMonth = target.getMonth();
    const targetYear = target.getFullYear();

    const map: Record<string, number> = {};

    transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === "expense" &&
          d.getMonth() === targetMonth &&
          d.getFullYear() === targetYear
        );
      })
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions, month]);

  const summary = useMemo(() => {
    const target = month ?? new Date();
    const targetMonth = target.getMonth();
    const targetYear = target.getFullYear();

    const monthlyTxns = transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
    });

    const income = monthlyTxns
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = monthlyTxns
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    const savingAmount = income - expense;
    const savingRate =
      income > 0 ? +((savingAmount / income) * 100).toFixed(1) : 0;
    const savingStatus =
      savingRate >= 20
        ? "On Track"
        : savingRate >= 10
          ? "Needs Attention"
          : "Off Track";

    const today = new Date();
    const isCurrentMonth =
      targetMonth === today.getMonth() && targetYear === today.getFullYear();
    const daysPassed = isCurrentMonth
      ? today.getDate()
      : new Date(targetYear, targetMonth + 1, 0).getDate();
    const avgDailySpend = +(expense / daysPassed).toFixed(2);

    const topCategory =
      Object.entries(
        monthlyTxns
          .filter((t) => t.type === "expense")
          .reduce(
            (acc, t) => {
              acc[t.category] = (acc[t.category] || 0) + t.amount;
              return acc;
            },
            {} as Record<string, number>,
          ),
      ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

    return {
      income,
      expense,
      savingAmount,
      savingRate,
      savingStatus,
      avgDailySpend,
      topCategory,
    };
  }, [transactions, month]);

  return { ...summary, monthlySpending, categoryBreakdown };
}
