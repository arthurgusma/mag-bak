import { NextResponse } from 'next/server'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/firebaseConfig'
import { FirebaseError } from 'firebase/app'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )

    const { user } = await createUserWithEmailAndPassword(
      auth,
      body.email,
      body.password,
    )

    const userRef = doc(db, 'users', user.uid)
    await setDoc(userRef, {
      name: `${body.name} ${body.lastName}`,
      email: user.email,
      balance: 1000000,
      createdAt: new Date().toISOString(),
      uid: user.uid,
    })

    return NextResponse.json(
      { message: 'User created successfully', uid: user.uid },
      { status: 201 },
    )
  } catch (error: unknown) {
    console.error('Error creating user:', error)
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        return NextResponse.json(
          { error: 'Email já cadastrado, entre com email e senha' },
          { status: 403 },
        )
      }
    }
    throw new Error('Um erro inexperado aconteceu, tente mais tarde.')
  }
}
