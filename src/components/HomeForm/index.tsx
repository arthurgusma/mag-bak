'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import SignUp from './signup'
import Input from '@/components/UI/Input'
import SwitchForm from '../SwitchForm'
import { signIn } from 'next-auth/react'
import { Button } from '../UI/Buttons'

const schema = z.object({
  email: z.string().email({ message: 'informe um email valido' }),
  password: z.string().min(8, { message: 'a senha deve conter 8 caracteres' }),
})

type LogInFormData = z.infer<typeof schema>

export default function HomeForm() {
  const [isSignUp, setIsSignUp] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormData>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  async function onSubmit(data: LogInFormData) {
    try {
      signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/home',
      })
    } catch (error: unknown) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <>
      {!isSignUp ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
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

            <div className="flex justify-center py-4">
              <Button type="submit">Entrar</Button>
            </div>
          </form>
          <SwitchForm
            setisSignUp={setIsSignUp}
            isSignUp={isSignUp}
            buttonLabel="Criar Conta"
            description="Não tem uma conta ainda?"
          />
        </>
      ) : (
        <SignUp setisSignUp={setIsSignUp} isSignUp={isSignUp} />
      )}
    </>
  )
}
