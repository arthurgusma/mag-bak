// import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
// import { getAuth } from 'firebase-admin/auth'
// import { NextRequest, NextResponse } from 'next/server'
// import jwt from 'next-auth/jwt'

// export async function POST(req: NextRequest) {
//   try {
//     const token = await jwt.getToken({ req })

//     if (token === null) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
//     const { id } = token

//     const user = await getAuth().getUser(id as string)

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }
//     const body = await req.json() // Parse the JSON body

//     const { email } = token
//     const { password } = body

//     if (!password || !email) {
//       return NextResponse.json(
//         {
//           error: 'Email and password are required',
//         },
//         { status: 400 },
//       )
//     }

//     const credential = EmailAuthProvider.credential(email, password)
//     await reauthenticateWithCredential(user, credential)

//     return NextResponse.json({ message: 'Reauthentication successful' })
//   } catch (error) {
//     console.error('Error reauthenticating user:', error)
//     return NextResponse.json({ error: 'Server error' }, { status: 500 })
//   }
// }
