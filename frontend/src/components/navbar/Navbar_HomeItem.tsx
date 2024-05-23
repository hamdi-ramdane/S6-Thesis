import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'

export const Navbar_HomeItem = () => {
    const pathname = usePathname()
    const isActive = pathname == "/"
    return (
        <Link href="/">
            <Button className={isActive ? "my-active-link":""}>
                Home
            </Button>
        </Link>
    )
}
