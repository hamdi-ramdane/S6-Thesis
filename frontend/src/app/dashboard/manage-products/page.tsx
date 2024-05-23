'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {Loader2, Search } from 'lucide-react'
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
  const [filteredProducts,setFilteredProducts] = useState<Product[]>([])
  const [query, setQuery] = useState("")
  const [error,setError] = useState({
    is_negative:true,
    message:""
  })
  useEffect(()=>{
    setFilteredProducts(products)
  },[products])
  useEffect(()=>{
    const token = cookies.get("jwt_token")
      axios.get(`http://localhost:8000/dashboard/manage-products` ,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
        setProducts(res.data.data)
      })
      .catch((error)=>{
        console.log(error.response.data)
        setError({
          is_negative:true,
          message:"Connection issue!!"
        })
      })
      .finally(()=>{
      })
  },[])
  function handleInputChange(event:any){
    const value = event.target.value
    setQuery(value)
    if(value == "")
      setFilteredProducts(products)
    else
      setFilteredProducts(products.filter((order)=>
        order.name.toLowerCase().includes(value.toLowerCase())
      ))
  }
  return (
    <section className='h-full flex flex-col gap-3'>
      <div className='flex items-center gap-3'>
        <Search className='h-full aspect-square  '/>
        <Input placeholder="Product Name" value={query} onChange={handleInputChange} className='my-input h-[35px] w-[50%]'/>
        <Label className={`${error.is_negative ? "text-red-500":"text-green-500"} text-[20px] ml-[10px]`}>
          {error.message} 
        </Label>
      </div>
      <main className='flex flex-col gap-3 h-full overflow-scroll relative'>
      {filteredProducts.length == 0 ?
      <Label className='self-center text-[20px] font-bold top-[48%] l-[45%] absolute'>Emtpy</Label>
      :
      filteredProducts.map((item)=>{
        return(
          <ProductCard product={item} products={products} setProducts={setProducts} error={error} setError={setError}/>
        )
      })}
      </main>
    </section>
  )
}
function ProductCard({product,products,setProducts,error,setError}:{product:any,products:any,setProducts:any,error:any,setError:any}){
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
          <BlacklistButton product={product} products={products} setProducts={setProducts} error={error} setError={setError}/>
          <DeleteButton product={product} products={products} setProducts={setProducts} error={error} setError={setError}/>
        </div>
      </Card>
  )
}

function BlacklistButton({product,products,setProducts,error,setError}:{product:any,products:any,setProducts:any,error:any,setError:any}){
  const [message,setMessage] = useState("")
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  const [is_loading ,setIsLoading ] = useState(false)
  function handleDelivered(event:any){
     const data = {
      content:message
     } 
     setError({is_negative:true,message:""})
     setIsLoading(true)
      axios.patch(`http://localhost:8000/dashboard/manage-products/blacklist/${product.id}` ,data,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
        setProducts(products.filter((p:any)=> p.id !== product.id));
        setError({
          is_negative:false,
          message:"Product blacklisted successfully"
        })
      })
      .catch((error)=>{
        console.log(error.response)
        setError({
          is_negative:true,
          message:"Connection issue!!"
        })
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }
  return(
    <>
     <AlertDialog>
      <AlertDialogTrigger asChild>
            <Button className="bg-black hover:bg-green-600 border-myprim border-[1px]" disabled={is_loading} >
              {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Blacklist 
            </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[200px] w-[300px] my-light-card flex flex-col justify-between overflow-scroll'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This product will be removed temporarly from the public shop,
            to reverse this, checkout "listing-requesets"
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black w-[60px]'>
              <Button variant="ghost">Close</Button>
          </AlertDialogCancel>
          <AlertDialogAction className='bg-black border-myprime border-[1px]' onClick={handleDelivered}>
            I'm sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

function DeleteButton({product,products,setProducts,error,setError}:{product:any,products:any,setProducts:any,error:any,setError:any}){
  const [message,setMessage] = useState("")
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  const [isLoading ,setIsLoading ] = useState(false)
  function handleDelete(){
     const data = {
      content:message
     } 
     setError({is_negative:true,message:""})
     setIsLoading(true)
      axios.delete(`http://localhost:8000/dashboard/manage-products/delete/${product.id}`,
      { headers: {"Authorization" : `Bearer ${token}`},data:data })
      .then((res)=>{
        setProducts(products.filter((p:any)=> p.id !== product.id));
        setError({
          is_negative:false,
          message:"Product deleted successfully"
        })
        setIsLoading(false)
      })
      .catch((error)=>{
        console.log(error.response)
        setError({
          is_negative:true,
          message:"Connection issue!!"
        })
      })
      .finally(()=>{
        setIsLoading(false)
      })
  }
  return(
    <>
     <AlertDialog>
      <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isLoading} >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[300px] w-[400px] my-light-card flex flex-col justify-between overflow-scroll'>
        <AlertDialogHeader>
          <AlertDialogTitle>Why was this product delete?</AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea placeholder="Provide a reason to why this product was delete?" className='my-light-card h-[150px] max-h-[150px]'
              value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              <Button variant="ghost">Close</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className='bg-orange-700'>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}