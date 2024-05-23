'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useRouter } from 'next/navigation'
const data= [
  "iphone 13",
  "thinkpad t480"
]
export const Navbar_SearchBar = () => {
  const [query,setQuery] = useState("")
  const router = useRouter()
  function handleSearch(event:any){
    if(event.key == 'Enter'){
      router.push("/products/category/all")
      setQuery("")
    }
    
  }
  return (
        <Input placeholder="Search for product..." onKeyDown={handleSearch} value={query} onChange={(event)=>{setQuery(event.target.value)}}
        className='my-input max-w-80 duration-300 mr-3' />
  )
}
