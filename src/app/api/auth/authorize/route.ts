import { auth } from '@/firebaseConfig'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token || !token.id) {
      return NextResponse.json({ error: 'User not allowed' }, { status: 403 })
    }
    const { email } = token

    const body = await req.json()
    const { password } = body
    if (!password || !email) {
      return NextResponse.json(
        {
          error: 'Email and password are required',
        },
        { status: 400 },
      )
    }
    await signInWithEmailAndPassword(auth, email, password)

    return NextResponse.json({ message: 'Reauthentication successful' })
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/invalid-credential') {
        return NextResponse.json(
          {
            error: 'Invalid credentials',
          },
          { status: 401 },
        )
      }
    }
    throw new Error('Um erro inexperado aconteceu, tente mais tarde.')
  }
}
