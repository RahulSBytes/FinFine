
type ProgressRowType = {
    percentage:number,
    color: string
}

function ProgressRow({ percentage, color }:ProgressRowType) {
  return (
   <div className="bg-zinc-200 rounded-xl flex-1 h-fit">
  <div
    className="rounded-xl h-2"
    style={{
      width: `${percentage}%`,
      backgroundColor: color,
    }}
  ></div>
</div>
  );
}

export default ProgressRow;
