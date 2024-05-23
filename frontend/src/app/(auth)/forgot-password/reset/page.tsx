'use client'
import { POSTDATA } from "@/app/api"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from "lucide-react"
import axios from "axios"

export default function ForgotPassword(){
  const router = useRouter(); 
  const searchParams = useSearchParams()
  const [error,setError] = useState("")
  const [formData,setFormData] = useState({
    password:"",
    password_check:""
  })
  const [is_loading ,setIsLoading ] = useState(false)

  function handleSubmit(){
    setError("")
    setIsLoading(true)
    const {password_check, ...data} = formData
    axios.patch(`http://localhost:8000/auth/forgot-password/reset/${searchParams.get("email")}`,data)
    .then((res)=>{
      console.log(res)
      router.push("/login")
    })
    .catch((error)=>{
      setError("Error!")
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
    const [inputErrors,setInputErrors] = useState({
      short:false,
      missmatch:false
    })
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setInputErrors({...inputErrors,short:value.length<8})
    if(name == "password"){
      setInputErrors({short:value.length<8,missmatch:value!=formData.password_check})
    }
    else{
      setInputErrors({...inputErrors,missmatch:value!=formData.password})
    }
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
        <CardHeader className="flex">
          {/*leave empty for layout*/}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="self-center text-[25px] text-gray-100">Renew Your Password</Label>
                <Label className="self-center text-[10px] text-gray-300">Make sure NOT to lose it this time.</Label>
                <Input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleInputChange} className="text-black rounded-none border-b-4 border-myprim bg-gray-100"  />
                <Input type="password" name="password_check" placeholder="Re-type New Password"value={formData.password_check} onChange={handleInputChange} className="text-black rounded-none border-b-4 border-myprim bg-gray-100"  />
                  {inputErrors.short && <h1 className="text-red-500 text-sm text-bold">Password Too Short (min 8 characters)</h1>}
                  {inputErrors.missmatch && <h1 className="text-red-500 text-sm text-bold">Passwords don't match!</h1>}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <h1 className="text-red-500 text-sm text-bold">{error}</h1>
          <Button onClick={handleSubmit}
              disabled={formData.password == "" || is_loading || inputErrors.short || inputErrors.missmatch}>
            {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue 
          </Button>
        </CardFooter>
    </>
  )
}

