'use client'

import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Session } from "next-auth"

export default function NavbarClient({ session }: { session: Session | null }) {
  const pathname = usePathname()

  return (
    <div className='flex items-center gap-5'>
      {session && session.user ? (
        <>
          <Link href="/startup/create">
            <Button variant={pathname === "/" ? "default" : "outline"}>Create</Button>
          </Link>

          <button onClick={() => signOut({redirectTo:"/"})} className='text-sm text-gray-500 hover:text-gray-800'>
            Logout
          </button>

          <Link href="/profile" className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={session.user.image || undefined} alt="User" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </Link>
        </>
      ) : (
        <Button variant="link" onClick={() => signIn('google')}>Login</Button>
      )}
    </div>
  )
}
