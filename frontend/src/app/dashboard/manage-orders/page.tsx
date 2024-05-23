'use client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {  Loader2, Search } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
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
export default function dashboardManageOrders(){
  const [error,setError] = useState({
    is_negative:true,
    message:""
  })
  const cookies = new Cookies();
  const [trackingCode,setTrackingCode] = useState("")
  const [orders,setOrders] = useState<Order[]>([])
  useEffect(()=>{
    const token = cookies.get("jwt_token")
    axios.get(`http://localhost:8000/dashboard/manage-orders` ,
    { headers: {"Authorization" : `Bearer ${token}`} })
    .then((res)=>{
      setOrders(res.data.data)
      setFilteredOrders(res.data.data)
    })
    .catch((error)=>{

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
  useEffect(()=>{
    setFilteredOrders(orders);
  },[orders])
  return (
    <section className='h-full flex flex-col gap-3 relative'>
      <div className='flex items-center gap-3'>
        <Search className='h-full aspect-square  '/>
        <Input placeholder="Tracking Code" value={trackingCode} onChange={handleInputChange} className=' my-input h-[35px] w-[50%] '/>
        <Label className={`${error.is_negative ? "text-red-500":"text-green-500"} text-[20px] ml-[10px]`}>
          {error.message}
        </Label>
      </div>
      <main className='flex flex-col gap-3 h-full overflow-scroll'>
      {filteredOrders.length == 0 ?
      <Label className='text-[20px] font-bold absolute top-[48%] left-[45%]'>Emtpy</Label>
      :
      filteredOrders.map((item)=>{
        return(
          <OrderCard order={item} orders={orders} setOrders={setOrders} error={error} setError={setError}/>
        )
      })}
      </main>
    </section>
  )
}
function OrderCard({order,orders,setOrders,error,setError}:{order:any,orders:any,setOrders:any,error:any,setError:any}){
  const statusColor = order.status == "delivered" ? "text-green-400" : (order.status == "pending" ? "text-orange-600":"text-red-600")
  return(
    <>
        <Card className='flex justify-between items-center min-h-[60px] my-light-card px-6 '>
          <div className='flex gap-3'>
            <Label className='border-r-[1px] pr-3 border-gray-500 text-orange-500'>{order.tracking_code}</Label>
            <Label className='border-r-[1px] pr-3 border-gray-500 '>{order.date}</Label>
            <Label className='border-r-[1px] pr-3 border-gray-500 '>{order.address}</Label>
            <Label className='text-purple-500'>Total: {order.total_price} DA</Label>
          </div>
         <div className='flex gap-2'>
            <CanceledButton order={order} orders={orders} setOrders={setOrders} error={error} setError={setError}/>
            <DeliveredButton order={order} orders={orders} setOrders={setOrders} error={error} setError={setError}/>
          </div> 
        </Card>
    </>
  )
}

function DeliveredButton({order,orders,setOrders,error,setError}:{order:any,orders:any,setOrders:any,error:any,setError:any}){
  const [message,setMessage] = useState("")
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  const [isLoading ,setIsLoading ] = useState(false)
  function handleDelivered(event:any){
     const data = {
      content:message
     } 
     setError({is_negative:true,message:""})
     setIsLoading(true)
    axios.patch(`http://localhost:8000/dashboard/order/deliver/${order.id}` ,data,
    { headers: {"Authorization" : `Bearer ${token}`} })
    .then((res)=>{
        setOrders(orders.filter((p:any)=> p.id !== order.id));
        setError({
          is_negative:false,
          message:"Order Delivered successfully"
        })
    })
    .catch((error)=>{
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
            <Button className='bg-green-500  hover:bg-green-600 ' disabled={isLoading} >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delivered
            </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[200px] w-[300px] my-light-card flex flex-col justify-between overflow-scroll'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be sure that this products was actually delivered,
            The action is irreversable!!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black w-[60px]'>
              <Button variant="ghost">Close</Button>
          </AlertDialogCancel>
          <AlertDialogAction className='bg-green-600' onClick={handleDelivered}>
            I'm Sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
function CanceledButton({order,orders,setOrders,error,setError}:{order:any,orders:any,setOrders:any,error:any,setError:any}){
  const [message,setMessage] = useState("")
  const cookies = new Cookies();
  const token = cookies.get("jwt_token")
  const [isLoading ,setIsLoading ] = useState(false)
  function handleCanceled(event:any){
     const data = {
      content:message
     } 
     setError({is_negative:true,message:""})
     setIsLoading(true)
      axios.patch(`http://localhost:8000/dashboard/order/cancel/${order.id}` ,data,
      { headers: {"Authorization" : `Bearer ${token}`} })
      .then((res)=>{
       setOrders(orders.filter((p:any)=> p.id !== order.id));
        setError({
          is_negative:true,
          message:"Order Canceled successfully"
        })
      })
      .catch((error)=>{
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
              Canceled
            </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[300px] w-[400px] my-light-card flex flex-col justify-between overflow-scroll'>
        <AlertDialogHeader>
          <AlertDialogTitle>Why Canceled? </AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea placeholder="Provide a reason to why this order was canceled?"  className='my-light-card h-[150px] max-h-[150px]'
              value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
          </AlertDialogDescription>
        </AlertDialogHeader>
          <div className='flex flex-col gap-2'>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              <Button variant="ghost">Close</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleCanceled} className='bg-orange-700'>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}


