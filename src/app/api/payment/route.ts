import { NextRequest, NextResponse } from 'next/server'
import jwt from 'next-auth/jwt'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export async function POST(req: NextRequest) {
  try {
    const token = await jwt.getToken({ req })
    if (!token || !token.id) {
      return NextResponse.json({ error: 'User not allowed' }, { status: 401 })
    }
    const { id } = token

    if (!id)
      return NextResponse.json({ error: 'User not allowd' }, { status: 401 })

    const body = await req.json()

    if (!body)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )

    const transaction = {
      ...body,
      userId: id,
      createdAt: new Date().toISOString(),
    }

    const transactionRef = doc(collection(db, 'transactions'))

    await setDoc(transactionRef, transaction)

    const createdTransaction = (await getDoc(transactionRef)).data()

    return NextResponse.json(
      {
        message: 'Transaction created successfully',
        transaction: createdTransaction,
      },
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
