import z from 'zod'

export const tedSchema = z.object({
  type: z.literal('TED'),
  name: z
    .string()
    .min(3, 'Nome do favorecido deve ter pelo menos 3 caracteres'),
  cpfCnpj: z.string().regex(/\d{11}|\d{14}/, 'CPF/CNPJ inválido'),
  bank: z.string().min(3, 'Nome do banco deve ter pelo menos 3 caracteres'),
  agency: z.number().min(4, 'Agência deve ter pelo menos 4 numeros'),
  account: z.number().min(4, 'Conta deve ter pelo menos 4 numeros'),
  pixKey: z.string().optional(),
  amount: z.string().min(0.01, 'Valor deve ser maior que zero'),
})

export const pixSchema = z.object({
  type: z.literal('PIX'),
  name: z
    .string()
    .min(3, 'Nome do favorecido deve ter pelo menos 3 caracteres'),
  cpfCnpj: z.string().regex(/\d{11}|\d{14}/, 'CPF/CNPJ inválido'),
  bank: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
  pixKey: z.string().min(6, 'Chave PIX deve ter pelo menos 6 caracteres'),
  amount: z.string().min(0.01, 'Valor deve ser maior que zero'),
})
