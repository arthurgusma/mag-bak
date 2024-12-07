'use client'

import { Button } from '@/components/UI/Buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/UI/Input'

import { useForm } from 'react-hook-form'
import z from 'zod'

const schema = z.object({
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

type Schema = z.infer<typeof schema>

interface AuthorizeWithPasswordProps {
  onSuccess: () => void
}

export default function AuthorizeWithPassword({
  onSuccess,
}: AuthorizeWithPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: Schema) => {
    await fetch('/api/auth/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        alert('Transação realizada com sucesso')
        onSuccess()
      } else {
        alert('Erro ao realizar transação')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Senha"
        type="password"
        {...register('password', { required: 'Senha é obrigatória' })}
        error={errors.password?.message}
      />
      <div className="mb-4" />
      <Button type="submit">Confirmar</Button>
    </form>
  )
}
