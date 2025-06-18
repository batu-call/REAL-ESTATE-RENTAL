import React from 'react'
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const Main = () => {
  return ( 
    <div className='mt-24 h-[90vh] relative w-full anime delay-14' >
      <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mt-24 leading-loose z-10 absolute top-8 text-center sm:text-left'>
        <h3 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-color ml-16 text-shadow-lg font-bold animated delay-100 text-wrap'>
            Find Your Perfect Rental Home Today
        </h3>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-color p-3 mt-14  top-26 left-16 ml-12 text-shadow-md font-bold animated delay-100  inline-block'>
            Browse thousands of rental listings and find the one that suits you best. Fast, safe, and simple
        </p>
        <Link href={"/Rent"}>
        <Button variant="ghost" className='bg-primary cursor-pointer text-color w-44 animated delay-100 ml-14 sm:w-56'>Start Renting Now       
          <ChevronRight />
        </Button>
        </Link>
        </div>
    </div>
    
  )
}

export default Main
