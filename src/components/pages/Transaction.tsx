import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useState } from "react";

function Transaction() {
  const transactions = useTransactionStore((s) => s.transactions);
  const [resultType,setResultType] = useState("All");

  return (
    <div className="max-w-4xl sm:m-auto p-6 flex-1 border-2 overflow-y-auto border-blue-700">
      <h3 className="text-xl font-semibold text-zinc-600 mb-4">
        Recent Transaction
      </h3>
      <div>
        <input
          className="input-base w-full border bg-zinc-200 border-zinc-400"
          type="text"
          name=""
          id=""
        />
        <div className="flex gap-4 mb-4 mt-3">
          {["All", "Expance", "Income"].map((el) => (
            <span onClick={()=>setResultType(el)} className={`border  h-fit text-sm  rounded-full px-4 hover:bg-brand-100 ${resultType==el?"bg-brand-100 border-brand-300":"border-zinc-400 bg-zinc-300"}`}>
              {el}
            </span>
          ))}
        </div>
      </div>
      <section className="flex gap-1.5 flex-col ">
        {transactions.map(({ id, title, category, type, amount, date }) => (
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
        ))}
      </section>
    </div>
  );
}

export default Transaction;
