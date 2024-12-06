'use client'

import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import Input from '@/components/UI/Input'
import { ButtonSubmit } from '@/components/UI/Buttons'
import { TransactionsContext } from '@/context/TraansactionsContext'
import { UserContext } from '@/context/UserContext'
// import AuthorizeWithPassword from '../AuthorizeWithPassword'

const tedSchema = z.object({
  type: z.literal('TED'),
  name: z
    .string()
    .min(3, 'Nome do favorecido deve ter pelo menos 3 caracteres'),
  cpfCnpj: z.string().regex(/\d{11}|\d{14}/, 'CPF/CNPJ inválido'),
  bank: z.string().min(3, 'Nome do banco deve ter pelo menos 3 caracteres'),
  agency: z.number().min(4, 'Agência deve ter pelo menos 4 numeros'),
  account: z.number().min(4, 'Conta deve ter pelo menos 4 numeros'),
  pixKey: z.string().optional(),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
})

const pixSchema = z.object({
  type: z.literal('PIX'),
  name: z
    .string()
    .min(3, 'Nome do favorecido deve ter pelo menos 3 caracteres'),
  cpfCnpj: z.string().regex(/\d{11}|\d{14}/, 'CPF/CNPJ inválido'),
  bank: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
  pixKey: z.string().min(6, 'Chave PIX deve ter pelo menos 6 caracteres'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
})

type TransactionSchema = z.infer<typeof tedSchema | typeof pixSchema>

export function TransactionForm() {
  const [transactionType, setTransactionType] = useState<'TED' | 'PIX'>('TED')
  const { addTransaction } = useContext(TransactionsContext)
  const { user } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionType === 'TED' ? tedSchema : pixSchema),
    reValidateMode: 'onChange',
  })

  async function onSubmit(data: TransactionSchema) {
    if (user.balance < data.amount) {
      alert('Saldo insuficiente')
      return
    }

    await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status === 201) {
        const data = await res.json()
        addTransaction(data.transaction)
      } else {
        alert('Erro ao realizar transação')
      }
    })
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
            {...register('agency', { valueAsNumber: true })}
            type="number"
            error={errors.agency?.message}
          />
          <Input
            label="Conta"
            type="number"
            {...register('account', { valueAsNumber: true })}
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
      <Input
        label="Valor a Transferir"
        type="number"
        step="0.01"
        {...register('amount', { valueAsNumber: true })}
        error={errors.amount?.message}
      />
      <ButtonSubmit>Realizar Transferência</ButtonSubmit>
      {/* <AuthorizeWithPassword /> */}
    </form>
  )
}
