'use client'

import { TransactionsContext } from '@/context/TraansactionsContext'
import React, { useContext } from 'react'
import TransactionCard from './TransactionCard'

export function TransactionSummary() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <section className="flex flex-col items-center justify-center m-auto">
      <h1 className="text-xl font-bold mt-4">Histórico de transações:</h1>

      <div className="max-h-[70vh] my-10 overflow-auto w-96">
        {transactions.length < 1 ? (
          <h1 className="text-xl mx-auto">Nenhuma transação realizada</h1>
        ) : (
          transactions?.map((transaction) => {
            const { name, amount, type, createdAt } = transaction
            return (
              <TransactionCard
                key={transaction.createdAt}
                amount={amount}
                type={type}
                name={name}
                date={createdAt}
              />
            )
          })
        )}
      </div>
    </section>
  )
}