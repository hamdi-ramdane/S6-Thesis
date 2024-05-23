'use client'
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  function handleLogout(){
    auth?.logout()
  }
  const active_link = "bg-green-500 hover:bg-green-600"
  return (
    <section className="flex items-center rounded-xl gap-3 h-[480px] w-[1000px] mt-4">
        <nav className="flex flex-col justify-between px-3 gap-3 py-2 h-full my-black-card w-[220px]">
          <div className="flex flex-col gap-3 text-center">
            <Link href="/dashboard/profile">
              <Button className={`w-full ${pathname.endsWith("/profile") && active_link}`}>Profile</Button>
            </Link>
            <Link href="/dashboard/my-orders">
              <Button className={`w-full ${pathname.endsWith("my-orders") && active_link}`}>My Orders</Button>
            </Link>
            <Link href="/dashboard/my-products">
              <Button className={`w-full ${pathname.endsWith("my-products") && active_link}`}>My Products</Button>
            </Link>
            {auth?.isAdmin && 
            <>
              <Label>Admin</Label>
              <Separator/>
              <Link href="/dashboard/manage-users">
                <Button className={`w-full ${pathname.endsWith("/manage-users") && active_link}`}>Manage Users</Button>
              </Link>
              <Link href="/dashboard/listing-requests" >
                <Button className={`w-full ${pathname.endsWith("/listing-requests") && active_link}`}>Listing Requests</Button>
              </Link>
              <Link href="/dashboard/manage-products">
                <Button className={`w-full ${pathname.endsWith("/manage-products") && active_link}`}>Manage Products</Button>
              </Link>
              <Link href="/dashboard/manage-orders">
                  <Button className={`w-full ${pathname.endsWith("/manage-orders") && active_link}`}>Manage Orders</Button>
              </Link>
            </>
            }
          </div>
          <div className="flex flex-col gap-2">
            <Separator/>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </nav>
        <main className="bg-red-400 rounded-sm h-full my-light-card py-2 px-4 w-[900px]">
            {children}
        </main>
   </section> 
  );
}

