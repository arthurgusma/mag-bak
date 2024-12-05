'use client'

import React, { createContext, useEffect, useState } from 'react'
import {
  Transaction,
  TransactionsContextData,
  TransactionsProviderProps,
} from './types'

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
)

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [transaction, ...prevTransactions])
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.status === 200) {
          const { transactions } = await res.json()

          return setTransactions([...transactions])
        } else {
          throw new Error('Error getting transactions')
        }
      } catch (error: unknown) {
        console.error('Error getting transactions:', error)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, setTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
