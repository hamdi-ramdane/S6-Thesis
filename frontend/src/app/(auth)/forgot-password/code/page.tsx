'use client'
import { POSTDATA } from "@/app/api"
import { Button, buttonVariants } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react"
import axios from "axios"

export default function ForgotPasswordValidEmail(){
  const router = useRouter(); 
  const searchParams = useSearchParams()
  const [error,setError] = useState("")
  const [code,setCode] = useState("")
  const [is_loading ,setIsLoading ] = useState(false)

  function handleSubmit(){
    setError("")
    setIsLoading(true)
    axios.post("http://localhost:8000/auth/forgot-password/check-code",{"code":code})
    .then((res)=>{
      router.push(`/forgot-password/reset?email=${searchParams.get("email")}`)
    })
    .catch((error)=>{
      switch(error.response.status){
        case 401: case 422: setError("Invalid Code!!");break;
        default: setError("Error!")
      }
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  return (
    <>
        <CardHeader className="flex">
          {/*leave empty for layout*/}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="self-center text-[25px] text-gray-100">Verification</Label>
                <Label className="self-center text-[10px] text-gray-300">A Code was sent to your email. Please check your inbox!</Label>
                <Input name="code" placeholder="00000" value={code} onChange={(e)=>setCode(e.target.value)} maxLength={5}
                className="w-[120px] self-center text-[20px] tracking-widest text-center uppercase text-black rounded-none border-b-4 border-myprim bg-gray-100"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <h1 className="text-red-500 text-sm text-bold">{error}</h1>
          <Button disabled={!code[0] || is_loading}  onClick={handleSubmit}>
            {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue 
          </Button>
        </CardFooter>
    </>
  )
}

