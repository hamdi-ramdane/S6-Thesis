'use client'
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";


export function Navbar_ProdcutsItem(){
  const pathname = usePathname()
  return(
  <>
    <Link href="/products/category/trending">
      <Button className={pathname.startsWith("/products/category") ? "my-active-link": ""}>
        Products
        <PackageSearch className="pl-1"/>
      </Button>
    </Link>
    
  </>
  )
}