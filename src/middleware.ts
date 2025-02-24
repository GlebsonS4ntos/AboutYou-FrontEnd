import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const validRoutes = [
  '/',
  '/notfound',
  '/[id]', 
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const matchDynamicRoute = (pattern: string, path: string) => {
    if (!pattern.includes('[')) {
      return pattern === path
    }
    
    const regexPattern = pattern.replace(/\[.*?\]/g, '[^/]+')
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(path)
  }

  const isValidRoute = validRoutes.some(route => matchDynamicRoute(route, pathname))

  if (!isValidRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}