'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Cookies from 'universal-cookie'
import Image from 'next/image'
import axios from 'axios'
import { Textarea } from '@/components/ui/textarea'

interface User{
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  role: string;
  creation_date: string;
  is_verified: string;
  nbr_reviews: number;
  nbr_orders: number;
  nbr_products_listed: number;
}

export default function dashboardManageUseers(){
  const [users,setUsers] = useState<User[]>([])
  const [filteredUsers,setFilteredUsers] = useState<User[]>(users)
  const [error,setError] = useState({
    isNegative:false,
    message:""
  })
  useEffect(()=>{
    const cookies = new Cookies()
    const token = cookies.get("jwt_token")
    axios.get("http://localhost:8000/dashboard/manage-users",{ headers: {"Authorization" : `Bearer ${token}`} })
    .then((res)=>{
      setUsers(res.data.data)
    })
    .catch((error)=>{
    })
    .finally(()=>{
    })
  },[])
  useEffect(()=>{
    setFilteredUsers(users)
  },[users])
  const [query,setQuery] = useState("")
  function handleInputChange(event:any){
    const value = event.target.value
    setQuery(value)
    if(value == "")
      setFilteredUsers(users)
    else
      setFilteredUsers(users.filter((user)=>
        user.email.includes(value)
      ))
  }
  return (
    <div className='flex flex-col gap-3 overflow-scroll h-full'>
      <div className='flex items-center gap-3'>
        <Search className='h-full aspect-square  '/>
        <Input placeholder="User Email" onChange={handleInputChange} value={query} className='my-input h-[35px] w-[50%]'/>
        <Label className={`text-[20px] ${error.isNegative ? "text-red-500" : "text-green-500"}`}>{error.message}</Label>
      </div>
      <section className='h-full flex w-full justify-between gap-3 overflow-scroll'>
        <main className='flex flex-wrap justify-around gap-3 h-full overflow-scroll relative'>
        {filteredUsers?.length == 0 ?
        <Label className='self-center text-[20px] font-bold top-[48%] l-[45%] absolute'>Emtpy</Label>
        :
        filteredUsers?.map((item)=>{
          return(
            <ProductCard user={item} users={users} setUsers={setUsers} error={error} setError={setError}/>
          )
        })}
        </main>
      </section>
    </div>
  )
}
function ProductCard({user,users,setUsers,error,setError}:{user:any,users:any,setUsers:any,error:any,setError:any}){
  return(
      <Card className='flex justify-between items-center w-[48%] min-h-[80px] h-[150px] my-light-card pr-6 overflow-hidden relative'>
        <div className='flex gap-4 h-full '>
          <div className='w-[50%] overflow-hidden bg-blue-300 object-fit'>
            <Image src={user.image} alt="user" width={1000} height={1000}/>
          </div>
          <div className='flex flex-col gap-1 h-full justify-center '>
            <Label>{user.first_name} {user.last_name}</Label>
            <Label className='text-[12px] text-gray-500'>{user.email}</Label>
            <Label className='text-[12px]'><span className='text-purple-500 text-[15px]'>{user.creation_date}</span></Label>
            {user.is_amdin ? <Label>Role: <span className='text-myprim'>Admin</span></Label>
            :<Label>Role: <span className='text-green-500'>User</span></Label>}
            <Label>Reviews: {user.nbr_reviews}</Label>
            <Label>Products: {user.nbr_products_listed}</Label>
            <Label>Orders: {user.nbr_orders}</Label>
          </div>
        </div>
        <div className='flex gap-10 items-center'>
          <BanButton user={user} users={users} setUsers={setUsers} error={error} setError={setError}/>
        </div>
      </Card>
  )
}

function BanButton({user,users,setUsers,error,setError}:{user:any,users:any,setUsers:any,error:any,setError:any}){
  const [message,setMessage] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  function handleSubmit(){
    const cookies = new Cookies();
    const token = cookies.get("jwt_token")
    setError({isNegative:true,message:""})
    setIsLoading(true)
    const data = {
      content:message
    }
    axios.delete(`http://localhost:8000/dashboard/manage-users/${user.id}`, 
    { headers: {"Authorization" : `Bearer ${token}`}, data:data })
    .then((res)=>{
      setUsers(users.filter((u:any)=> u.id !== user.id))
      setError({isNegative:false,message:"User banned successfully"})
    })
    .catch((error)=>{
      if(error.response.status == 409) setError({isNegative:true,message:"You Can't Ban yourself"})
      else setError({isNegative:true,message:"Error Fetching!"})
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isLoading} className='absolute bottom-[6px] right-2'>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ban
          </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[240px] w-[300px] my-light-card flex flex-col justify-between'>
        <AlertDialogHeader>
          <AlertDialogTitle>Tell the user why :(</AlertDialogTitle>
          <Textarea placeholder="Why was this user banned ?"  className='my-input'
            value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
        </AlertDialogHeader>
          <div className='flex flex-col gap-2'>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              <Button variant="ghost">Cancel </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

