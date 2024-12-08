interface TransactionDocumentFieldProps {
  label: string
  value: string
}

export default function TransactionDocumentField({
  label,
  value,
}: TransactionDocumentFieldProps) {
  return (
    <div>
      <h1 className="font-semibold">{label}:</h1>
      <p>{value}</p>
    </div>
  )
}
