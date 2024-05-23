'use client'
import React from 'react'
import {
  LogOut,
  User,
  LayoutDashboard,
  Barcode,
  FolderKanban,
  GitPullRequestCreate,
  ShoppingBasket,
  UserRoundCog,
  BookA,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/app/context'

export const Navbar_DashboardItem = () => {
  const auth = useAuth()
  const pathname = usePathname()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button className={(pathname.startsWith("/dashboard") ? "my-active-link": "")+" bg-white text-black"}>
          Dashboard 
          <LayoutDashboard className='pl-1'/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 my-light-card">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem className='hover:bg-myprim border-none cursor-pointer'>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/my-orders">
            <DropdownMenuItem  className='hover:bg-myprim border-none cursor-pointer'>
              <ShoppingBasket className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/my-products">
            <DropdownMenuItem  className='hover:bg-myprim border-none cursor-pointer'>
              <FolderKanban className="mr-2 h-4 w-4" />
              <span>My Products</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard/manage-users" className={auth?.isAdmin ?'cursor-pointer': 'cursor-auto'}>
            <DropdownMenuItem disabled={!auth?.isAdmin}  className={`hover:bg-myprim border-none `}>
              <UserRoundCog className="mr-2 h-4 w-4" />
              <span>Manage Users</span>
              <DropdownMenuShortcut>Admin</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/listing-requests" className={auth?.isAdmin ?'cursor-pointer': 'cursor-auto'}>
            <DropdownMenuItem disabled={!auth?.isAdmin}  className='border-none'>
              <GitPullRequestCreate className="mr-2 h-4 w-4" />
              <span>Listing Requests</span>
              <DropdownMenuShortcut>Admin</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/manage-products" className={auth?.isAdmin ?'cursor-pointer': 'cursor-auto'}>
            <DropdownMenuItem disabled={!auth?.isAdmin}  className='hover:bg-myprim border-none '>
              <Barcode className="mr-2 h-4 w-4" />
              <span>Manage Products</span>
              <DropdownMenuShortcut>Admin</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/manage-orders" className={auth?.isAdmin ?'cursor-pointer': 'cursor-auto'}>
            <DropdownMenuItem disabled={!auth?.isAdmin}  className='hover:bg-myprim border-none '>
              <BookA className="mr-2 h-4 w-4"/>
              <span>Manage Orders</span>
              <DropdownMenuShortcut>Admin</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='bg-myprim border-none hover:bg-green-500' onClick={()=>{auth?.logout()}}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
