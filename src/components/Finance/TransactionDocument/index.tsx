import { Transaction } from '@/context/TraansactionsContext/types'
import { formartCurrencyToReal, formatIsoDate } from '@/helpers'
import React from 'react'
import TransactionDocumentField from './TransactionDocumentField'

export default function TransactionDocument({
  id,
  name,
  type,
  cpfCnpj,
  bank,
  agency,
  account,
  pixKey,
  amount,
  createdAt,
}: Transaction) {
  return (
    <div className="rounded-lg p-4 bg-white text-black">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Comprovante de Transferência
      </h1>
      <div className="space-y-2">
        <TransactionDocumentField label="CPF/CNPJ:" value={cpfCnpj} />
        <TransactionDocumentField label="Nome do favorecido:" value={name} />
        {type === 'TED' && (
          <>
            <TransactionDocumentField label="Banco:" value={bank || ''} />
            <TransactionDocumentField label="Agência:" value={agency || ''} />
            <TransactionDocumentField label="Conta:" value={account || ''} />
          </>
        )}
        {type === 'PIX' && (
          <TransactionDocumentField label="Chave PIX:" value={pixKey || ''} />
        )}
        <TransactionDocumentField
          label="Valor transferido:"
          value={formartCurrencyToReal(amount)}
        />
        <TransactionDocumentField
          label="Data da Transferência:"
          value={formatIsoDate(createdAt)}
        />
        <TransactionDocumentField label="ID da transação:" value={id} />
      </div>
    </div>
  )
}
