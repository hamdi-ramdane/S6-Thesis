import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    console.log("middleware running")
    const pathname = request.nextUrl.pathname
    const is_token = !!request.cookies.get("jwt_token")
    if(pathname == "/login" || pathname.startsWith("/register") || pathname.startsWith("/forgot-password"))
        if(is_token)
            return NextResponse.redirect(new URL("/", request.url))
    if(pathname.startsWith("/cart") || pathname.startsWith("/dashboard") || pathname.startsWith("/products/new"))
        if(!is_token)
            return NextResponse.redirect(new URL("/login", request.url))
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"
    ,"/cart",
    "/products/new",
    "/login",
    "/register/:path*",
    "/forgot-password/:path*"],
}

