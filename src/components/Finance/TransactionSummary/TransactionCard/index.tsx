import { formartCurrencyToReal, formatIsoDate } from '@/helpers'

interface TransactionCardProps {
  type: 'TED' | 'PIX'
  amount: number
  date: string
  name: string
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  amount,
  date,
  name,
}) => {
  return (
    <div className="w-80 mx-auto my-2 py-2 px-4 bg-white rounded-lg shadow-lg space-y-4">
      <h3 className="text-1xl font-semibold text-gray-800">Pagamento {type}</h3>

      <div className="space-y-2">
        <p className=" text-gray-700">
          <span className="font-medium">Valor:</span>{' '}
          {formartCurrencyToReal(amount)}
        </p>
        <p className=" text-gray-700">
          <span className="font-medium">Dia:</span> {formatIsoDate(date)}
        </p>
        <p className=" text-gray-700">
          <span className="">Nome do favorecido:</span> {name}
        </p>
      </div>
    </div>
  )
}

export default TransactionCard
