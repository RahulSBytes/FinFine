import SquareShapes from "../wrapper/SquareShapes";
import { transactions } from "../../constants/dummyTransactions";
import { getIcon } from "../mini-components/getIcon";
import { data1 } from "../../constants/constants";
import BalanceChart from "../mini-components/BalanceChart";
import SpendingChart from "../mini-components/SpendingChart";

function Dashboard() {
  return (
    <div className="flex-1 flex-col p-4">
      <div className="grid grid-cols-2 gap-2">
        {data1.map(({ title, amount, conclution }) => (
          <SquareShapes className="">
            <h4>{title}</h4>
            <span>{amount}</span>
            <p>{conclution}</p>
          </SquareShapes>
        ))}
      </div>
      <div className="flex gap-3 flex-col my-3">
        <SquareShapes>
          <h3 className="mb-2">Balance Trend</h3>
          <div className="">
            <BalanceChart />
          </div>
        </SquareShapes>
        <SquareShapes>
          <h3 className="mb-2">Spending Breadown</h3>
          <div className="">
            <SpendingChart />
          </div>
        </SquareShapes>
      </div>

      <div>
        <SquareShapes className="">
          <h3 className="mb-3">Recent Transaction</h3>
          <section className="flex gap-1.5 flex-col">
            {transactions
              .slice(0, 3)
              .map(({ id, title, category, type, amount, date }) => (
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
                    <span className="text-muted text-xs font-semibold">
                      {date}
                    </span>
                  </div>
                </div>
              ))}
          </section>
        </SquareShapes>
      </div>
    </div>
  );
}

export default Dashboard;
