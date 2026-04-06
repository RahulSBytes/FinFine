// import { data2 } from "../../constants/constants";
import type { Data2 } from "../../constants/constants";
import { useFinancialSummary } from "../../hook/useFinancialSummary";
import ProgressRow from "../mini-components/ProgressRow";
import SquareShapes from "../wrapper/SquareShapes";


const colors = ["#FA9538", "#6687FC", "#17B99C", "#FE5656"];

function Insight() {
  const { monthlySpending, topCategory, avgDailySpend, savingAmount } =
    useFinancialSummary();

  const data2: Data2 = [
    {
      title: "Top Spending Category",
      highlight: topCategory,
      conclution: "8% this month",
      part: 20,
    },
    {
      title: "Avg Daily Spend",
      highlight: avgDailySpend,
      conclution: "12% vs last month",
      part: 45,
    },
    {
      title: "Saving This Month",
      highlight: savingAmount,
      conclution: "8% vs last month",
      part: 80,
    },
  ];


  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      {/* Header */}
      <h2 className="text-h2 text-heading">Insights</h2>

      <div className="grid sm:grid-cols-3 gap-3">
        {data2.map(({ title, highlight, conclution, part }) => (
          <SquareShapes className="flex flex-col gap-2" key={title}>
            <span className="text-label text-body">{title}</span>
            <span className="text-h3 text-heading font-bold">{highlight}</span>
            <span className="text-body-sm text-body">{conclution}</span>
            <ProgressRow percentage={part} color={"#17B99C"} />
          </SquareShapes>
        ))}
      </div>

      {/* Monthly Spending */}
      <SquareShapes>
        <h3 className="text-body-md font-semibold text-heading mb-4">
          Monthly Spending
        </h3>
        <div className="flex flex-col gap-3">
          {monthlySpending.map(({ month, percentage, total }, idx) => (
            <div key={month} className="flex items-center gap-3">
              <span className="font-medium text-body-sm w-8 shrink-0">
                {month}
              </span>
              <div className="flex-1">
                <ProgressRow percentage={percentage} color={colors[idx]} />
              </div>
              <span className="text-body-sm font-semibold  w-20 text-right shrink-0">
                &#8377; {total}
              </span>
            </div>
          ))}
        </div>
      </SquareShapes>
    </div>
  );
}

export default Insight;
