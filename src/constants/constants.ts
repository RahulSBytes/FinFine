
  export type Navs ={
    label : string,
    to : string
  }[]
  

  export const navs:Navs = [
    { label: "Transaction", to: "transactions" },
    { label: "Insights", to: "insights" },
    { label: "Add Transaction", to: "add" },
    { label: "Dashboard", to: "/" },
  ];


  export const data1 = [
    { title: "TOTAL BALANCE", amount: "24,563", conclution: "8% this month" },
    { title: "INCOME", amount: "8,563", conclution: "12% vs last month" },
    { title: "EXPENCES", amount: "32,563", conclution: "8% vs last month" },
    { title: "SAVING RATE", amount: "61%", conclution: "On track" },
  ];