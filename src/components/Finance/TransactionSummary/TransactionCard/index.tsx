'use client'

import { ButtonText } from '@/components/UI/Buttons'
import BasicModal from '@/components/UI/Modal'
import { formartCurrencyToReal, formatIsoDate } from '@/helpers'
import TransactionDocument from '../../TransactionDocument'
import { useState } from 'react'
import { Transaction } from '@/context/TraansactionsContext/types'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TransactionCardProps extends Transaction {}

export default function TransactionCard({ ...props }: TransactionCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="w-80 mx-auto my-2 py-2 px-4 bg-white rounded-lg shadow-lg space-y-4">
        <h3 className="text-1xl font-semibold text-gray-800">
          Pagamento {props.type}
        </h3>

        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Valor:</span>{' '}
            {formartCurrencyToReal(props.amount / 100)}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Dia:</span>{' '}
            {formatIsoDate(props.createdAt)}
          </p>
          <p className="text-gray-700">
            <span className="">Nome do favorecido:</span> {props.name}
          </p>
        </div>
        <ButtonText type="button" handleClick={() => setIsOpen(true)}>
          <p className="text-black">+ detalhes</p>
        </ButtonText>
      </div>
      <BasicModal
        title=""
        open={isOpen}
        handleClose={() => setIsOpen(false)}
        handleOpen={() => setIsOpen(true)}
      >
        <TransactionDocument {...props} />
      </BasicModal>
    </>
  )
}
