import { ReactNode } from 'react'

export interface Transaction {
  id: string
  userId: string
  name: string
  type: 'TED' | 'PIX'
  cpfCnpj: string
  bank?: string
  agency?: string
  account?: string
  pixKey?: string
  amount: number
  createdAt: string
}

export interface TransactionsContextData {
  transactions: Transaction[]
  addTransaction: (transaction: Transaction) => void
  setTransactions: (transactions: Transaction[]) => void
}

export interface TransactionsProviderProps {
  children: ReactNode
}
