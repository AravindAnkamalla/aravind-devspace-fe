'use client'

import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <ul className="flex gap-4 items-center">
        <Link href="/">Home</Link>
        <Link href="/my-projects">Projects</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/edit-profile">Edit Profile</Link>
        <SignedIn><UserButton /></SignedIn>
        <SignedOut><SignInButton /></SignedOut>
      </ul>
    </nav>
  )
}
