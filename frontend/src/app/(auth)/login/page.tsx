'use client'
import { Button} from "@/components/ui/button"
import {
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState} from "react"
import { Loader2} from "lucide-react"
import {useRouter} from 'next/navigation'
import { useAuth } from "@/app/context"
import axios from 'axios'

export default function Login(){
  const auth = useAuth()
  const router = useRouter()
  const [error,setError] = useState("")
  const [is_loading ,setIsLoading ] = useState(false)
  const [formData,setFormData] = useState({
    email: "",
    password: ""
  })

  function handleLogin(){
    setError("")
    setIsLoading(true)
    axios.post("http://localhost:8000/auth/login",formData)
    .then((res)=>{
      auth?.login(res.data.token,res.data.is_admin)
      router.push('/')
    })
    .catch((error)=>{
      switch(error.response.status){
        case 401: case 422: setError("Invalid Credentials");break;
        default: setError("Error!")
      }
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <>
      <CardHeader className="flex flex-row justify-center items-center">
        <div className="flex gap p-3  rounded-sm">
          <Button className="w-[100px] rounded-none border-r-2 border-mysec">Login</Button>
          <Link href="/register">
            <Button className="w-[100px] rounded-none bg-mysec">Register</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="self-center text-[20px] text-gray-100">Welcome Back</Label>
              <Label className="self-center text-[10px] text-gray-300">Make sure to logout when you're done!</Label>
              <Input name="email" type="email" placeholder="Email..." onChange={handleInputChange} value={formData.email} className="text-black rounded-none border-b-4 border-myprim bg-gray-100"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input name="password" type="password" placeholder="Password..." onChange={handleInputChange} value={formData.password} className="text-black rounded-none border-b-4 border-myprim bg-gray-10"/>
            </div>
          </div>
        </form>
        <Link href="/forgot-password" className="text-[14px] text-blue-500 hover:text-red-400" >Forgot Password?</Link>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <h1 className="text-red-500 text-sm">{error}</h1>
        <Button disabled={formData.password == "" || formData.email == "" || is_loading} onClick={handleLogin}>
          {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
          </Button>
      </CardFooter>
    </>
  )
}

