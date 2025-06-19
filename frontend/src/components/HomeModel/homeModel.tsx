"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link";


type Home = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  image_url?: string;
};

type Props = {
  home: Home;
  onClose: () => void;
};

const HomeDetailModal = ({ home, onClose }: Props) => {


  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div
      className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50 font-inter"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="line-clamp-2">
        <h2 className="text-xl font-bold mb-4 text-color2 overflow-hidden">{home.title}</h2>
        </div>
        <Image 
        src={home.image_url as string} 
        alt={home.title} 
        width={400}     
        height={300}
        className="w-full rounded mb-4 object-cover h-[300px]" />
        
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        <p className="text-color3 text-lg">{home.description}</p>
        </div>
        <div className="">
        <p className="mt-4 text-color3 font-semibold"><span className="text-color2">Price: </span>{home.price} £</p>
        </div>
        <div className="overflow-hidden text-ellipsis font-semibold">
        <p className="font-semibold text-color3"><span className="text-color2 whitespace-nowrap overflow-hidden text-ellipsis font-semibold">Location: </span>{home.location}</p>
        </div>
        <span className="absolute right-2 top-2 inline-block p-2 text-2xl cursor-pointer"
        onClick={onClose}
        >x</span>

        {/* DATA PİCKER */}
        <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {date ? format(date, "PPP") : "Choose a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>


    <Link href={{
      pathname:"/ReservationConfirmation",
      query: {
        id:home.id,
        title:home.title,
        description:home.description,
        price:home.price,
        location:home.location,
        image_url:home.image_url,
        date:date?.toString(),
      }
  
    }}  
    >    
    <Button
        className="bg-primary mt-4 ml-4 text-md text-shadow text-color cursor-pointer" 
        onClick={onClose}
        >Rent Now
        </Button>
    </Link>
      </div>
    </div>
  );
};

export default HomeDetailModal;
