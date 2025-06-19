"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase.js'
import Image from 'next/image'
import { useHomeModel } from '../contex/HomeModalContext'
import HomeDetailModal from '../HomeModel/page'
import { useFilter } from "@/app/contex/FilterContext";

type Home = {
  id: number
  title: string
  description?: string
  price?: number
  location?: string
  image_url?:string
  created_at?: string
}

const Rent = () => {
  const [homes, setHomes] = useState<Home[]>([])
  const { selectedHome, openModel, closeModel } = useHomeModel()
  const { filter } = useFilter();

   useEffect(() => {
    const fetchRentals = async () => {

      const { data: rentalsData, error: rentalsError } = await supabase
        .from('rentals')
        .select('*')

      if (rentalsError) console.error('Rentals Error:', rentalsError)

      const combined = [ ...(rentalsData || [])]

      // created_at
      combined.sort((a, b) =>
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )

      setHomes(combined)
    }

    fetchRentals()
  }, [])

  const filteredHomes = homes.filter((home) => {
    const matchesLocation = filter.location
      ? home.location?.toLowerCase().includes(filter.location.toLowerCase())
      : true;

    const matchesMinPrice = filter.minPrice !== undefined && filter.minPrice !== null
      ? (home.price ?? 0) >= filter.minPrice
      : true;

    const matchesMaxPrice = filter.maxPrice !== undefined && filter.maxPrice !== null
      ? (home.price ?? 0) <= filter.maxPrice
      : true;

    return matchesLocation && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <>    
     <div className='mt-28 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 font-inter animated delay-100'>
      {filteredHomes.map((h) => (
        <div key={h.id} 
        className='m-3 shadow-lg  p-8 hover:translate-y-0.5 cursor-pointer max-w-[520px]'
        onClick={() => openModel(h)}
        >
          <div className='flex justify-center'>
          <h2 className='text-lg text-color2 text-shadow mb-2 font-bold line-clamp-1 w-[200px]'>{h.title}</h2>
          </div>
          {h.image_url && (
            <div className='flex justify-center'> 
            <Image
            src={h.image_url}
            alt={h.title}
            style={{ borderRadius: '10px' }}
            className="w-[300px] h-[200px] object-cover rounded-xl"
            width={300} 
            height={200}
            />
            </div>
          )}
          <div className=' justify-center ml-10'>
          <div className='mt-2'> 
          <p className='mt-5 text-color3 text-md text-shadow whitespace-nowrap overflow-hidden text-ellipsis line-clamp-2 w-[300px]'>{h.description}</p>
          </div>
          <div className='mt-2'>
          <p className='text-color3 font-semibold'><span className='text-color2'>Price: </span>{h.price} £</p>
          </div>
          <div className='mt-2'>
          <p className='text-color3 font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-[300px]'><span className='text-color2'>Location: </span>{h.location}</p>
          </div>
        </div>
        </div>
      ))}
    </div>
    {selectedHome && <HomeDetailModal home={selectedHome} onClose={closeModel} />}
    </>
  )
}

export default Rent
