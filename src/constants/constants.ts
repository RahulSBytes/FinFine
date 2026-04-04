
  export type Navs ={
    label : string,
    to : string
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


  export const navs:Navs = [
    { label: "Transaction", to: "transactions" },
    { label: "Insights", to: "insights" },
    { label: "Add Transaction", to: "add" },
    { label: "Dashboard", to: "/" },
  ];


  export const data1:Data1 = [
    { title: "TOTAL BALANCE", amount: 24563, conclution: "8% this month" },
    { title: "INCOME", amount: 8563, conclution: "12% vs last month" },
    { title: "EXPENCES", amount: 32563, conclution: "8% vs last month" },
    { title: "SAVING RATE", amount: "61%", conclution: "On track" },
  ];

  export const data2:Data2 = [
    { title: "Top Spending Category", highlight: "Food", conclution: "8% this month", part: 20},
    { title: "Avg Daily Spend", highlight: 8563, conclution: "12% vs last month", part: 45 },
    { title: "Saving This Month", highlight: 32563, conclution: "8% vs last month", part: 80 },
  ];