import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Oct", balance: 18000 },
  { month: "Nov", balance: 20500 },
  { month: "Dec", balance: 19000 },
  { month: "Jan", balance: 22000 },
  { month: "Feb", balance: 21000 },
  { month: "Mar", balance: 24563 },
];

export default function BalanceChart() {
  return (
    <ResponsiveContainer  width="100%" height={200}>
      <BarChart data={data} barSize={28}>
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
          formatter={(value) => [`$${value.toLocaleString()}`, "Balance"]}
          contentStyle={{
            background: "#FFFFFF",
            border: "0.5px solid #E8ECF0",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Bar dataKey="balance" fill="#1A7F5A" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
