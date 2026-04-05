import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useState } from "react";
import { X } from "lucide-react";
import { formatTransactionDate } from "../../helpers/timeformater";

type Filter = "all" | "income" | "expense";

function Transaction() {
  const [resultType, setResultType] = useState<Filter>("all");
  const transactions = useTransactionStore((s) => s.transactions);
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((trnx) => {
    const matchesType = resultType === "all" || trnx.type === resultType;

    const matchesSearch =
      search === "" ||
      trnx.title.toLowerCase().includes(search.toLowerCase()) ||
      trnx.category.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6 bg-white">
      <h3 className="text-xl font-semibold text-zinc-700 mb-4">
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
      <section className="flex gap-1.5 flex-col ">
        {filteredTransactions.map(
          ({ id, title, category, type, amount, date }) => (
            <div
              key={id}
              className="border-b border-strong  px-4 py-2 flex-center gap-2 rounded-lg"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-2 border border-default flex-center shrink-0">
                {getIcon(category)}
              </div>
              <div className="flex flex-col flex-1">
                <h5 className="">{title}</h5>
                <span className="text-zinc-600 text-sm">{category}</span>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-sm font-semibold ${type == "income" ? "text-income" : "text-expense"}`}
                >
                  {type == "income" ? "+" : "-"} &#8377; {amount}
                </span>
                <span className="text-muted text-xs font-semibold">
                  {formatTransactionDate(date)}
                </span>
              </div>
            </div>
          ),
        )}
      </section>
    </div>
  );
}

export default Transaction;
