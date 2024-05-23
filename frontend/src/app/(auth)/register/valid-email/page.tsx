'use client'
import { POSTDATA } from "@/app/api"
import { useAuth } from "@/app/context"
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
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Register(){
  const [is_loading ,setIsLoading ] = useState(false)
  const [error,setError] = useState("")
  const auth = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData,setFormData] = useState({
    email:String(searchParams.get("email")),
    first_name: "",
    last_name:"",
    password:"",
  })
  const [errors,setErrors] = useState({
    is_fullname_invalid:false,
    is_short_password:false,
  })

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    // check if fullname is valid
    const pattern = /^[a-zA-Z]+$/;
    const is_valid = !pattern.test(formData.first_name) || !pattern.test(formData.last_name) 
      || formData.first_name.length + formData.last_name.length >14
      || formData.first_name.length + formData.last_name.length <5
      
    if(name == "first_name" || name == "last_name"){
      setErrors({...errors,is_fullname_invalid:is_valid})
    }
    // check if password is too short
    if(name == "password"){
      setErrors({...errors,is_short_password:(value.length<8)})
    }
    //-----
    setFormData({ ...formData, [name]: value });
  };

  function handleRegister(){
    setIsLoading(true)
    setError("")
    axios.post("http://localhost:8000/auth/register",formData)
    .then((res)=>{
      auth?.register(res.data.token,res.data.is_admin)
    })
    .catch((error)=>{
      setError("Error!")
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }

  return (
    <>
      <CardHeader className="flex ">
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your own account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <Input disabled type="email" name="email" placeholder="Email" value={formData.email} className="text-black rounded-none border-b-4 border-myprim bg-gray-100" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label >Full Name</Label>
              <div className="flex gap-2">
                <Input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleInputChange} className="text-black rounded-none border-b-4 border-myprim bg-gray-100" />
                <Input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleInputChange} className="text-black rounded-none border-b-4 border-myprim bg-gray-100" />
              </div>
              <h1 className="text-red-500 text-sm">{errors.is_fullname_invalid && "Invalid Fullname (a-z) (between 5-14)"}</h1>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label >Password</Label>
              <Input type="password" name="password" placeholder="Minimum 8 Characters" value={formData.password} onChange={handleInputChange} className="text-black rounded-none border-b-4 border-myprim bg-gray-100" />
              <h1 className="text-red-500 text-sm">{errors.is_short_password  && "Password Too Short (Minimum 8)"}</h1>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <h1 className="text-red-500 text-sm text-bold">{error}</h1>
        <Button variant="ghost" onClick={()=>router.back()}>Back</Button>
        <Button  disabled={formData.password == "" || errors.is_fullname_invalid ||errors.is_short_password || is_loading} onClick={handleRegister}>
          {is_loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Register
        </Button>
      </CardFooter>
    </>
  )
}


