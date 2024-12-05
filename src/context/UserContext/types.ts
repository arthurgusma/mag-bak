import { Dispatch } from 'react'

export type User = {
  uid: string
  displayName: string
  email: string
  balance: number
}

export type UserContextType = {
  user: User
  setUser: Dispatch<React.SetStateAction<User>>
}
