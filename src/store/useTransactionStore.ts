import { create } from "zustand";
import type { Transaction } from "../constants/dummyTransactions";
import { transactions as initialData } from "../constants/dummyTransactions";
import { persist } from "zustand/middleware"

type Role = "admin" | "viewer"

type TransactionStore = {
  transactions: Transaction[]
  role: Role
  addTransaction: (transaction: Transaction) => void
  editTransaction: (id: string, updated: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  setRole: (role: Role) => void
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: initialData,
      role: "admin",

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      editTransaction: (id, updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      setRole: (role) => set({ role }),
    }),
    {
      name: "finflow-storage", 
    }
  )
)