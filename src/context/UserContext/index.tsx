'use client'
import React, { createContext, ReactNode, useState } from 'react'
import { User, UserContextType } from './types'

export const UserContext = createContext<UserContextType>({} as UserContextType)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({} as User)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
