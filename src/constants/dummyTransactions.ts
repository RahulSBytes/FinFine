// src/data/transactions.ts

export type Transaction = {
  id: string
  title: string
  category: string
  type: "income" | "expense"
  amount: number
  date: Date,
  paymentMethod: string
  note?: string
}

export const transactions: Transaction[] =  [
  { id: "1",  title: "Monthly Salary",       category: "Salary",        type: "income",  amount: 4200,  date: new Date("2026-04-01"), paymentMethod: "Bank Transfer", note: "April salary" },
  { id: "6",  title: "Grocery Store",        category: "Food",          type: "expense", amount: 84,    date: new Date("2026-04-03"), paymentMethod: "Card" },
  { id: "7",  title: "Electricity Bill",     category: "Utilities",     type: "expense", amount: 120,   date: new Date("2026-03-30"), paymentMethod: "UPI",  note: "March bill" },
  { id: "2",  title: "Freelance Project",    category: "Freelance",     type: "income",  amount: 800,   date: new Date("2026-03-28"), paymentMethod: "UPI" },
  { id: "3",  title: "Stock Dividend",       category: "Investment",    type: "income",  amount: 340,   date: new Date("2026-03-25"), paymentMethod: "Bank Transfer" },
  { id: "4",  title: "Bonus",                category: "Salary",        type: "income",  amount: 1500,  date: new Date("2026-03-20"), paymentMethod: "Bank Transfer", note: "Q1 performance bonus" },
  { id: "5",  title: "Selling Old Laptop",   category: "Other",         type: "income",  amount: 280,   date: new Date("2026-03-15"), paymentMethod: "Cash" },

  { id: "8",  title: "Spotify Premium",      category: "Entertainment", type: "expense", amount: 10,    date: new Date("2026-03-28"), paymentMethod: "Card" },
  { id: "9",  title: "Restaurant Dinner",    category: "Food",          type: "expense", amount: 42,    date: new Date("2026-03-27"), paymentMethod: "Card", note: "dinner with friends" },
  { id: "10", title: "Fuel",                 category: "Transport",     type: "expense", amount: 55,    date: new Date("2026-03-24"), paymentMethod: "Cash" },
  { id: "11", title: "Amazon Order",         category: "Shopping",      type: "expense", amount: 134,   date: new Date("2026-03-22"), paymentMethod: "Card", note: "keyboard + mousepad" },
  { id: "12", title: "Netflix",              category: "Entertainment", type: "expense", amount: 15,    date: new Date("2026-03-20"), paymentMethod: "Card" },
  { id: "13", title: "Gym Membership",       category: "Health",        type: "expense", amount: 40,    date: new Date("2026-03-18"), paymentMethod: "Card" },
  { id: "14", title: "Internet Bill",        category: "Utilities",     type: "expense", amount: 60,    date: new Date("2026-03-17"), paymentMethod: "UPI" },
  { id: "15", title: "Coffee Shop",          category: "Food",          type: "expense", amount: 12,    date: new Date("2026-03-16"), paymentMethod: "Card" },
  { id: "16", title: "Uber Ride",            category: "Transport",     type: "expense", amount: 18,    date: new Date("2026-03-15"), paymentMethod: "Card" },
  { id: "17", title: "Doctor Visit",         category: "Health",        type: "expense", amount: 75,    date: new Date("2026-03-14"), paymentMethod: "Cash" },
];