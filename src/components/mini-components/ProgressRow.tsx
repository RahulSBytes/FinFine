
type ProgressRowType = {
    part:number,
    total:number,
    color: string
}

function ProgressRow({ part, total, color }:ProgressRowType) {
  const percent = (part / total) * 100;
  return (
   <div className="bg-zinc-200 rounded-xl flex-1 h-fit">
  <div
    className="rounded-xl h-2"
    style={{
      width: `${percent}%`,
      backgroundColor: color,
    }}
  ></div>
</div>
  );
}

export default ProgressRow;
