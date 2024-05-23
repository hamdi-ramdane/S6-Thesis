import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const Navbar_Logo = () => {
  return (
    <Link href="/" className="flex px-2 hover:border-myprim border-[2px] border-transparent rounded duration-500">
        <Image src='/images/camel.png' alt="logo"width="30" height="30"/>
        <h1 className='text-myprim text-2xl font-bold ml-3'>Nomady</h1>
    </Link>
  )
}
