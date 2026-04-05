import SquareShapes from "../wrapper/SquareShapes";
import { getIcon } from "../mini-components/getIcon";
import { data1 } from "../../constants/constants";
import BalanceChart from "../mini-components/BalanceChart";
import SpendingChart from "../mini-components/SpendingChart";
import { useTransactionStore } from "../../store/useTransactionStore";

function Dashboard() {

  const transactions = useTransactionStore((s) => s.transactions);

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {data1.map(({ title, amount, conclution }) => (
          <SquareShapes key={title} className="flex flex-col gap-1 w-full">
            <span className="text-label text-muted">{title}</span>
            <span className="text-h2 text-heading font-bold">{amount}</span>
            <span className="text-body-sm text-muted">{conclution}</span>
          </SquareShapes>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SquareShapes>
          <h3 className="text-body-md font-semibold text-heading mb-4">
            Balance Trend
          </h3>
          <BalanceChart />
        </SquareShapes>

        <SquareShapes>
          <h3 className="text-body-md font-semibold text-heading mb-4">
            Spending Breakdown
          </h3>
          <SpendingChart />
        </SquareShapes>
      </div>

      <SquareShapes>
        <div className="flex-between mb-4">
          <h3 className="text-body-md font-semibold text-heading">
            Recent Transactions
          </h3>
          <button className="text-body-sm text-brand hover:underline">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {transactions
            .slice(0, 5)
            .map(({ id, title, category, type, amount, date }) => (
              <div
                key={id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-2 transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-surface-2 border border-default flex-center shrink-0">
                  <span className="text-base">{getIcon(category)}</span>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-body-sm font-medium text-heading truncate">
                    {title}
                  </span>
                  <span className="text-body-sm text-muted">{category}</span>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span
                    className={`text-body-sm font-semibold ${type === "income" ? "text-income" : "text-expense"}`}
                  >
                    {type === "income" ? "+" : "-"}${amount}
                  </span>
                  <span className="text-body-sm text-muted">{date}</span>
                </div>
              </div>
            ))}
        </div>
      </SquareShapes>
    </div>
  );
}

export default Dashboard;
