
'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
 
  return (
    <>
      {/* Hero  */}
      <section className=" my-light-card relative w-[80%] h-[30%] mb-[20px] mt-[50px] overlfow-hidden">
        {isClient && 
        <video src="/videos/bg_video1.mp4" autoPlay muted loop className="object-cover"/>}
        <main className="flex flex-col justify-center items-center w-full h-full absolute top-0 bg-[#0000003c] overflow:hidden ">
            <Label className="text-[5vw] font-bold max-sm:mb-[10px]">Embrace your Nomad</Label>
            <p className="text-[17px] mb-[15px] max-sm:hidden">The largest marketplace in North Africa!! </p>
            <div className="flex gap-3 items-center
              max-sm:flex-col max-sm:gap-1">
              <Link href="/products/category/trending" ><Button className="font-bold text-[22px] p-[25px] max-sm:text-[16px] max-sm:p-[10px]">Look around</Button></Link>
              <Link href="/register" ><Button variant="ghost" className="font-bold text-[20px] p-[25px] max-sm:text-[16px] max-sm:p-[4px]">Create an account</Button></Link>
            </div>
        </main>
      </section>

      {/* Trending Products*/}
      <Card className="my-light-card w-[80%] px-4 py-1 mb-2">
        <Label className="text-[30px]">Trending</Label>
      </Card>
      <section className="flex flex-col gap-4 my-light-card py-3 px-4 w-[80%]">
        <div className="flex flex-wrap justify-around gap-3 ">
          {TrendingProducts.map((item)=>{
            return <TrendingCard product={item}/>
          })}
        </div>
      </section>
    </>
  )
}

function TrendingCard({product}:{product:any}){
 const addToCart = useCartStore((state)=>state.addToCart) 
 const [isClicked,setIsClicked] = useState(false)
  return (
    <Card className='h-[230px] w-[31%] overflow-hidden flex flex-col justify-between hover:opacity-90 border-[3px] border-myprim my-light-card
      max-sm:w-[100%] max-md:w-[47%]
    '>
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

 const TrendingProducts = [
    {
    "id": 1,
    "user_id": 1,
    "name": "Thinkpad t470s",
    "price": 30500,
    "category": "electronics",
    "description": "The ThinkPad T470s is a business-class laptop from Lenovo, designed to offer reliability, performance, and security for professionals on the go.",
    "stock_quantity": 78,
    "images": [ "/products/tech_1_1.jpg","/products/tech_1_2.jpg","/products/tech_1_3.jpg","/products/tech_1_4.jpg"],
    "status": "approved",
    "reviews_rate": 4.3,
    "reviews_nbr": 83
},
{
    "id": 2,
    "user_id": 1,
    "name": "Beats B550",
    "price": 4500,
    "category": "electronics",
    "description": "The Beats B550 headphones deliver high-quality sound for an immersive listening experience.",
    "stock_quantity": 88,
    "images": [ "/products/tech_2.jpg"],
    "status": "pending",
    "reviews_rate": 3.9,
    "reviews_nbr": 340
},
{
    "id": 3,
    "user_id": 1,
    "name": "SM3 Smartwatch",
    "price": 6800,
    "category": "electronics",
    "description": "The SM3 Smartwatch is a stylish and functional accessory that helps you stay connected.",
    "stock_quantity": 47,
    "images": [ "/products/tech_3.jpg"],
    "status": "pending",
    "reviews_rate": 3.6,
    "reviews_nbr": 30
},
{
    "id": 7,
    "user_id": 1,
    "name": "Apple Airpods3",
    "price": 9600,
    "category": "electronics",
    "description": "The Apple Airpods3 provide clear and crisp sound for an enhanced listening experience.",
    "stock_quantity": 41,
    "images": [ "/products/tech_7.jpg"],
    "status": "approved",
    "reviews_rate": 4.5,
    "reviews_nbr": 301
},
{
    "id": 8,
    "user_id": 1,
    "name": "Canon Studio3",
    "price": 55000,
    "category": "electronics",
    "description": "The Canon Studio3 camera offers professional-grade performance and versatility.",
    "stock_quantity": 38,
    "images": [ "/products/tech_8.jpg"],
    "status": "pending",
    "reviews_rate": 3.9,
    "reviews_nbr": 63
},
{
    "id": 9,
    "user_id": 3,
    "name": "Xiaomi Fly5",
    "price": 22500,
    "category": "electronics",
    "description": "The Xiaomi Fly5 drone is easy to fly and captures stunning aerial footage.",
    "stock_quantity": 58,
    "images": [ "/products/tech_9.jpg"],
    "status": "approved",
    "reviews_rate": 4,
    "reviews_nbr": 290
},
{
    "id": 4,
    "user_id": 1,
    "name": "SM5 Pro",
    "price": 8000,
    "category": "electronics",
    "description": "The SM5 Pro is a high-performance smartphone with a sleek design and advanced features.",
    "stock_quantity": 81,
    "images": [ "/products/tech_4.jpg"],
    "status": "declined",
    "reviews_rate": 4.1,
    "reviews_nbr": 233
},
{
    "id": 5,
    "user_id": 2,
    "name": "Canon 5 Ultra",
    "price": 11000,
    "category": "electronics",
    "description": "The Canon 5 Ultra camera captures stunning images with precision and clarity.",
    "stock_quantity": 77,
    "images": [ "/products/tech_5.jpg"],
    "status": "approved",
    "reviews_rate": 4.6,
    "reviews_nbr": 11
},
{
    "id": 6,
    "user_id": 1,
    "name": "Dell m9",
    "price": 1900,
    "category": "electronics",
    "description": "The Dell m9 laptop offers reliable performance for everyday computing tasks.",
    "stock_quantity": 97,
    "images": [ "/products/tech_6.jpg"],
    "status": "pending",
    "reviews_rate": 4.5,
    "reviews_nbr": 45
},

{
    "id": 10,
    "user_id": 2,
    "name": "Sony E4",
    "price": 5600,
    "category": "electronics",
    "description": "The Sony E4 headphones deliver rich and immersive sound for an enjoyable listening experience.",
    "stock_quantity": 74,
    "images": [ "/products/tech_10.jpg"],
    "status": "pending",
    "reviews_rate": 4.1,
    "reviews_nbr": 34
},
]