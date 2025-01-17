'use client'

import { Button } from '@/components/UI/Buttons'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/UI/Input'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

type Schema = z.infer<typeof schema>

interface AuthorizeWithPasswordProps {
  onSuccess: () => void
  setLoad: (value: boolean) => void
}

export default function AuthorizeWithPassword({
  onSuccess,
  setLoad,
}: AuthorizeWithPasswordProps) {
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: Schema) => {
    setLoad(true)
    await fetch('/api/auth/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error('Senha incorreta')
        }

        if (res.status === 403) {
          setError('Sessão expirada, faça login novamente')
          setTimeout(() => {
            router.push('/')
          }, 3000)
        }

        if (res.status === 200) {
          onSuccess()
        }
      })
      .catch((error) => {
        setError(error.message)
        setLoad(false)
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
      {error && <p className="text-rose-500 font-bold mt-2">{error}!</p>}
      <div className="mb-4" />
      <Button type="submit">Confirmar</Button>
    </form>
  )
}
