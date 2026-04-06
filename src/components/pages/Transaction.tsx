import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useState } from "react";
import { X } from "lucide-react";
import { formatTransactionDate } from "../../helpers/timeformater";
import type { Transaction } from "../../constants/dummyTransactions";
import { category as categories } from "../../constants/constants";

type Filter = "all" | "income" | "expense";

function Transaction() {
  const [resultType, setResultType] = useState<Filter>("all");
  const transactions = useTransactionStore((s) => s.transactions);
  const editTransaction = useTransactionStore((s) => s.editTransaction);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Transaction>>({});

  const handleEdit = (t: Transaction) => {
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
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <h3 className="text-xl font-semibold text-zinc-700 mb-4 text-heading">
        Recent Transaction
      </h3>
      <div>
        <div className="border flex rounded-md items-center px-2 border-zinc-400 ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search through category or title"
            className="input-base bg-transparent border-0 w-full h-full "
            type="text"
          />
          <X
            size={22}
            onClick={() => setSearch("")}
            className="text-zinc-500  cursor-pointer"
          />
        </div>

        <div className="flex gap-4 mb-4 mt-3">
          {(["All", "Expense", "Income"] as const).map((el) => (
            <span
              key={el}
              onClick={() => setResultType(el.toLowerCase())}
              className={`text-body-sm px-4 py-1.5 rounded-full border transition-colors duration-200 cursor-pointer
            ${
              resultType === el.toLowerCase()
                ? "bg-brand-subtle border-brand-500 text-brand font-medium"
                : "border-default text-zinc-400 font-semibold hover:bg-surface-2"
            }`}
            >
              {el}
            </span>
          ))}
        </div>
      </div>
      <section className="flex gap-1.5 flex-col">
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
                className="border-b border-strong px-4 py-2 flex flex-col gap-2 rounded-lg"
              >
                {/* ── Main Row (unchanged) ── */}
                <div
                  className="flex-center gap-2 cursor-pointer"
                  onClick={() =>
                    !isEditing && setExpandedId(isExpanded ? null : id)
                  }
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-2 border border-default flex-center shrink-0">
                    {getIcon(category)}
                  </div>
                  <div className="flex flex-col flex-1">
                    <h5>{title}</h5>
                    <span className="text-zinc-600 text-sm">{category}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-sm font-semibold ${type === "income" ? "text-income" : "text-expense"}`}
                    >
                      {type === "income" ? "+" : "-"} &#8377; {amount}
                    </span>
                    <span className="text-muted text-xs font-semibold">
                      {formatTransactionDate(date)}
                    </span>
                  </div>
                </div>

                {/* ── Expanded Section ── */}
                {isExpanded && (
                  <div className="flex flex-col gap-2 pt-1 pl-11 text-sm">
                    {!isEditing ? (
                      <>
                        {/* View Mode */}
<div className="flex gap-2 text-zinc-500">
  <span className="font-medium text-zinc-700">Payment:</span>
  {paymentMethod}
</div>
<div className="flex gap-2 text-zinc-500">
  <span className="font-medium text-zinc-700">Note:</span>
  {note ?? "Nothing was noted"}
</div>
<div className="flex gap-3 mt-1">
  <button
    onClick={() => handleEdit({ id, title, category, type, amount, date, note, paymentMethod })}
    className="text-xs text-brand font-semibold"
  >
    Edit
  </button>
  <button
    onClick={() => deleteTransaction(id)}
    className="text-xs text-red-500 font-semibold"
  >
    Delete
  </button>
</div>
                      </>
                    ) : (
                      <>
                        {/* Edit Mode */}
                        <input
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
                          value={editData.title ?? ""}
                          onChange={(e) =>
                            setEditData((p) => ({
                              ...p,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Title"
                        />
                        <input
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
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
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
                          value={editData.date ?? ""}
                          onChange={(e) =>
                            setEditData((p) => ({ ...p, date: e.target.value }))
                          }
                          placeholder="Date"
                          type="date"
                        />

                        <select
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
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
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
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

                        <select
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
                          value={editData.paymentMethod ?? ""}
                          onChange={(e) =>
                            setEditData((p) => ({
                              ...p,
                              paymentMethod: e.target.value,
                            }))
                          }
                        >
                          {["Cash", "Card", "UPI", "Bank Transfer"].map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>

                        <textarea
                          className="border border-strong rounded px-2 py-1 bg-surface-2 text-sm"
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
                            className="text-xs text-brand font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-xs text-zinc-500 font-semibold"
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
