'use client'
import { Navbar_AuthItem, Navbar_CartItem ,Navbar_DashboardItem, Navbar_ProdcutsItem} from '@/components'
import { useAuth } from '@/app/context'
import { Navbar_ListProductsItem } from './navbar/Navbar_ListProductsItem'
import { Navbar_Logo } from './navbar/Navbar_Logo'
import { Navbar_HomeItem } from './navbar/Navbar_HomeItem'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Navbar(){
  const auth = useAuth()
  return (
    <header className=" w-full absolute px-5 py-3 overflow-hidden">
      <nav className='flex justify-between gap-5 sticky '>
        <div className='flex gap-5 w-full'>
          <Navbar_Logo/>
          {/* <Navbar_SearchBar/> */}
        </div>
        <MobileNav/>
        <div className='flex gap-3 max-md:hidden'>
          <Navbar_HomeItem/>
          <Navbar_ProdcutsItem/>
          <Navbar_CartItem/>
          {auth?.isLogged && <Navbar_ListProductsItem/> }
          {auth?.isLogged && <Navbar_DashboardItem  />}
          {!auth?.isLogged && <Navbar_AuthItem />} 
        </div>

      </nav>
    </header>
    
  )
}


function MobileNav(){
  return(
    <Drawer >
      <DrawerTrigger asChild className='md:hidden'>
          <Menu className='text-white text-[50px]'/>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col justfiy-center items-center gap-2 my-light-card h-[80%] '>
        <div className='h-full flex flex-col gap-2 w-full items-center py-4 px-2'>
          <Link href='/' className='w-full'><Button className='w-full'>Home</Button></Link>
          <Link href='/products/category/trending' className='w-full'><Button className='w-full'>Trending</Button></Link>
          <Link href='/products/category/trending' className='w-full'><Button className='w-full'>Products</Button></Link>
          <Link href='/products/new' className='w-full'><Button className='w-full'>List Product</Button></Link>
          <Link href='/login' className='w-full'><Button className='w-full'>Login</Button></Link>
          <Link href='/register' className='w-full'><Button className='w-full'>Register</Button></Link>
        </div>

      </DrawerContent>
    </Drawer>
  )
}