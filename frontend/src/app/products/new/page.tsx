'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Label } from '@/components/ui/label'
import React, {useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import Cookies  from 'universal-cookie'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ListProduct(){
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()
  const [product, setProduct] = useState(
    {
        "name": "",
        "price": 0,
        "category": "automotive",
        "description": "",
        "stock_quantity": 0,
        "images": ["/products/product_0.jpg","/products/product_0.jpg"]
    }
  )
  function handleInputChange(event:any){
    const {name,value} = event.target
    if(name == "price" || name == "stock_quantity")
      setProduct({...product,[name]:Number(value)})
    else
      setProduct({...product,[name]:value})
  }
  function handleImageChange1(event:any){
    const value = event.target.files[0].name;
    setProduct({...product,"images":[`/products/${value}`,product.images[1]]})
  }
  function handleImageChange2(event:any){
    const value = event.target.files[0].name;
    setProduct({...product,"images":[product.images[0],`/products/${value}`]})
  }
  function handleCategoryChange(event:any){
    console.log(event.target.value)
  }
  function handleSubmit(){
    const cookies = new Cookies();
    const token = cookies.get("jwt_token")
    setIsLoading(true)
    axios.post(`http://localhost:8000/product`, product,
    { headers: {"Authorization" : `Bearer ${token}`} })
    .then((res)=>{
      router.push("/products/category/trending")
    })
    .catch((error)=>{
      console.log(error.response.data)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  return (
    <div className='flex flex-col gap-3 h-[400px] '>
      <section className='flex gap-16 h-full'>
        <aside className='my-light-card'>
          <Carousel className="w-full max-w-xs max-h-[300px] overflow-hidden">
            <CarouselContent>
              {Array.from({ length: product.images.length}).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className='overflow-hidden bg-transparent border-none flex justify-center items-center'>
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
          <div className='flex flex-col gap-2 justify-normal-center items-center'>
            <Input name="image1" type="file" accept='image/*' onChange={handleImageChange1} className='w-[300px] bg-green-500'/>
            <Input name="image2" type="file" accept='image/*' onChange={handleImageChange2} className='w-[300px] bg-myprim'/>
          </div>
        </aside>
        <main className='flex flex-col justify-between bg-my4 px-6 py-4 text-white w-[500px] items-start rounded overflow-hidden border-myprim border-[1px] shadow-2xl shadow-gray-950'>
          <Label className='text-[26px] font-bold'>Create new product</Label>
          <Label>Start making major bucks by selling your own products!!</Label>
          <div className='flex gap-4'>
            <Input name="name" value={product.name} onChange={handleInputChange} className='my-input w-[280px]' placeholder='Product Name' />
              <Select>
                <SelectTrigger className="w-[150px] bg-myprim text-center">
                  <SelectValue placeholder="Category" className='text-center' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup onChange={handleCategoryChange}>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="automotive">Automotive</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
          </div>
          <div className='flex flex-col text-[18px] gap-1'>
             <Textarea name="description" value={product.description} onChange={handleInputChange} placeholder="Product description (200 characters max)" className='my-input w-[450px] h-[120px]' />
          </div>
          
          <div className='flex gap-3'>
            <Input name="price" value={product.price} type='number'  
              onChange={handleInputChange} className='my-input w-[100px]' placeholder='Price' min="500" max='50000' step='500'/>
            <Input name="stock_quantity" value={product.stock_quantity}   type='number' 
             onChange={handleInputChange} className='my-input w-[100px]' placeholder='Quantity' min="1" max="20"/> 
          </div>
          <div className='flex gap-3 justify-end w-full'>
            <Button variant="ghost">Cancel</Button>
            <Button disabled={isLoading || product.name == "" || product.price == 0 || product.stock_quantity == 0} 
              onClick={handleSubmit} className='bg-green-600'>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </div>
        </main>
      </section>
    </div>
    
  )
}