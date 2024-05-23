'use client'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Cookies from 'universal-cookie'
import Image from 'next/image'
import axios from 'axios'

interface Product {
  id: string;
  user_id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock_quantity: number;
  images: string[];
  total_price: number;
  status: string;
  reviews_rate: string;
  reviews_nbr: string;
}

export default function dashboardMyProducts(){
  const cookies = new Cookies();
  const [products,setProducts] = useState<Product[]>([])
  useEffect(()=>{
    const token = cookies.get("jwt_token")
      axios.get("http://localhost:8000/dashboard/my-products",{ headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
        setProducts(res.data.data)
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
      .finally(()=>{
      })
  },[])
  return (
    <section className='h-full flex flex-col gap-3'>
      <main className='flex flex-col gap-3 h-full overflow-scroll relative'>
      {products.length == 0 ?
      <Label className='self-center text-[20px] font-bold top-[48%] l-[45%] absolute'>Emtpy</Label>
      :
      products.map((item)=>{
        return(
          <ProductCard product={item} products={products} setProducts={setProducts}/>
        )
      })}
      </main>
    </section>
  )
}
function ProductCard({product,products,setProducts}:{product:any,products:any,setProducts:any}){
  const statusColor = product.status == "approved" ? "text-green-400" : (product.status == "pending" ? "text-orange-600":"text-red-600")
  return(
      <Card className='flex justify-between items-center min-h-[80px] h-[80px] my-light-card pr-6 overflow-hidden'>
        <div className='flex gap-4 h-[80px] '>
          <div className='w-[200px] overflow-hidden bg-blue-300 object-[30px]'>
            <Image src={product.images[0]} alt="product" width={1000} height={200}/>
          </div>
          <div className='flex flex-col gap-1 h-full justify-center '>
            <Label>{product.name}</Label>
            <Label className='text-[12px] text-gray-500'>Category: {product.category}</Label>
            <Label className='text-[12px]'>Price: <span className='text-purple-500 text-[15px]'>{product.price} DA</span></Label>
          </div>
        </div>

        <div className='flex gap-10 items-center'>
          <Label>Status: <span className={statusColor}>{product.status}</span></Label>
          <DeleteButton product={product} products={products} setProducts={setProducts}/>
        </div>
      </Card>
  )
}

function DeleteButton({product,products,setProducts}:{product:any,products:any,setProducts:any}){
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  function handleProductDelete(){
      axios.delete(`http://localhost:8000/dashboard/product/${product.id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
        setProducts(products.filter((p:any)=> p.id !== product.id));
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
      .finally(()=>{
      })
  }
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[240px] w-[300px] my-light-card flex flex-col justify-between'>
        <AlertDialogHeader>
          <AlertDialogTitle>The Following Action is Ireversable!!!</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the following product: {product.name}
          </AlertDialogDescription>
        </AlertDialogHeader>
          <div className='flex flex-col gap-2'>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
            <Button variant="ghost">Cancel </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleProductDelete}>Confirm</AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

