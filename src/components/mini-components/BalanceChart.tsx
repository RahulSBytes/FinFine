import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useFinancialSummary } from "../../hook/useFinancialSummary";


export default function BalanceChart() {

 const { monthlySpending } =
    useFinancialSummary();

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={monthlySpending} barSize={28}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#c1c1c1"
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#9CA3AF" }}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          formatter={(value) => [`$${value?.toLocaleString()}`, "Balance"]}
          contentStyle={{
            background: "#FFFFFF",
            border: "0.5px solid #E8ECF0",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Bar dataKey="total" fill="#1A7F5A" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
