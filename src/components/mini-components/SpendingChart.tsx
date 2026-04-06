import {
  PieChart, Pie, Cell, Tooltip,
  ResponsiveContainer, Legend
} from "recharts"

// const data = [
//   { name: "Food",          value: 1240 },
//   { name: "Transport",     value: 720  },
//   { name: "Shopping",      value: 610  },
//   { name: "Entertainment", value: 380  },
//   { name: "Utilities",     value: 290  },
// ]

const COLORS = ["#1A7F5A", "#3B82F6", "#F59E0B", "#8B5CF6", "#EC4899"]

export default function SpendingChart({ data }: { data: { name: string; value: number }[] }) {
  return <ResponsiveContainer width="100%" height={240}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}   // remove this line for full pie (no hole)
        outerRadius={90}
        paddingAngle={3}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        formatter={(value) => [`$${value?.toLocaleString()}`, "Spent"]}
        contentStyle={{
          background: "#FFFFFF",
          border: "0.5px solid #E8ECF0",
          borderRadius: "8px",
          fontSize: "13px",
        }}
      />
      <Legend
        iconType="circle"
        iconSize={8}
        formatter={(value) => (
          <span style={{ fontSize: "12px", color: "#4B5563" }}>{value}</span>
        )}
      />
    </PieChart>
  </ResponsiveContainer>
}