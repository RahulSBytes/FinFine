import { useState } from "react";
import { category } from "../../constants/constants";
import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import type { Transaction } from "../../constants/dummyTransactions";
import toast from "react-hot-toast";

const initialTransaction: Transaction = {
  id: "",
  title: "",
  category: "",
  type: "expense",
  amount: 0,
  date: "",
  paymentMethod: "",
  note: "",
};

function AddTransaction() {
  const [trnxData, setTrnxData] = useState<Transaction>(initialTransaction);
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addTransaction({ ...trnxData, id: crypto.randomUUID() });
    // setTrnxData(initialTransaction);
    toast.success("New transaction added 😀")
  };

  const heading = "text-label mb-1 font-semibold text-zinc-600 tracking-tight";

return (
  <>
  
  <div className="flex flex-col gap-5 p-4 md:p-6 lg:px-10 max-w-4xl mx-auto">
      <h2  className="text-h2 text-heading">
        Add New Transaction
      </h2>
    <div className="bg-surface py-5 px-4 sm:px-8 ">


      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Type toggle */}
        <div className="inline-grid w-full sm:w-72 grid-cols-2 border gap-1 border-zinc-300 bg-zinc-50/70 dark:border-zinc-500 dark:bg-zinc-600/70 h-11 p-1 rounded-full">
          <div
            onClick={() =>
              setTrnxData((prev) => ({
                ...prev,
                type: "expense",
              }))
            }
            className={`flex-center cursor-pointer text-sm sm:text-[0.95rem] font-semibold border rounded-full transition-all duration-150 
            ${
              trnxData.type == "expense"
                ? "bg-brand-500 border-brand-500 text-white shadow-sm shadow-brand-500/40"
                : "border-transparent text-zinc-600 dark:text-zinc-200 hover:bg-zinc-100"
            }`}
          >
            Expence
          </div>
          <div
            onClick={() =>
              setTrnxData((prev) => ({
                ...prev,
                type: "income",
              }))
            }
            className={`flex-center cursor-pointer text-sm sm:text-[0.95rem] font-semibold border rounded-full transition-all duration-150 
            ${
              trnxData.type == "income"
                ? "bg-brand-500 border-brand-500 text-white shadow-sm shadow-brand-500/40"
                : "border-transparent text-zinc-600 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-500"
            }`}
          >
            Income
          </div>
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label htmlFor="amount" className={heading}>
            Amount
          </label>
          <input
            type="number"
            required
            id="amount"
            placeholder="0.00"
            className="input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            value={trnxData.amount}
            onChange={(e) =>
              setTrnxData((prev) => ({
                ...prev,
                amount: Number(e.target.value),
              }))
            }
          />
        </div>

        {/* Category */}
        <div>
          <h4 className={heading}>Category</h4>
          <div className="mt-2 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5 px-0 sm:px-2">
            {category.map((el, idx) => (
              <div
                key={idx}
                onClick={() =>
                  setTrnxData((prev) => ({ ...prev, category: el }))
                }
                className={`border w-full aspect-square flex-center flex-col rounded-xl gap-1 cursor-pointer 
                border-zinc-200 bg-white/90 dark:bg-zinc-800 dark:border-zinc-500
                hover:bg-brand-100/60 hover:border-brand-500/40 dark:hover:bg-brand-500/60 dark:hover:border-brand-300/40 hover:shadow-md hover:-translate-y-px
                shadow-[0_1px_0_rgba(15,23,42,0.03)]
                transition-all duration-150
                ${
                  trnxData.category === el
  ? "bg-red-500 border-red-500 text-white"
  : ""
                }`}
              >
                <span className="text-lg sm:text-xl">{getIcon(el)}</span>
                <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight px-1 text-zinc-700 dark:text-zinc-400">
                  {el}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Date + Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="date" className={heading}>
              Date
            </label>
            <input
              type="date"
              required
              className="input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              name="date"
              id="date"
              value={trnxData.date.split("T")[0]}
              onChange={(e) =>
                setTrnxData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="methods" className={heading}>
              Payment Method
            </label>
            <select
              className="input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
              id="methods"
              defaultValue={trnxData.paymentMethod}
              onChange={(e) =>
                setTrnxData((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
              required
            >
              {["Cash", "UPI", "Card", "Bank Transfer"].map((el, idx) => (
                <option value={el} key={idx}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className={heading}>
            Title
          </label>
          <input
            type="text"
            required
            id="title"
            placeholder="e.g. Salary, Restaurant..."
            className="input-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
            value={trnxData["title"]}
            onChange={(e) =>
              setTrnxData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        {/* Note */}
        <div className="flex flex-col">
          <label htmlFor="note" className={heading}>
            Note (Optional)
          </label>
          <textarea
            id="note"
            value={trnxData["note"]}
            onChange={(e) =>
              setTrnxData((prev) => ({
                ...prev,
                note: e.target.value,
              }))
            }
            placeholder="Add a short note..."
            className="input-base min-h-[80px] resize-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          ></textarea>
        </div>

        <button type="submit" className="btn-primary mt-2 self-start">
          Add Expense
        </button>
      </form>
    </div>
  </div>
  </>
);

}

export default AddTransaction;
