import type { HtmlHTMLAttributes, ReactNode } from "react";

type Props = {
    children: ReactNode;
} & HtmlHTMLAttributes<HTMLDivElement>;

function SquareShapes({ children, className }: Props) {
  return <div className={`bg-surface p-4 rounded-md ${className}`}>
    {children}
    </div>;
}

export default SquareShapes;
