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
    <div className="flex gap-4 flex-col px-8 mb-8">
      <h2 className="text-xl font-semibold text-zinc-600 mt-6">Insights</h2>

      <div className="grid sm:grid-cols-3 gap-2">
        {data2.map(({ title, highlight, conclution, part }) => (
          <SquareShapes className="grid gap-1" key={title}>
            <h4>{title}</h4>
            <span className="text-sm text-zinc-600">{highlight}</span>
            <p>{conclution}</p>
            <ProgressRow part={part} total={100} color={"#17B99C"} />
          </SquareShapes>
        ))}
      </div>
      <div>
        <SquareShapes>
          <h3 className="mb-2">Balance Trend</h3>
          <div className="px-3">
            {monthlySpend.map(({ month, part, amount }, idx) => (
              <div key={month} className="flex w-full items-center gap-3">
                <span className="font-semibold">{month}</span>
                <ProgressRow part={part} total={100} color={colors[idx]} />
                <span> &#8377; {amount}</span>
              </div>
            ))}
          </div>
        </SquareShapes>
      </div>
    </div>
  );
}

export default Insight;
