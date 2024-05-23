'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/store'
import axios from 'axios'
import { Book, Cable, Car, Dumbbell, GalleryHorizontalEnd, Lamp, Music, Search, Shirt} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ReactNode } from 'react';

interface Product {
  id: number;
  user_id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  stock_quantity: number;
  images: string[]; 
  status: string;
  reviews_rate: number;
  reviews_nbr: number;
}
export default function products({params}:{params:{productCategory:string}}){
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProdcuts, setFilteredProducts] = useState<Product[]>([])
  const [query,setQuery] = useState("")
  const pathname = usePathname()
  useEffect(()=>{
    axios.get(`http://localhost:8000/product/category/${params.productCategory}`)
    .then((res)=>{
        setProducts(res.data.data) 
    })
    .catch((error)=>{
    })
  },[])
  useEffect(()=>{
    setFilteredProducts(products)
  },[products])
  function handleChange(event:any){
    const value = event.target.value
    setQuery(value)
    setFilteredProducts(products.filter((product)=>
      product.name.toLowerCase().includes(value.toLowerCase())))
  }
  return (
    <section className='flex h-[500px] w-[1000px] gap-3  justify-between mt-[20px]
      max-lg:flex-col max-lg:w-[80%]'>
      <nav className='flex-1 flex flex-col gap-3 py-4 px-2 dark-card bg-my4 text-white rounded overflow-hidden border-myprim border-[1px] shadow-2xl shadow-gray-950
        max-lg:hidden'>
        <Label>Categories</Label>
        <Separator/>
        <CategoryBtn url="trending" category="Trending" isActive={pathname.endsWith("trending")}><GalleryHorizontalEnd /></CategoryBtn>
        <CategoryBtn url="electronics" category="Electronics" isActive={pathname.endsWith("electronics")}><Cable /></CategoryBtn>
        <CategoryBtn url="clothing" category="Clothing" isActive={pathname.endsWith("clothing")}><Shirt /></CategoryBtn>
        <CategoryBtn url="home" category="Home Decore" isActive={pathname.endsWith("home")}><Lamp /></CategoryBtn>
        <CategoryBtn url="books" category="Books" isActive={pathname.endsWith("books")}><Book /></CategoryBtn>
        <CategoryBtn url="sports" category="Sports" isActive={pathname.endsWith("sports")}><Dumbbell/></CategoryBtn>
        <CategoryBtn url="automotive" category="Automotive" isActive={pathname.endsWith("automotive")}><Car /></CategoryBtn>
        <CategoryBtn url="music" category="Music" isActive={pathname.endsWith("music")}><Music /></CategoryBtn>

      </nav>
      <section className='flex flex-col gap-3 flex-[5] my-light-card px-3 py-4 overflow-scroll'>
        <div className='flex items-center gap-3'>
            <Search className='h-full aspect-square  '/>
            <Input placeholder="Search by name..." value={query} onChange={handleChange} className='my-input h-[35px] w-[50%]'/>
        </div>
          <main className='flex flex-wrap gap-3 justify-center items-start overflow-y-scroll'>
          {filteredProdcuts.map((product)=>{
            return (
              <ProductCard product={product}/>
            )
          })}
          </main>
      </section>
    </section>
  )
}

function CategoryBtn({category,url,children,isActive}:{category:string,url:string,children?:ReactNode,isActive:boolean}){
  const activeStyle = "bg-green-500 hover:bg-green-600"
  return (
      <Link href={`/products/category/${url}`}>
        <Button className={`w-full items-start justify-start h-[40px] ${isActive && activeStyle}`}>
          {children}
          <span className='pl-2'>{category}</span>
        </Button>
     </Link>
  )
}

function ProductCard({product}:{product:any}){
 const addToCart = useCartStore((state)=>state.addToCart) 
 const [isClicked,setIsClicked] = useState(false)
 return(
  <Card className='h-[230px] w-[250px] overflow-hidden flex flex-col justify-between hover:opacity-90 border-[3px] border-myprim my-light-card'>
    <Link  href={`/products/product/${product.id}`} className='bg-blue-400 h-full cursor-pointer overflow-hidden flex justify-center items-center'>
      <Image src={product.images[0]} alt='random' width="1000" height="200" className=''/>
    </Link>
    <div className='flex gap-3 px-3 py-1 items-center border-t-2 border-myprim '>
      <Label className='text-[16px] font-bold'>{product.name}</Label>
      <Label>⭐{product.reviews_rate} <span className='text-[13px] text-gray-500'>({product.reviews_nbr})</span></Label>
    </div>
    <div className='flex justify-between items-center py-1 px-1 gap-2 '>
      <Label className='text-[16px] font-bold bg-green-600 h-full text-center w-full flex justify-center items-center rounded'>
        {product.price} DA
      </Label>
      <Button className={`self-end font-bold ${isClicked && "bg-gray-800 hover:bg-gray-800"}`} 
        onClick={()=>{addToCart(product);setIsClicked(true)}} disabled={isClicked}>
            {isClicked ? "Added" : "Add To Cart"}
        </Button>
    </div>
  </Card>
 )
}

