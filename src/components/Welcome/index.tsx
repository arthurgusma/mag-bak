'use client'

import { UserContext } from '@/context/UserContext'
import { useContext, useEffect } from 'react'

export default function Welcome() {
  const { setUser, user } = useContext(UserContext)
  const realCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  async function getUser() {
    try {
      const res = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.status === 200) {
        const user = await res.json()
        return user
      } else {
        throw new Error('Error getting user')
      }
    } catch (error: unknown) {
      console.error('Error getting user:', error)
    }
  }

  useEffect(() => {
    if (user.displayName) return
    getUser().then((user) => {
      setUser(user)
    })
  }, [user])

  return (
    <section>
      {user && (
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl">
              Bem vindo ao Mag Bak,{' '}
              <span className="capitalize">{user.displayName}</span>
            </h1>
          </div>
          <div>
            <h1 className="text-xl">
              Saldo: {realCurrency.format(user?.balance)}
            </h1>
          </div>
        </div>
      )}
    </section>
  )
}
