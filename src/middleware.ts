import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const privateRoutes = ['/home']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPrivate = privateRoutes.includes(path)

  const sessionCookie = (await cookies()).get(
    process.env.NEXT_PUBLIC_AMBIENT! === 'prod'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token',
  )?.value

  if (isPrivate && !sessionCookie) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}
