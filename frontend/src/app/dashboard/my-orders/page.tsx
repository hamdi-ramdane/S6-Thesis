'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dot, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Cookies from 'universal-cookie'
import axios from 'axios'

interface Order {
  id: string;
  user_id: string;
  products: string[];
  total_price: number;
  tracking_code: string;
  address: string;
  date: number;
}
export default function dashboardMyProducts(){
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  const [trackingCode,setTrackingCode] = useState("")
  const [orders,setOrders] = useState<Order[]>([])
  useEffect(()=>{
      axios.get(`http://localhost:8000/dashboard/my-orders` ,{ headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
        setOrders(res.data.data)
        setFilteredOrders(res.data.data)
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
      .finally(()=>{
      })
  },[])
  const [filteredOrders,setFilteredOrders] = useState(orders)
  const handleInputChange = (event:any) => {
    const value  = event.target.value;
    setTrackingCode(value)
    if(value == "")
      setFilteredOrders(orders)
    else
      setFilteredOrders(orders.filter((order)=>
        order.tracking_code.includes(value)
      ))
  }
  return (
    <section className='h-full flex flex-col gap-3 relative'>
      <div className='flex items-center gap-3'>
        <Search className='h-full aspect-square  '/>
        <Input placeholder="Tracking Code" value={trackingCode} onChange={handleInputChange} className='my-input h-[35px] w-[50%]'/>
      </div>
      <main className='flex flex-col gap-3 h-full overflow-scroll'>
      {filteredOrders.length == 0 ?
      <Label className='text-[20px] font-bold absolute top-[48%] left-[45%]'>Emtpy</Label>
      :
      filteredOrders.map((item)=>{
        return(
          <OrderCard order={item}/>
        )
      })}
      </main>
    </section>
  )
}
function OrderCard({order}:{order:any}){
  const statusColor = order.status == "delivered" ? "text-green-400" : (order.status == "in-transit" ? "text-orange-600":"text-red-600")
  return(
    <>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className='flex justify-between items-center min-h-[60px] my-light-card px-6 cursor-pointer hover:opacity-50'>
          <div className='flex gap-3'>
            <Label className='border-r-[1px] pr-3 border-gray-500 cursor-pointer text-orange-500'>{order.tracking_code}</Label>
            <Label className='border-r-[1px] pr-3 border-gray-500 cursor-pointer '>{order.date}</Label>
            <Label className='border-r-[1px] pr-3 border-gray-500 cursor-pointer'>{order.address}</Label>
            <Label className='cursor-pointer text-purple-500'>Total: {order.total_price} DA</Label>
          </div>
          <Label className='cursor-pointer'>Status:  
            <span className={statusColor}>
              {" " + order.status}
            </span>
          </Label>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[50%] w-[300px] my-light-card flex flex-col justify-between overflow-scroll'>
        <AlertDialogHeader>
          <AlertDialogTitle>Products In Order: {order.tracking_code}</AlertDialogTitle>
        </AlertDialogHeader>
          <div className='flex flex-col gap-2'>
            {order.products.map((product:any)=>{
              return(
                <div className='flex items-center '>
                  <Dot />
                  <Label>{product}</Label>
                </div>
              )
            })}
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}



