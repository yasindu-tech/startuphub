import React from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import NavbarClient from './NavbarClient'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          StartupHub<span className="text-emerald-400 text-xl">™</span>
        </Link>

        <NavbarClient session={session} />
      </div>
    </header>
  )
}

export default Navbar
