'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "./ui/label"
import { Card } from "./ui/card"
import Image from "next/image"
import { useEffect } from "react"
import axios from "axios"

export const ReviewsDrawer = ({productId}:{productId:number}) => {
    const [reviews,setReviews] = React.useState([
        {
            "id": 1,
            "user_fullname":"Hamdi Ramdane",
            "user_image":"/users/user_1.png",
            "user_email":"g3.hamdi.ramdane@gmail.com",
            "product_id": 1,
            "rating": 4,
            "comment": "Meh, I've bought expecting more than what I received.",
            "date": "2024-05-23"
        }
    ])
    useEffect(()=>{
        axios.get(`http://localhost:8000/review/${productId}`)
        .then((res)=>{
            setReviews(res.data.data)
        })
        .catch((error)=>{
        })
    },[])

  return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="bg-orange-400">Reviews</Button>
            </DrawerTrigger>
            <DrawerContent className="my-light-card h-[400px] w-[500px] mx-auto ">
                <DrawerDescription className="flex flex-col gap-3 justify-center py-4 pt-10 max-h-full h-[full] overflow-y-auto">
                {reviews.map((item)=>{
                    return(
                        <Card className="my-light-card flex gap-3 mx-auto w-[450px] min-h-[100px] h-100px overflow-hidden">
                            <aside>
                                <Image src={item.user_image} alt="user" width={100} height={200}/>
                            </aside>
                            <section className="flex flex-col justify-between py-2">
                                <Label className="flex items-center ">
                                    {"⭐".repeat(item.rating)}
                                    <span className="px-1 text-[20px]">{item.rating}.0</span>
                                </Label>
                                <Label className="text-[12px] text-gray-300">{item.user_email}</Label>
                                <p>{item.comment}</p>
                                <Label>Bought on: <span className="text-green-500">{item.date}</span></Label>
                            </section>
                        </Card>
                    )
                })
                }
                </DrawerDescription>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button>Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
  )
}
