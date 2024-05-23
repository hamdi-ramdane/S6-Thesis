'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { ReviewsDrawer } from '@/components'
import { useCartStore } from '@/store'
import axios from 'axios'

export default function products({params}:{ params: {productId:number}}){
  const addToCart = useCartStore((state)=>state.addToCart) 
  const [isClicked,setIsClicked] = useState(false)
  const [product, setProduct] = useState(
    {
        "id": "0",
        "user_id": "0",
        "name": "Loading",
        "price": 0,
        "category": "Loading",
        "description": "Loading",
        "stock_quantity": 0,
        "images": ["/products/ntic.png"],
        "status": "approved",
        "reviews_rate": 5,
        "reviews_nbr": 0
    }
  )
  useEffect(()=>{
    axios.get(`http://localhost:8000/product/${params.productId}`)
    .then((res)=>{
        setProduct(res.data.data) 
    })
    .catch((error)=>{
    })
  },[])
  
  return (
    <div className='flex flex-col gap-3'>
      <section className='flex gap-16 max-h-[340px] overflow-hidden'>
        <Carousel className="w-full max-w-xs
            max-sm:hidden">
          <CarouselContent>
            {Array.from({ length: product.images.length}).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className='overflow-hidden my-light-card flex justify-center items-center'>
                    <CardContent className="flex aspect-square items-center justify-center ">
                           <Image src={product.images[index]} alt="product" height={1000} width={1000} objectFit='contain' />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <main className='flex flex-col justify-between bg-my4 px-6 py-4 text-white w-[500px] items-start rounded overflow-hidden border-myprim border-[1px] shadow-2xl shadow-gray-950'>
          <div className='flex flex-col'>
            <Label className='text-[25px]'>{product.name}</Label>
            <Label>⭐⭐⭐⭐⭐{product.reviews_rate} <span className='text-gray-300 text-[13px]'>({product.reviews_nbr})</span></Label>
          </div>

          <div className='flex flex-col text-[18px] gap-1'>
            <Label>Availability: <span className='text-green-500'>{product.stock_quantity == 0 ? "Out of Stock" : "In Stock"}</span></Label>
            <Label>Category: <span className='text-yellow-200'>{product.category}</span></Label>
            <Label>Code: <span className='text-yellow-200'>{product.id}</span></Label>
          </div>

          <Label className='text-[20px] text-myprim font-bold'>{product.price} DA</Label>

          <p className='text-[14px]'>{product.description}</p>
          <div className='flex gap-3'>
            <Button className={`self-end ${isClicked && "bg-gray-800 hover:bg-gray-800"}`} 
              onClick={()=>{addToCart(product);setIsClicked(true)}} disabled={isClicked}>
                  {isClicked ? "Added" : "Add To Cart"}
              </Button>
            <ReviewsDrawer productId={params.productId}/>
          </div>
        </main>
      </section>
    </div>
    
  )
}