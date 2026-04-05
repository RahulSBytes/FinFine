import { useState } from "react";
import { category } from "../../constants/constants";
import { getIcon } from "../mini-components/getIcon";
import { useTransactionStore } from "../../store/useTransactionStore";
import type { Transaction } from "../../constants/dummyTransactions";

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
    addTransaction({ ...trnxData, id: crypto.randomUUID() });
    setTrnxData(initialTransaction);
  };

  const heading = "text-label font-semibold text-zinc-600";

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="bg-surface border py-4  px-8">
        <h2 className="text-xl font-semibold text-zinc-600 mb-4">
          Add New Transaction
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
          <div className="grid grid-cols-2 border border-zinc-400 h-10 p-1 rounded-sm">
            <div
              onClick={() =>
                setTrnxData((prev) => ({
                  ...prev,
                  type: "expense",
                }))
              }
              className={`flex-center cursor-pointer font-semibold border  rounded-sm ${trnxData.type == "expense" ? "bg-brand-500 border-brand-500 text-white" : ""}`}
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
              className={`flex-center cursor-pointer font-semibold border  rounded-sm ${trnxData.type == "income" ? "bg-brand-500 border-brand-500 text-white" : ""}`}
            >
              Income
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className={heading}>
              Amount
            </label>
            <input
              type="number"
              required
              id="amount"
              placeholder="0.00"
              className="input-base"
              value={trnxData.amount}
              onChange={(e) =>
                setTrnxData((prev) => ({
                  ...prev,
                  amount: Number(e.target.value),
                }))
              }
            />
          </div>
          <div>
            <h4 className={heading}>Category</h4>
            <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 mt-1.5 px-0 sm:px-4 gap-2">
              {category.map((el, idx) => (
                <div
                  key={idx}
                  onClick={() =>
                    setTrnxData((prev) => ({ ...prev, category: el }))
                  }
                  className={`border border-zinc-400 w-full aspect-square flex-center flex-col  rounded-md gap-1 cursor-pointer
          hover:bg-brand-100 hover:border-brand-500/20 transition-colors duration-150
          ${trnxData.category === el ? "bg-brand-100 border-brand-500/60" : ""}`}
                >
                  <span className="text-lg sm:text-xl">{getIcon(el)}</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight px-1">
                    {el}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div >
              <label htmlFor="date" className={heading}>
                Date
              </label>
              <input
                type="date"
                required
                className="input-base"
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
            <div >
              <label htmlFor="methods" className={heading}>
                Payment Method
              </label>
              <select
                className="input-base"
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
          <div className="flex flex-col">
            <label htmlFor="title" className={heading}>
              Title
            </label>
            <input
              type="text"
              required
              id="title"
              placeholder="e.g. Salary, Restaurant..."
              className="input-base"
              value={trnxData["title"]}
              onChange={(e) =>
                setTrnxData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="note" className={heading}>
              Note (Optional)
            </label>
            <textarea
              name=""
              id="note"
              value={trnxData["note"]}
              onChange={(e) =>
                setTrnxData((prev) => ({
                  ...prev,
                  note: e.target.value,
                }))
              }
              placeholder="Add a short note..."
              className="input-base"
            ></textarea>
          </div>
          <button type="submit" className="btn-primary">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
