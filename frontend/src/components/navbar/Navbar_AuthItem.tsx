'use client'
import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { KeyRound, ScanEye } from 'lucide-react'
import { Separator } from '../ui/separator'
import { usePathname } from 'next/navigation'

export const Navbar_AuthItem = () => {
  const pathname = usePathname()

  return (
    <>
        <Link href="/login">
            <Button className={(pathname.startsWith("/login") ? "my-active-link": "")+" bg-white text-black"}>
                Login
                <KeyRound className='pl-1'/>
            </Button>
           
        </Link>
        <Link href="/register">
            <Button className={(pathname.startsWith("/register") ? "my-active-link": "")+" bg-white text-black"}>
                Register
                <ScanEye className='pl-1'/>
            </Button>
        </Link>
    </>

  )
}
