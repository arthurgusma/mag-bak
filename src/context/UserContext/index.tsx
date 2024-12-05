'use client'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { User, UserContextType } from './types'

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
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
          setUser(user)
        } else {
          throw new Error('Error getting user')
        }
      } catch (error: unknown) {
        console.error('Error getting user:', error)
      }
    }
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
