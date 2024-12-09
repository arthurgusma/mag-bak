'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import SwitchForm from '../SwitchForm'
import Input from '../UI/Input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../UI/Buttons'
import { signIn } from 'next-auth/react'
import LoadingSpinner from '../UI/LoadingSpinner'

const schema = z
  .object({
    name: z.string().trim().min(2, { message: 'informe seu nome' }),
    lastName: z.string().trim().min(2, { message: 'informe seu sobrenome' }),
    email: z.string().email({ message: 'informe um email valido' }),
    password: z
      .string()
      .min(8, { message: 'a senha deve conter 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'a senha deve conter 8 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'a senha deve ser igual a informada',
    path: ['confirmPassword'],
  })

type SigUpFormData = z.infer<typeof schema>

interface SignInProps {
  setisSignUp: Dispatch<SetStateAction<boolean>>
  isSignUp: boolean
}

export default function SignUp({ setisSignUp, isSignUp }: SignInProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigUpFormData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  async function onSubmit(data: SigUpFormData) {
    setLoading(true)
    await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 403) {
          throw new Error('Email já cadastrado, entre com email e senha.')
        }
        if (res.status === 201) {
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/home',
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid">
      <Input
        {...register('name')}
        type="text"
        label="Nome"
        error={errors.name?.message}
      />
      <Input
        {...register('lastName')}
        type="text"
        label="Sobrenome"
        error={errors.lastName?.message}
      />
      <Input
        {...register('email')}
        type="email"
        label="Email"
        error={errors.email?.message}
      />
      <Input
        {...register('password')}
        type="password"
        label="Senha"
        error={errors.password?.message}
      />
      <Input
        {...register('confirmPassword')}
        type="password"
        label="Confirme a senha"
        error={errors.confirmPassword?.message}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center py-4">
        <Button type="submit">
          {loading ? <LoadingSpinner /> : 'Criar conta'}
        </Button>
      </div>
      <SwitchForm
        setisSignUp={setisSignUp}
        isSignUp={isSignUp}
        buttonLabel="Entrar"
        description="ja tem uma conta?"
      />
    </form>
  )
}
