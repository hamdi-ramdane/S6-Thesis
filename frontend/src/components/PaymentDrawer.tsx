'use client'
import {useState} from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import axios from "axios"
import { useCartStore } from "@/store"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Cookies from "universal-cookie"

export const PaymentDrawer = () => {
    const [formData,setFormData] = useState({
        "products": [""],
        "address":"",
        "total_price":0,
        "date":"2029-09-02"
    })
    const totalPrice = useCartStore((state)=>state.totalPrice)
    const cart = useCartStore((state)=>state.cart)
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false) 
    function handleSubmit(){
        const data = formData
        setIsLoading(true)
        data.total_price = totalPrice
        data.products = []
        for(let i = 0;i<cart.length;i++){
            data.products.push(cart[i].name)
        }
        const cookies = new Cookies()
        const token = cookies.get("jwt_token")
        axios.post(`http://localhost:8000/product/order`,data, 
        { headers: {"Authorization" : `Bearer ${token}`} })
        .then((res)=>{
            router.push("/")
        })
        .catch((error)=>{
        console.log(error.response.data)
        })
        .finally(()=>{
            setIsLoading(false)
        })   
    }
    function handleInputChange(event:any){
        const {name,value} = event.target
        setFormData({...formData,"address":value})
    }
    return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button >Payment</Button>
                </DrawerTrigger>
                <DrawerContent className='h-[80%] bg-transparent border-none'>
                    <Card className="mx-auto w-full h-full max-w-sm my-light-card overflow-hidden py-3 px-4 flex flex-col justfiy-between ">
                        <main className="flex flex-col gap-3">
                            <Input placeholder="Address" value={formData.address} onChange={handleInputChange} className="my-input"/>
                            <Input placeholder="Company (optional)" value="" className="my-input"/>
                            <Input placeholder="Country" className="my-input"/>
                            <Input placeholder="Phone" className="my-input"/>
                            <div className="flex gap-3">
                                <Input placeholder="Country" className="my-input"/>
                                <Input placeholder="Postal Code" className="my-input"/>
                            </div>
                            <Input placeholder="Postal Code" className="my-input"/>
                        </main>
                        <DrawerFooter>
                            <Button onClick={handleSubmit} disabled={isLoading || formData.address == ""}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </Card>
                </DrawerContent>
            </Drawer>
  )
}
