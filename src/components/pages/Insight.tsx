import { data2 } from "../../constants/constants";
import ProgressRow from "../mini-components/ProgressRow";
import SquareShapes from "../wrapper/SquareShapes";

type MonthlySpend = {
  month: string;
  part: number;
  amount: number;
}[];

const monthlySpend: MonthlySpend = [
  { month: "Jan", part: 34, amount: 2345 },
  { month: "Feb", part: 57, amount: 3456 },
  { month: "Mar", part: 89, amount: 4325 },
  { month: "Jan", part: 18, amount: 987 },
];

const colors = ["#FA9538", "#6687FC", "#17B99C", "#FE5656"];

function Insight() {
  return (
    <div className="flex gap-4 flex-col p-4 lg:p-6 max-w-4xl min-w-3xl mx-auto">

      <h3 className="text-xl font-semibold text-zinc-700 mb-4">
        Recent Transaction
      </h3>

      <div className="grid sm:grid-cols-3 gap-3">
        {data2.map(({ title, highlight, conclution, part }) => (
          <SquareShapes className="flex flex-col gap-2" key={title}>
            <span className="text-label text-muted">{title}</span>
            <span className="text-h3 text-heading font-bold">{highlight}</span>
            <span className="text-body-sm text-muted">{conclution}</span>
            <ProgressRow part={part} total={100} color={"#17B99C"} />
          </SquareShapes>
        ))}
      </div>

      <SquareShapes>
        <h3 className="text-body-md font-semibold text-heading mb-4">
          Monthly Spending
        </h3>
        <div className="flex flex-col gap-3">
          {monthlySpend.map(({ month, part, amount }, idx) => (
            <div key={month} className="flex items-center gap-3">
              <span className="text-body-sm font-medium text-muted w-8 shrink-0">
                {month}
              </span>
              <div className="flex-1">
                <ProgressRow part={part} total={100} color={colors[idx]} />
              </div>
              <span className="text-body-sm font-semibold text-heading w-20 text-right shrink-0">
                &#8377; {amount}
              </span>
            </div>
          ))}
        </div>
      </SquareShapes>

    </div>
  );
}

export default Insight;
