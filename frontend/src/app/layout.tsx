import type { Metadata } from "next";
import "./globals.css";
import {Navbar,Footer} from '../components'; 
import { AuthProvider } from "./context";


export const metadata: Metadata = {
  title: "Nomady",
  description: "North African Marketplace - by Hamdi Ramdane",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={"relative h-full font-sans antialiased"}>
        <AuthProvider>
          <Navbar/>
          <main className="flex flex-col justify-center items-center min-h-screen bg-[#1C1917] px-6 pt-7">
              {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
