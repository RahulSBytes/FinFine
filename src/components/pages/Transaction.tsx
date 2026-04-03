import React from 'react'
import { getIcon } from '../mini-components/getIcon'
import { transactions } from '../../constants/dummyTransactions'

function Transaction() {
  return (
    <div>
          <h3 className="mb-3">Recent Transaction</h3>
          <section className="flex gap-1.5 flex-col">
            {transactions.map(({ id, title, category, type, amount, date }) => (
              <div
                key={id}
                className="border border-strong px-4 py-2 flex-center gap-2 rounded-lg"
              >
                <div className="border border-strong w-10 aspect-square flex-center h-fit rounded-lg">
                  {getIcon(category)}
                </div>
                <div className="flex flex-col flex-1">
                  <h5 className="">{title}</h5>
                  <span className="text-body">{category}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-sm font-semibold ${type == "income" ?"text-income":"text-expense"}`}>
                    {type == "income" ? "+" : "-"} &#8377; {amount}
                  </span>
                  <span className="text-muted text-xs font-semibold">{date}</span>
                </div>
              </div>
            ))}
          </section>
      </div>
  )
}

export default Transaction