'use client'
import Link from "next/link";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function Footer(){
  const [isLoading, setIsLoading] = useState(false)
  const [data,setData] = useState({
    fullname:"",
    email:"",
    message:"",
  })
  const [error,setError] = useState({isNegative:false,err:""})
  function handleChange(event:any){
    const {name,value} = event.target
    setData({...data,[name]:value}) 
  }
  function handleSubmit(){
    setIsLoading(true)
    setError({isNegative:false,err:""})
    axios.post("http://localhost:8000/feedback",data)
    .then((res)=>{
      setError({isNegative:false,err:"Successful!!"})
    })
    .catch((error)=>{
      console.log(error.response)
      setError({isNegative:true,err:"Invalid Info!!"})
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  return (
    <footer className="flex flex-col justify-center bg-[#09090B] pt-5 ">
      <main className="flex justify-center gap-5 mb-5">
        <aside className="flex flex-col items-center justify-center my-light-card py-2 px-4 
          max-md:hidden
        ">
          <Label>Checkout</Label>
          <Separator className="w-full bg-gray-200 my-2"/>
          <Link href="/" className="text-[15px] text-gray-400 hover:text-green-400">Home Page</Link>
          <Link href="/products/category/trending" className="text-[15px] text-gray-400 hover:text-green-400">Trending Products</Link>
          <Link href="/products/category/books" className="text-[15px] text-gray-400 hover:text-green-400">Gay Books</Link>
          <Link href="/products/category/automotive" className="text-[15px] text-gray-400 hover:text-green-400">Rule34 Cars</Link>
          <Link href="/register" className="text-[15px] text-gray-400 hover:text-green-400">Register</Link>
        </aside>
        <section className="my-light-card flex flex-col gap-3 w-[500px] py-2 px-4 ">
          <div className="flex gap-8 items-center">
            <Label className="text-[35px]">Send us Feedback</Label>
            <Label className={`text-[18px] ${error.isNegative ? "text-red-500" : "text-green-500"}`}>{error.err}</Label>
          </div>
          <div className="flex gap-3">
            <Input name="fullname" value={data.fullname} onChange={handleChange} placeholder="Fullname (Optional)" className="my-input  w-[36%]"/>
            <Input name="email" value={data.email}  onChange={handleChange} placeholder="Email" className="my-input w-[60%] "/>
          </div>
          <Textarea name="message" value={data.message}  onChange={handleChange} placeholder="What do you think about our website?" className="my-input"/>
          <Button disabled={isLoading || data.email == "0" || data.message == ""} onClick={handleSubmit}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send
          </Button>
        </section>
     </main>
      <div className="flex justify-center bg-black text-gray-100 py-5 px-10 w-full" >
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <Label>By Hamdi Ramdane</Label>
          <Label className="text-[12px] text-gray-500">For Third Year Bachalore Thesis in NTIC</Label>
        </div>
      </div>
    </footer>

  )
}