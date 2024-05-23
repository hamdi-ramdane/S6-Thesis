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

export default function Register(){

  const router = useRouter(); 
  const [error,setError] = useState("")
  const [email,setEmail] = useState("")
  const [is_loading ,setIsLoading ] = useState(false)

  function handleSubmit(){
    setError("Checking if Email is real...")
    setIsLoading(true)
    axios.post("http://localhost:8000/auth/register/email",{"email":email})
    .then((res)=>{
      router.push(`/register/valid-email?email=${email}`);
    })
    .catch((error)=>{
      switch(error.response.status){
        case 401: setError("Email Does not exist");break;
        case 422: setError("Not an email format");break;
        case 409: setError("Email Already used");break;
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
          <div className="flex gap p-3  rounded-sm">
            <Link href="/login">
              <Button className="w-[100px] rounded-none border-r-2 border-mysec bg-mysec">Login</Button>
            </Link>
            <Button className="w-[100px] rounded-none ">Register</Button>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="self-center text-[20px] text-gray-100">Create Your Own Account</Label>
                <Label className="self-center text-[10px] text-gray-300">You're able to use one email per account, choose carefully!</Label>
                <Input type="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-black rounded-none border-b-4 border-myprim bg-gray-10" />
              </div>
            </div>
          <Link href="/login" className="text-[14px] text-blue-500 hover:text-red-400" >Already Have an Account?</Link>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <h1 className="text-red-500 text-sm text-bold">{error}</h1>
          <Button disabled={!email || is_loading}  onClick={handleSubmit}>
            {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue 
          </Button>
        </CardFooter>
    </>
  )
}


