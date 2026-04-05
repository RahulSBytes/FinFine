import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useState } from "react";
import { Search } from "lucide-react";

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
    <div className="max-w-4xl sm:m-auto p-6 flex-1 border-2 overflow-y-auto border-blue-700">
      <h3 className="text-xl font-semibold text-zinc-600 mb-4">
        Recent Transaction
      </h3>
      <div>
        <div className="border flex-center px-2  border-zinc-400">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base w-full border-0 "
            type="text"
          />
          <Search size={28} />
        </div>
        <div className="flex gap-4 mb-4 mt-3">
          {(["All", "Expense", "Income"] as const).map((el) => (
            <span
              key={el}
              onClick={() => setResultType(el.toLowerCase())}
              className={`border h-fit text-sm rounded-full px-4 hover:bg-brand-100 ${
                resultType === el.toLowerCase()
                  ? "bg-brand-100 border-brand-300"
                  : "border-zinc-400 bg-zinc-300"
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
              className="border border-strong px-4 py-2 flex-center gap-2 rounded-lg"
            >
              <div className="border border-strong w-10 aspect-square flex-center h-fit rounded-lg">
                {getIcon(category)}
              </div>
              <div className="flex flex-col flex-1">
                <h5 className="">{title}</h5>
                <span className="text-body">{category}</span>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-sm font-semibold ${type == "income" ? "text-income" : "text-expense"}`}
                >
                  {type == "income" ? "+" : "-"} &#8377; {amount}
                </span>
                <span className="text-muted text-xs font-semibold">{date}</span>
              </div>
            </div>
          ),
        )}
      </section>
    </div>
  );
}

export default Transaction;
