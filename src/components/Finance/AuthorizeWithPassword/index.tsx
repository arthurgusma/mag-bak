'use client'

import { ButtonSubmit } from '@/components/UI/Buttons'
import BasicModal from '@/components/UI/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/UI/Input'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { auth } from '@/firebaseConfig'

const schema = z.object({
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
})

type Schema = z.infer<typeof schema>

export default function AuthorizeWithPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })
  async function onSubmit(data: Schema) {
    console.log(data)
    await fetch('/api/auth/authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        alert('Transação realizada com sucesso')
      } else {
        alert('Erro ao realizar transação')
      }
    })
  }

  console.log(auth.currentUser, 'auth')

  return (
    <BasicModal title="Informe sua senha" buttonText="Realizar transação">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Senha"
          type="password"
          {...register('password', { required: 'Senha é obrigatória' })}
          error={errors.password?.message}
        />
        <ButtonSubmit>Confirmar</ButtonSubmit>
      </form>
    </BasicModal>
  )
}
