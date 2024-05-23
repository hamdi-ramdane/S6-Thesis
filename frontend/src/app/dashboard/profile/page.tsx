'use client'
import { Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
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
import axios from 'axios';

export default function dashboardProfile(){
  const router = useRouter()
  const cookies = new Cookies()
  const token = cookies.get("jwt_token")
  const [isEditing,setIsEditing] = useState(false);
  const [errors,setErrors] = useState({
    is_fullname_invalid:false,
    is_short_password:false,
    is_password_missmatch:false,
  })
  const [pageData,setPageData] = useState({
    image:"/images/pfp_placeholder.png",
    first_name:"Loading...",
    last_name:"Loading...",
    email:"Loading...",
    creation_date:"2024-01-01",
    is_verified:false,
    nbr_reviews:0,
    nbr_orders:0,
    nbr_products_listed:0
  })
  function handleSubmit(){
    setIsEditing(false)
  }
  useEffect(()=>{
    axios.get("http://localhost:8000/dashboard/profile",{ headers: {"Authorization" : `Bearer ${token}`} })
    .then((res)=>{
      setPageData(res.data.data)
    })
    .catch((error)=>{
    })
    .finally(()=>{
    })
},[])
  const [password,setPassword] = useState("")
  const [passwordCheck,setPasswordCheck] = useState("")
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    
    const pattern = /^[a-zA-Z]+$/;
    const is_valid = !pattern.test(pageData.first_name) || !pattern.test(pageData.last_name) 
      || pageData.first_name.length + pageData.last_name.length >14
      || pageData.first_name.length + pageData.last_name.length <5
      
    if(name == "first_name" || name == "last_name"){
      setErrors({...errors,is_fullname_invalid:is_valid})
    }
    if(name == "password"){
      setErrors({...errors,is_short_password:(value.length<8 && value.length != 0),is_password_missmatch:(value != passwordCheck)})
      setPassword(value)
      return
    }
    if(name == "verify_password"){
      setErrors({...errors,is_password_missmatch:(value != password)})
      setPasswordCheck(value)
      return
    }

    setPageData({ ...pageData, [name]: value });
  };
  function handleImageChange(event:any){
    const value = event.target.files[0].name;
    setPageData({...pageData,"image":`/users/${value}`})
  }

  return (
    <section className='flex gap-3 h-full'>
      <aside className='flex flex-col items-center gap-5 flex-[1]'>
        <div className='flex flex-col gap-2'>
          <div className='rounded-full mt-8'>
            <Image src={pageData.image} alt="pfp" width={150} height={150} className='rounded-md'/>
          </div>
          <Input id="picture" type="file" accept='image/*' disabled={!isEditing} onChange={handleImageChange}
            className='cursor-pointer text-center bg-myprim text-white w-[150px]'/>
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='text-[15px]'>Created On : <span className='text-green-400'>{pageData.creation_date}</span></Label>
          <Label className='text-[15px]'>Reviews:  <span className='text-green-400'>{pageData.nbr_reviews}</span> </Label>
          <Label className='text-[15px]'>Orders:  <span className='text-green-400'>{pageData.nbr_orders}</span> </Label>
          <Label className='text-[15px]'>Products Listed:  <span className='text-green-400'>{pageData.nbr_products_listed}</span> </Label>
        </div>
      </aside>
      <main className='flex flex-col justify-between  flex-[3] py-7 px-4'>
        <div className='flex flex-col gap-2'>
          {pageData.is_verified ?
          <div className={`bg-green-500 py-2 px-4 rounded ${isEditing && "hidden"}`}>
            <Label>Email Verified</Label>
          </div>
          :
          <div className={`bg-orange-600 py-2 px-4 rounded ${isEditing && "hidden"}`}>
            <Label>Check Your Email for verification Link</Label>
          </div>
          }

          <div>
            <div className='flex gap-3'>
              <Input name="first_name" onChange={handleInputChange} className='my-input' placeholder='First Name' disabled={!isEditing} value={pageData.first_name}/>
              <Input name="last_name" onChange={handleInputChange} className='my-input' placeholder='First Name' disabled={!isEditing} value={pageData.last_name}/>
            </div>
              <Label className="text-red-500 text-sm">{errors.is_fullname_invalid && "Invalid Fullname (a-z) (between 5-14)"}</Label>
          </div>
          <Separator className='my-2 rounded bg-gray-400'/>
            <Input placeholder='Email' disabled={true} className='my-input w-[100%]' value={pageData.email} />
            <Separator className='my-2 rounded bg-gray-400'/>
          <div className='flex flex-col gap-2'>
            <Input name="password" type='password' onChange={handleInputChange} placeholder='Password' disabled={!isEditing} className='my-input w-[100%] mb-1' value={password} />
            <Input name="verify_password" type='password' onChange={handleInputChange} placeholder='Verify Password' disabled={!isEditing} className='my-input w-[100%]' value={passwordCheck}/>
            <div className='flex gap-4'>
              <Label className="text-red-500 text-sm">{errors.is_short_password && "Password Too Short (Minimum 8)"}</Label>
              <Label className="text-red-500 text-sm">{errors.is_password_missmatch && "Passwords Don't Match"}</Label>
            </div>
          </div>
        </div>
          <div className='flex flex-col gap-3'>
            <Button onClick={()=>{setIsEditing(true)}} className={isEditing ? "hidden" : ""}>Edit</Button>
            <ConfirmButton pageData={pageData} setPageData={setPageData} isEditing={isEditing} setIsEditing={setIsEditing} 
              isDisabled={errors.is_fullname_invalid || errors.is_password_missmatch || errors.is_short_password }/>
            <Button onClick={()=>{setIsEditing(false)}}  className={!isEditing ? "hidden" : ""} variant="ghost">Cancel</Button>
          </div>
      </main>
    </section>
  )
}

function ConfirmButton({pageData,setPageData,isEditing,setIsEditing,isDisabled}:{pageData:any,setPageData:any,isEditing:any,setIsEditing:any,isDisabled:boolean}){
  const cookies = new Cookies();
  const router = useRouter()
  const token = cookies.get("jwt_token")
  function handleConfirm(){
    const data = pageData
    axios.patch("http://localhost:8000/dashboard/user",data,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then((res)=>{
      router.refresh()
    })
    .catch((error)=>{
      console.log(error.response.data)
    })
    .finally(()=>{
      setIsEditing(false)
    })
  }
  return(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className={!isEditing ? "hidden" : ""}>Confirm</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='h-[180px] w-[250px] my-light-card flex flex-col justify-between'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
        </AlertDialogHeader>
          <div className='flex flex-col gap-2'>
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-black'>
              <Button variant="ghost">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isDisabled}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}
