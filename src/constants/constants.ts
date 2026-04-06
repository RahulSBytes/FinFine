
import { LayoutDashboard, ArrowLeftRight, Lightbulb, PlusCircle, type LucideIcon } from "lucide-react";


  export type Navs ={
    label : string,
    to : string,
    icon : LucideIcon
  }[]


  export type Data1 ={
    title: string, amount: number | string, conclution: string
  }[]

  export type Data2 ={
    title: string, highlight: number | string, conclution: string, part:number
  }[]
  

  export const category = [
    "Food",
    "Transport",
    "Shopping",
    "Utilities",
    "Entertainment",
    "Health",
    "Salary",
    "Other",
  ];


 // constants.ts

export const navs: Navs = [
  { label: "Dashboard",       to: "/",            icon: LayoutDashboard },
  { label: "Transaction",     to: "transactions", icon: ArrowLeftRight },
  { label: "Insights",        to: "insights",     icon: Lightbulb },
  { label: "Add Transaction", to: "add",          icon: PlusCircle },
];





