'use client'

import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import Input from '@/components/UI/Input'
import { ButtonSubmit } from '@/components/UI/Buttons'
import { TransactionsContext } from '@/context/TraansactionsContext'
import { UserContext } from '@/context/UserContext'
import { convertCurrencyToNumber, formartCurrencyToReal } from '@/helpers'
import { pixSchema, tedSchema } from './helper'
// import AuthorizeWithPassword from '../AuthorizeWithPassword'

export type TransactionSchema = z.infer<typeof pixSchema | typeof tedSchema>

interface TransactionFormProps {
  handleClose: () => void
}

export function TransactionForm({ handleClose }: TransactionFormProps) {
  const [transactionType, setTransactionType] = useState<'TED' | 'PIX'>('TED')
  const { addTransaction } = useContext(TransactionsContext)
  const { user, setUser } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionType === 'TED' ? tedSchema : pixSchema),
    reValidateMode: 'onChange',
  })

  async function onSubmit(data: TransactionSchema) {
    if (user.balance < convertCurrencyToNumber(data.amount)) {
      alert('Saldo insuficiente')
      return
    }

    await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        amount: convertCurrencyToNumber(data.amount),
        updatedAmount: user.balance - convertCurrencyToNumber(data.amount),
      }),
    }).then(async (res) => {
      if (res.status === 201) {
        const data = await res.json()
        addTransaction(data.transaction)
        setUser((prev) => ({
          ...prev,
          balance: data.transaction.updatedAmount,
        }))
        handleClose()
      } else {
        alert('Erro ao realizar transação')
      }
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '')
    let numericValue = parseFloat(rawValue) / 100

    if (isNaN(numericValue)) numericValue = 0

    const formattedValue = formartCurrencyToReal(numericValue)
    setValue('amount', formattedValue)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="flex mt-2">
        <div className="mr-4">
          <label htmlFor="ted" className="mr-2">
            TED
          </label>
          <input
            type="radio"
            id="ted"
            value="TED"
            {...register('type')}
            checked={transactionType === 'TED'}
            onChange={() => setTransactionType('TED')}
          />
        </div>
        <div>
          <label htmlFor="pix" className="mr-2">
            PIX
          </label>
          <input
            type="radio"
            id="pix"
            value="PIX"
            {...register('type')}
            checked={transactionType === 'PIX'}
            onChange={() => setTransactionType('PIX')}
          />
        </div>
        <div className="flex justify-end w-full">
          <h1 className="relative">
            Saldo disponivel:
            <span className="absolute bottom-0 right-0">
              {formartCurrencyToReal(user.balance / 100)}
            </span>
          </h1>
        </div>
      </div>
      <Input
        label="Nome do Favorecido"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="CPF/CNPJ"
        {...register('cpfCnpj')}
        error={errors.cpfCnpj?.message}
        placeholder="ex: 000.000.000-00"
      />
      {transactionType === 'TED' && (
        <>
          <Input
            label="Banco"
            {...register('bank')}
            error={errors.bank?.message}
          />
          <Input
            label="Agência"
            {...register('agency')}
            type="text"
            error={errors.agency?.message}
          />
          <Input
            label="Conta"
            type="text"
            {...register('account')}
            error={errors.account?.message}
          />
        </>
      )}
      {transactionType === 'PIX' && (
        <Input
          label="Chave PIX"
          {...register('pixKey')}
          error={errors.pixKey?.message}
        />
      )}
      <div className="relative">
        <Input
          label="Valor a Transferir"
          type="text"
          {...register('amount')}
          error={errors.amount?.message}
          onChange={handleAmountChange}
        />
        {/* <div className="absolute top-6 bg-white left-2 flex items-center justify-end text-gray-500">
          <span>{formattedAmount}</span>
        </div> */}
      </div>
      <ButtonSubmit>Realizar Transferência</ButtonSubmit>
      {/* <AuthorizeWithPassword /> */}
    </form>
  )
}
