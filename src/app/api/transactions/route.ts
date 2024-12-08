import { NextResponse, NextRequest } from 'next/server'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || !token.id) {
      return NextResponse.json({ error: 'User not allowed' }, { status: 401 })
    }
    const { id } = token

    if (!id)
      return NextResponse.json({ error: 'User not allowd' }, { status: 401 })

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', id),
      orderBy('createdAt', 'desc'),
    )

    const querySnapshot = await getDocs(q)

    const transactions = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    return NextResponse.json({ transactions }, { status: 200 })
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
