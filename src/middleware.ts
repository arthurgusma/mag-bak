import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { cookies } from 'next/headers'

const privateRoutes = ['/home']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPrivate = privateRoutes.includes(path)

  // Get the JWT token from the request
  const token = await getToken({ req })
  const sessionCookie = (await cookies()).get('next-auth.session-token')?.value

  console.log('Token:', token)
  console.log('Session cookie:', sessionCookie)

  // Redirect or block access if on a private route and not authenticated
  if (isPrivate && !sessionCookie) {
    return NextResponse.redirect(new URL('/', req.url)) // Redirect to login
  }

  return NextResponse.next() // Allow the request to proceed
}
