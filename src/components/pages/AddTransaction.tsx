import { category } from "../../constants/constants";
import { getIcon } from "../mini-components/getIcon";

function AddTransaction() {
  function handleSubmit() {}

  const heading = "text-label font-semibold text-zinc-600";

  return (
    <div className="border  bg-white/10 backdrop-blur-sm flex-center flex-col ">
      <div className="bg-surface border py-4  px-8">
        <h2 className="text-xl font-semibold text-zinc-600 mb-4">Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
          <div className="grid grid-cols-2 border border-zinc-400 h-10 p-1 rounded-sm">
            <div className="flex-center font-semibold border border-brand-500 rounded-sm bg-brand-500 text-white">
              Expence
            </div>
            <div className="flex-center font-semibold">Income</div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className={heading}>
              Amount
            </label>
            <input type="number" name="" id="" placeholder="0.00" className="input-base" />
          </div>
          <div>
            <h4 className={heading}>Category</h4>
            <div className="grid grid-cols-4 sm:flex flex-wrap mt-1.5 px-4 gap-2">
              {category.map((el, idx) => (
                <div
                  key={idx}
                  className="border border-zinc-400   hover:border-brand-500/60 w-24 aspect-square flex-center flex-col rounded-md gap-1 hover:bg-brand-100"
                >
                  <div>{getIcon(el)}</div>
                  <div className="text-xs font-semibold">{el}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2  gap-2">
            <div className="">
              <label htmlFor="" className={heading}>
                Date
              </label>
              <input type="date" className="input-base" name="" id="" />
            </div>
            <div className="">
              <label htmlFor="" className={heading}>
                Payment Method
              </label>
              <select className="input-base">
                {["Card", "Cash", "UPI", "Bank Transfer"].map((el) => (
                  <option value={el} className="">{el}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className={heading}>
              Title
            </label>
            <input type="text" name="" id="" placeholder="e.g. Salary, Restaurant..." className="input-base" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className={heading}>
              Note (Optional)
            </label>
            <textarea name="" id="" placeholder="Add a short note..." className="input-base"></textarea>
          </div>
          <button type="submit" className="btn-primary">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default AddTransaction;
