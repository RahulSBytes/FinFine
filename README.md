# FinFlow

> A modern, full-featured personal finance tracker built with React 19, TypeScript, and Zustand — designed to give you complete visibility into your income, expenses, and savings at a glance.


### Live link :  https://fin-fine.vercel.app/

---

## ✨ Features

### 📊 Dashboard
- **Monthly Summary** — Total income, expenses, savings amount, and saving rate for the current month
- **Saving Rate Status** — Smart status indicator: `On Track` / `Needs Attention` / `Off Track` based on the 50/30/20 rule
- **Top Spending Category** — Instantly see where your money is going
- **Average Daily Spend** — Dynamically calculated based on days elapsed in the current month

### 📈 Insights
- **Monthly Spending Chart** — Bar/line chart showing expense trends from January to the current month (current year only)
- **Category Breakdown** — Donut chart visualizing expense distribution across all categories for the selected month
- **Percentage Breakdown** — Each month shows its share of total yearly spend

### 💳 Transactions
- **Full Transaction List** — View all transactions with category icons, formatted dates, and color-coded income/expense amounts
- **Expand to View Details** — Click any transaction to reveal payment method and notes
- **Inline Editing** — Edit title, amount, date, type, category, payment method, and note without leaving the page
- **Delete Transactions** — Remove any transaction instantly

### ⚙️ Settings & UX
- **Role-Based Access** — Toggle between `Admin` (full CRUD) and `Viewer` (read-only) mode
- **Dark / Light Theme** — Persistent theme preference saved to localStorage
- **Responsive Layout** — Sidebar on desktop (`md+`), drawer navbar on mobile
- **Collapsible Sidebar** — Icon-only mode with tooltip labels when collapsed
- **Persistent State** — All transactions and preferences survive page refresh via Zustand `persist`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand v5 + `persist` middleware |
| Routing | React Router v7 |
| Charts | Recharts v3 |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Build Tool | Vite v8 |

---

## 📁 Project Structure

```
src/
├── App.tsx
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components
│   ├── Layout.tsx
│   ├── mini-components
│   │   ├── BalanceChart.tsx
│   │   ├── ProgressRow.tsx
│   │   ├── SpendingChart.tsx      # Donut chart for category breakdown
│   │   └── getIcon.tsx
│   ├── pages
│   │   ├── AddTransaction.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Insight.tsx
│   │   ├── NotFound.tsx
│   │   └── Transaction.tsx
│   ├── ui
│   │   ├── Navbar.tsx    # Mobile drawer navbar
│   │   └── Sidebar.tsx   # Desktop collapsible sidebar
│   └── wrapper
│       └── SquareShapes.tsx
├── constants
│   ├── constants.ts     # navs, categories, paymentMethods
│   └── dummyTransactions.ts     # 100+ seeded transactions (Jan–Apr 2026)
├── helpers
│   ├── calHelpers.ts
│   └── timeformater.ts
├── hook
│   └── useFinancialSummary.ts     # All derived financial calculations
├── index.css
├── main.tsx
└── store
    ├── useThemeStore.ts    # Dark/light theme state
    └── useTransactionStore.ts    # Transactions + role state
```

---

## 🧠 Architecture Decisions

### Custom Hook — `useFinancialSummary`
All financial calculations live in a single custom hook. It reads raw transactions from Zustand and computes derived values with `useMemo`:

```ts
const {
  income, expense,
  savingAmount, savingRate, savingStatus,
  avgDailySpend, topCategory,
  monthlySpending,      // [{ month, total, percentage }]
  categoryBreakdown,    // [{ name, value }]
} = useFinancialSummary();
```

**Why not Zustand?** Zustand holds raw state. Computed values like `totalIncome` don't belong in the store — they'd need manual syncing and create bugs. The hook recalculates only when `transactions` changes.

### Role-Based UI
```ts
const role = useTransactionStore((s) => s.role);

{role === "admin" && <button>Edit</button>}
{role === "admin" && <button>Delete</button>}
```

### Persist + Versioning
The store uses Zustand's `persist` middleware with a `version` field. Bump the version whenever `initialData` changes to avoid stale localStorage overriding fresh seed data.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/RahulSBytes/finflow.git
cd finflow

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📊 Seeded Data

The app comes pre-loaded with **100+ realistic transactions** spanning January–April 2026 across categories:

`Food` · `Transport` · `Shopping` · `Utilities` · `Entertainment` · `Health` · `Salary` · `Education` · `Freelance` · `Investment` · `Other`

Payment methods: `Cash` · `Card` · `UPI` · `Bank Transfer`

---

## 📐 Financial Formulas

| Metric | Formula |
|---|---|
| Saving Amount | `Income − Expense` |
| Saving Rate | `(Saving Amount / Income) × 100` |
| Avg Daily Spend | `Expense / Days Elapsed This Month` |
| Monthly % Share | `(Month Total / Year Total) × 100` |

**Saving Rate Benchmarks** (50/30/20 rule):
- ✅ `≥ 20%` → On Track
- ⚠️ `10–19%` → Needs Attention
- 🔴 `< 10%` → Off Track

---

## 🔮 Roadmap

- [ ] Budget goal setting per category
- [ ] CSV export of transactions
- [ ] Multi-month comparison view
- [ ] Recurring transaction support
- [ ] Authentication & cloud sync

---

## 📄 License

MIT © 2026 FinFlow
