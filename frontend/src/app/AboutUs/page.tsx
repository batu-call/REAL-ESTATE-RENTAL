import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const AboutUs = () => {
  return (
  <div className="absolute top-[20%] w-[2000px] min-h-[400px] max-w-[80%] p-16 left-1/2 -translate-x-1/2 pr-[30%] box-border text-color2 [text-shadow:0_5px_10px_#0004] shadow-2xl mb-12">
    
    <p className="font-bold tracking-[8px] animated delay-100">Real Estate</p>

    <h1 className="font-bold text-[5em] leading-[1.3em] animated delay-120">Batu</h1>

    <h2 className="font-bold text-[5em] leading-[1.3em] text-color2 animated delay-140">Real Estate</h2>

    <div className="animated delay-140">
      <p className="mt-4">Homes for Rent</p>
    </div>

    <div className="grid grid-cols-[130px_130px] mt-5 animated delay-140">
      <Link href={"/Rent"}>
      <Button variant={'outline'} className='cursor-pointer border-color bg-primary text-white'>Rental Listings</Button>
      </Link>
      <div>
      <Link href={"/PostRental"}>
      <Button variant={'outline'} className='cursor-pointer border-color text-black hover-bg-primary hover:text-white'>Post a Rental</Button>
      </Link>
      </div>
  </div>
  <div className='ml-140 absolute top-0 animated delay-160'>
    <h2 className='text-color2 text-[2em] text-shadow-xl font-bold p-12'>Simple, Safe, and Accessible Rental Experience for Everyone.</h2>
    <p className='font-inter text-color3 text-xl'>Renting a home doesn’t have to be complicated or stressful. We started this journey with one goal in mind: to make the rental process easier, faster, and more reliable.

With us, you won’t get lost in hundreds of listings. Instead, you’ll find the home that suits your needs with just a few clicks. Our mission is not just to help you rent a house, but to help you find a place to call home.</p>
  </div>
  </div>

  )
}

export default AboutUs