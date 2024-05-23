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
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react"
import axios from "axios"
import { useAuth } from "@/app/context"

export default function ForgotPassword(){
  const router = useRouter(); 
  const auth = useAuth()
  const [error,setError] = useState("")
  const [email,setEmail] = useState("")
  const [is_loading ,setIsLoading ] = useState(false)
  function handleSubmit(){
    setError("")
    setIsLoading(true)
    axios.post("http://localhost:8000/auth/forgot-password/check-email",{"email":email})
    .then((res)=>{
      router.push(`/forgot-password/code?email="${res.data.email}"`)
    })
    .catch((error)=>{
      switch(error.response.status){
        case 401: case 422: setError("Invalid Email!!");break;
        default: setError("Error!")
      }
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  return (
    <>
        <CardHeader className="flex flex-row justify-center items-center">
          {/*leave empty for layout*/}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="self-center text-[20px] text-gray-100">Forgot Password?</Label>
                <Label className="self-center text-[10px] text-gray-300">Provide your Email so we make sure its you!</Label>
                <Input type="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-black rounded-none border-b-4 border-myprim bg-gray-100" />
                <h1 className="text-red-500 text-sm text-bold">{error}</h1>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">

          <Button disabled={!email || is_loading}  onClick={handleSubmit}>
            {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue 
          </Button>
        </CardFooter>
    </>
  )
}

