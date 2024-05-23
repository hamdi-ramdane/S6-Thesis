'use client'
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const quotes = [
    ["",""],
    ["Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.","Master oogway"],
    ["Do or do not. There is no try.", "Yoda, Star Wars"],
    ["In three words I can sum up everything I've learned about life: It goes on.", "Robert Frost"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela"],
    ["It does not do to dwell on dreams and forget to live.", "Albus Dumbledore, Harry Potter"],
    ["The only thing necessary for the triumph of evil is for good men to do nothing.", "Edmund Burke"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["The journey of a thousand miles begins with one step.", "Lao Tzu"],
    ["Life is what happens when you're busy making other plans.", "John Lennon"],
    ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["The best time to plant a tree was 20 years ago. The second best time is now.", "Chinese Proverb"],
    ["Life is what happens when you're busy making other plans.", "John Lennon"],
    ["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Nelson Mandela"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
    ["It's not whether you get knocked down, it's whether you get up.", "Vince Lombardi"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"],
    ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", "Albert Schweitzer"],
    ["Life is 10% what happens to us and 90% how we react to it.", "Charles R. Swindoll"],
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["The journey of a thousand miles begins with one step.", "Lao Tzu"],
    ["Life is what happens when you're busy making other plans.", "John Lennon"],
    ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
    ["You miss 100% of the shots you don't take.", "Wayne Gretzky"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["The best time to plant a tree was 20 years ago. The second best time is now.", "Chinese Proverb"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
    ["It's not whether you get knocked down, it's whether you get up.", "Vince Lombardi"],
    ["The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"]
  ]
  const [quoteIndex,setQuoteIndex] = useState(0)
  useEffect(()=>{
    setQuoteIndex(Math.floor(Math.random() * quotes.length)+1)
  },[])

  return (
    <section className="bg-transparent flex rounded-md min-h-[450px] overflow-hidden border-myprim border-[1px] shadow-2xl shadow-gray-950  ">
      <Card className="w-[350px] bg-[#18181B] rounded-none text-gray-200 border-none flex flex-col justify-between py-3 px-4 font-serif 
        max-md:hidden">
        <div className="flex items-center gap-2 text-[17px]">
          <Image src="/images/ntic_bw.png" alt="NTIC" width="35" height="35"/>
          <h1>Sponsered by NTIC</h1>
        </div>
        <div className="text-[15px] flex flex-col gap-2">
          <h1>"{quotes[quoteIndex][0]}"</h1>
          <h1 className="text-[12px]"> - {quotes[quoteIndex][1]}</h1>
        </div>
      </Card>
      <Card className="w-[350px] flex flex-col justify-between rounded-none border-none bg-[#09090B] text-white"> 
        {children}
      </Card>
   </section> 

  );
}

