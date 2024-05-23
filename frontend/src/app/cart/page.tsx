'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { SquareX } from 'lucide-react'
import { PaymentDrawer } from '@/components'
import { Separator } from '@/components/ui/separator'

export default function cart(){
  const cart = useCartStore((state)=>state.cart)
  const emptyCart = useCartStore((state)=>state.emptyCart)
  const totalPrice = useCartStore((state)=>state.totalPrice)
  return (
    <Card className='my-light-card w-[700px] h-[400px] px-2 py-3 flex flex-col justify-between'>
      <section className='flex flex-col gap-2 overflow-scroll'>
        {cart.length == 0 ?
          <h1 className='self-center mt-[22%]'>Empty Cart</h1>
        :
        cart.map((item)=>{
            return (
              <CartItem product={item}/>
            )
          })
        }
      </section>
      <div>
        <Separator className='bg-myprim my-2'/>
        <section className='flex justify-between items-center'>
          <Label className='ml-2 text-[16px]'>Total: <span className="text-purple-500">{totalPrice} DA</span></Label>
          <div className='flex gap-3'>
            <Button variant="ghost" onClick={()=>{emptyCart()}}>clear</Button>
            <PaymentDrawer/>
          </div>
        </section>
      </div>
    </Card>
  )
}
function CartItem({product}:{product:any}){
    const removeFromCart = useCartStore((state)=>state.removeFromCart)
    return(
        <Card className='flex my-light-card justify-between items-center pr-2 min-h-[75px] overflow-hidden'>
          <div className='flex gap-4'>
            <Image src={product.images[0]} alt="product" width={110} height={400} />
            <div className='flex flex-col justify-center gap-2 w-[100px]'>
              <Label>{product.name}</Label>    
              <Label className='text-purple-500'>{product.price} DA</Label>
            </div>
            <Separator className='h-full w-[1px] by-gray-500'/>
            <div className='flex flex-col justify-around'>
              <p className='text-[10px]'>{product.description}</p>    
            </div>
          </div>
          <Button onClick={()=>{removeFromCart(product.id)}} className='p-2 rounded-full'><SquareX /></Button>
        </Card>
    )
}