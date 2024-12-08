import { Transaction } from '@/context/TraansactionsContext/types'
import { formartCurrencyToReal, formatIsoDate } from '@/helpers'
import React from 'react'

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
        <div>
            <h1 className="font-semibold">CPF/CNPJ:</h1>
            <p>{cpfCnpj}</p>
        </div>
        <div>
            <h1 className="font-semibold">Nome do favorecido:</h1>
            <p>{name}</p>
        </div>

        {type === 'TED' && (
          <>
            <div>
                <h1 className="font-semibold">Banco:</h1>
                <p>{bank}</p>
            </div>

            <div>
                <h1 className="font-semibold">Agência:</h1>
                <p>{agency}</p>
            </div>

            <div>
                <h1 className="font-semibold">Conta:</h1>
                <p>{account}</p>
            </div>
          </>
        )}

        {type === 'PIX' && (
          <div>
            <h1 className="font-semibold">Chave PIX:</h1>
            <p>{pixKey}</p>
          </div>
        )}

        <div>
            <h1 className="font-semibold">Valor transferido:</h1>
            <p>{formartCurrencyToReal(amount)}</p>
        </div>

        <div>
            <h1 className="font-semibold">Data da Transferência:</h1>
            <p>{formatIsoDate(createdAt)}</p>
        </div>
        <div>
            <h1 className="font-semibold">ID da transação:</h1>
            <p>{id}</p>
        </div>
      </div>
    </div>
  )
}
