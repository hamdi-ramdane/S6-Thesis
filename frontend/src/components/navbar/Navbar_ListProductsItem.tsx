
import { ClipboardPlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export const Navbar_ListProductsItem = () => {
  return (
        <Link href="/products/new">
            <Button>
                List Product
                <ClipboardPlus className='py-1'/>
            </Button>
        </Link>
  )
}
