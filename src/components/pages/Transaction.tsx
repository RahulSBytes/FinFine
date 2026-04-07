import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useState } from "react";
import { X } from "lucide-react";
import { formatTransactionDate } from "../../helpers/timeformater";
import type { Transaction as TransactionType } from "../../constants/dummyTransactions";
import { category as categories } from "../../constants/constants";

type Filter = "all" | "income" | "expense";

function Transaction() {
  const [resultType, setResultType] = useState<Filter>("all");
  const transactions = useTransactionStore((s) => s.transactions);
  const editTransaction = useTransactionStore((s) => s.editTransaction);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);
  const role = useTransactionStore((s) => s.role);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<TransactionType>>({});

  const handleEdit = (t: TransactionType) => {
    setEditingId(t.id);
    setEditData({
      title: t.title,
      category: t.category,
      type: t.type,
      amount: t.amount,
      date: t.date,
      paymentMethod: t.paymentMethod,
      note: t.note,
    });
  };

  const handleSave = (id: string) => {
    editTransaction(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const filteredTransactions = transactions.filter((trnx) => {
    const matchesType = resultType === "all" || trnx.type === resultType;

    const matchesSearch =
      search === "" ||
      trnx.title.toLowerCase().includes(search.toLowerCase()) ||
      trnx.category.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:px-10 max-w-4xl mx-auto">
      {/* Heading */}
      <h3 className="text-heading text-xl md:text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-1 tracking-tight">
        Recent Transactions
      </h3>

      {/* Search + Filters Card */}
      <div className="bg-surface rounded-2xl border border-zinc-200/80 dark:border-zinc-700/70 shadow-sm shadow-zinc-200/50 dark:shadow-none p-3 sm:p-4">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-300/80 dark:border-zinc-600 bg-surface-2 px-3 py-1.5 focus-within:ring-2 focus-within:ring-brand-500/30 transition-all duration-150">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search through category or title"
            className="input-base bg-transparent border-0 w-full h-full text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
            type="text"
          />
          {search && (
            <X
              size={20}
              onClick={() => setSearch("")}
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer transition-colors"
            />
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1 mb-1 mt-3">
          {(["All", "Expense", "Income"] as const).map((el) => (
            <span
              key={el}
              onClick={() => setResultType(el.toLowerCase() as Filter)}
              className={`text-body-sm px-3.5 md:px-4 py-1.5 rounded-full border text-sm transition-all duration-150 cursor-pointer select-none
            ${
              resultType === el.toLowerCase()
                ? "bg-brand-subtle border-brand-500 text-brand font-medium shadow-sm shadow-brand-500/30"
                : "border-default text-zinc-400 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-surface-2"
            }`}
            >
              {el}
            </span>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <section className="flex flex-col gap-2 mt-1">
        {filteredTransactions.map(
          ({
            id,
            title,
            category,
            type,
            amount,
            date,
            note,
            paymentMethod,
          }) => {
            const isExpanded = expandedId === id;
            const isEditing = editingId === id;

            return (
              <div
                key={id}
                className="border border-zinc-200/80 dark:border-zinc-700/70 bg-surface rounded-xl px-3 sm:px-4 py-2.5 flex flex-col gap-2 shadow-[0_1px_0_rgba(15,23,42,0.03)] hover:shadow-md hover:-translate-y-[1px] transition-all duration-150"
              >
                {/*  Main Row  */}
                <div
                  className="flex-center gap-3 cursor-pointer"
                  onClick={() =>
                    !isEditing && setExpandedId(isExpanded ? null : id)
                  }
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-surface-2 border border-default flex-center shrink-0 text-base sm:text-lg">
                    {getIcon(category)}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <h5 className="text-[0.95rem] font-medium text-zinc-900 dark:text-zinc-50 truncate">
                      {title}
                    </h5>
                    <span className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
                      {category}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <span
                      className={`text-sm sm:text-[0.95rem] font-semibold ${
                        type === "income" ? "text-income" : "text-expense"
                      }`}
                    >
                      {type === "income" ? "+" : "-"} &#8377; {amount}
                    </span>
                    <span className="text-muted text-[11px] sm:text-xs font-semibold">
                      {formatTransactionDate(date)}
                    </span>
                  </div>
                </div>

                {/*  Expanded Section  */}
                {isExpanded && (
                  <div className={`flex flex-col gap-2 pt-1 ${isEditing? "" : "pl-11"}  border-l border-dashed border-zinc-200 dark:border-zinc-700 text-sm`}>
                    {!isEditing ? (
                      <>
                        {/* View Mode */}
                        <div className="flex gap-2 justify-start items-start text-zinc-500 dark:text-zinc-400">
                          <span className="font-medium text-zinc-700 dark:text-zinc-200">
                            Payment:
                          </span>
                          <span>{paymentMethod}</span>
                        </div>
                        <div className="flex gap-2 text-zinc-500 dark:text-zinc-400">
                          <span className="font-medium text-zinc-700 dark:text-zinc-200">
                            Note:
                          </span>
                          <span>{note ?? "Nothing was noted"}</span>
                        </div>
                       {role=="admin" && <div className="flex gap-3 mt-1">
                          <button
                            onClick={() =>
                              handleEdit({
                                id,
                                title,
                                category,
                                type,
                                amount,
                                date,
                                note,
                                paymentMethod,
                              })
                            }
                            className="text-xs px-2 py-1 rounded-full bg-brand-subtle/70 text-brand font-semibold hover:bg-brand-subtle transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTransaction(id)}
                            className="text-xs px-2 py-1 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </div>}
                      </>
                    ) : (
                      <>
                        {/* Edit Mode */}
                        <input
                          className="border border-strong rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                          value={editData.title ?? ""}
                          onChange={(e) =>
                            setEditData((p) => ({
                              ...p,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Title"
                        />
                        <div className="w-full gap-4 flex sm:flex-row flex-col justify-between">
                          <input
                            className="border flex-1 border-strong rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                            value={editData.amount ?? ""}
                            onChange={(e) =>
                              setEditData((p) => ({
                                ...p,
                                amount: +e.target.value,
                              }))
                            }
                            placeholder="Amount"
                            type="number"
                          />
                          <input
                            className="border border-strong flex-1 rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                            value={editData.date ?? ""}
                            onChange={(e) =>
                              setEditData((p) => ({
                                ...p,
                                date: e.target.value,
                              }))
                            }
                            placeholder="Date"
                            type="date"
                          />
                        </div>

                        

                        <select
                          className="border border-strong rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                          value={editData.category ?? ""}
                          onChange={(e) =>
                            setEditData((p) => ({
                              ...p,
                              category: e.target.value,
                            }))
                          }
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>

                        <div className="w-full gap-4 flex sm:flex-row flex-col justify-between">
                          <select
                            className="border flex-1 border-strong rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                            value={editData.type ?? ""}
                            onChange={(e) =>
                              setEditData((p) => ({
                                ...p,
                                type: e.target.value as "income" | "expense",
                              }))
                            }
                          >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                          </select>

                          <select
                            className="border flex-1 border-strong rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                            value={editData.paymentMethod ?? ""}
                            onChange={(e) =>
                              setEditData((p) => ({
                                ...p,
                                paymentMethod: e.target.value,
                              }))
                            }
                          >
                            {["Cash", "Card", "UPI", "Bank Transfer"].map(
                              (m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ),
                            )}
                          </select>
                        </div>

                        <textarea
                          className="border border-strong rounded-lg px-2.5 py-1.5 bg-surface-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500/50"
                          value={editData.note ?? ""}
                          onChange={(e) =>
                            setEditData((p) => ({ ...p, note: e.target.value }))
                          }
                          placeholder="Note (optional)"
                          rows={2}
                        />

                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handleSave(id)}
                            className="text-xs px-3 py-1 rounded-full bg-brand-subtle/80 text-brand font-semibold hover:bg-brand-subtle transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-xs px-3 py-1 rounded-full text-zinc-500 hover:bg-surface-2 font-semibold transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          },
        )}
      </section>
    </div>
  );
}

export default Transaction;
