import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  secretKey: process.env.CLERK_SECRET_KEY,
})

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
}