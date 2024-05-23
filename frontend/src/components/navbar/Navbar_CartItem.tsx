'use client'

import React from 'react'
import { Label } from '@/components/ui/label'
import { Button} from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBasket, ShoppingCart, SquareX } from 'lucide-react'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/store'
import { Card } from '../ui/card'
import Image from 'next/image'

export const Navbar_CartItem = () => {
    const cart = useCartStore((state)=>state.cart)
    const totalPrice = useCartStore((state)=>state.totalPrice)
    const pathname = usePathname()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className={pathname.startsWith("/cart") ? "my-active-link": ""}>
                    Cart
                    <ShoppingCart className='pl-1'/>
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col justfiy-between my-light-card text-white'>
                <div>
                    <SheetHeader>
                        <SheetTitle className='text-white'>Cart Items</SheetTitle>
                        <SheetDescription>
                            Manage What you want to buy : )
                        </SheetDescription>
                    </SheetHeader>
                    <Separator className="my-3"/>
                </div>
                <section className='overflow-scroll flex flex-col justify-between items-center gap-3 '>
                    {cart.length == 0 ?
                    <div className='flex flex-col justify-center items-center mt-[180px]'>  
                        <ShoppingBasket size={100}/>
                        <Label className='text-[30px]'>Empty</Label>
                    </div>
                    :
                    cart.map((item)=>{
                        return(
                            <CartItem product={item}/>
                        )
                    })
                    }
                </section>
                <div className={`${cart.length == 0 && "hidden"}`}>
                    <Separator className='h-[1px] bg-gray-500 my-1'/>
                    <SheetFooter >
                        <div className='flex justify-between items-center w-full'>
                            <Label className='font-bold text-[18px]'>Total: <span className='text-purple-500'>{totalPrice} DA</span></Label>
                            <SheetClose asChild>
                                <Link href="/cart">
                                    <Button>
                                        Checkout
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function CartItem({product}:{product:any}){
    const removeFromCart = useCartStore((state)=>state.removeFromCart)
    return(
        <Card className='flex my-light-card justify-between items-center pr-2 w-full min-h-[75px] overflow-hidden'>
            <Image src={product.images[0]} alt="product" width={110} height={400} />
            <Label>{product.name}</Label>    
            <Button onClick={()=>{removeFromCart(product.id)}} className='p-2'><SquareX /></Button>
        </Card>
    )
}