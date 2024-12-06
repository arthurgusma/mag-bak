export const { format: formartCurrencyToReal } = new Intl.NumberFormat(
  'pt-BR',
  {
    style: 'currency',
    currency: 'BRL',
  },
)

export function formatIsoDate(isoDate: string) {
  const date = new Date(isoDate)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} às ${hours}:${minutes}`
}

export function convertCurrencyToNumber(formattedValue: string): number {
  const cleanedValue = formattedValue
    .replace('R$', '')
    .replace(/\s/g, '')
    .replace('.', '')
    .replace(',', '.')

  const numericValue = parseFloat(cleanedValue)

  return isNaN(numericValue) ? 0 : Math.round(numericValue * 100)
}
