import { NextResponse } from 'next/server'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/firebaseConfig'

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
      balance: 10000,
      createdAt: new Date().toISOString(),
      uid: user.uid,
    })

    return NextResponse.json(
      { message: 'User created successfully', uid: user.uid },
      { status: 201 },
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
