import { NextResponse, NextRequest } from 'next/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import jwt from 'next-auth/jwt'

export async function GET(req: NextRequest) {
  try {
    const token = await jwt.getToken({ req })
    if (!token || !token.id) {
      return NextResponse.json({ error: 'User not allowed' }, { status: 401 })
    }
    const { id } = token

    if (!id)
      return NextResponse.json({ error: 'User not allowd' }, { status: 401 })

    const q = query(collection(db, 'users'), where('uid', '==', id))

    const querySnapshot = await getDocs(q)

    const user = querySnapshot.docs[0].data()

    return NextResponse.json(
      {
        displayName: user.name,
        email: user.email,
        balance: user.balance,
        id: user.uid,
      },
      { status: 200 },
    )
  } catch (error: unknown) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        code: 500,
      },
      { status: 500 },
    )
  }
}
