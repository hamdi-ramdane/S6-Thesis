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
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

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
  const token = cookies.get("jwt_token")
  const [products,setProducts] = useState<Product[]>([])
  useEffect(()=>{
      axios.get(`http://localhost:8000/dashboard/listing-requests` ,
      { headers: {"Authorization" : `Bearer ${token}`} })
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
  const statusColor = product.status == "approved" ? "text-green-400" : 
        (product.status == "pending" ? "text-orange-600":"text-red-600")
  return(
      <Card className='flex justify-between items-center min-h-[80px] h-[80px] my-light-card pr-6 overflow-hidden'>
        <div className='flex gap-4 h-[80px] '>
          <div className='w-[200px] overflow-hidden bg-blue-300 object-[30px]'>
            <Image src={product.images[0]} alt="product" width={1000} height={200}/>
          </div>
          <div className='flex flex-col gap-1 h-full justify-center '>
            <Label>{product.name}</Label>
            <Label className='text-[12px] text-gray-500'>Category: {product.category}</Label>
            <Label className='text-[12px]'>Price: 
              <span className='text-purple-500 text-[15px]'>{product.price} DA</span>
              </Label>
          </div>
        </div>
        <div className='w-[200px]'>
          <p className='text-[9px]'>{product.description}</p>
        </div>

        <div className='flex gap-5 items-center'>
          <DeclineButton product={product} products={products} setProducts={setProducts}/>
          <ApproveButton product={product} products={products} setProducts={setProducts}/>
        </div>
      </Card>
  )
}

function DeclineButton(
  {product,products,setProducts}:
  {product:any,products:any,setProducts:any})
{
  const [isLoading,setIsLoading] = useState(false)
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  const [message,setMessage] =  useState("")
  function handleProductDelete(){
     const data = {
      content:message
     } 
     setIsLoading(true)
      axios.patch(`http://localhost:8000/dashboard/listing-requests/decline/${product.id}`,data,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then((res)=>{
        setProducts(products.filter((p:any)=> p.id !== product.id));
      })
      .catch((error)=>{
        setIsLoading(false)
        console.log(error)
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Decline
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[240px] w-[300px] my-light-card flex flex-col justify-between'>
        <AlertDialogHeader>
          <AlertDialogTitle>Provide a Reason: </AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea placeholder="Why was this product declined ?"  className='my-input'
              value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
          <div className='flex flex-col gap-2'>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              <Button variant="ghost">Cancel </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleProductDelete}>Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function ApproveButton({product,products,setProducts}:{product:any,products:any,setProducts:any}){
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  function handleProductApprove(){
       axios.patch(`http://localhost:8000/dashboard/listing-requests/approve/${product.id}`,{},
      { headers: { Authorization : `Bearer ${token}`} })
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
        <Button className='bg-green-500 hover:bg-green-600'>Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[240px] w-[300px] my-light-card flex flex-col justify-between'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you Sure of Approval?</AlertDialogTitle>
          <AlertDialogDescription>
            The Product [{product.name}] will be approved, and all users will be able to view it.
          </AlertDialogDescription>
        </AlertDialogHeader>

          <div className='flex flex-col gap-2'>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              <Button variant="ghost">Cancel </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleProductApprove} className='bg-green-500 hover:bg-green-600'>Confirm</AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}
