"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFilter } from "@/app/contex/FilterContext";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Menu } from 'lucide-react';
import { X } from 'lucide-react';

const Navbar = () => {
    
 const [scrolled, setScrolled] = useState(false);
 const [ user,setUser ] = useState<User | null>(null);
 const [menuOpen, setMenuOpen] = useState(false);
 const pathname = usePathname();
 const isHome = pathname === "/";
 const { openFilter } = useFilter();
 const router = useRouter();


  useEffect(()=>{
      const getUser = async() => {
        const {data: {user} } = await supabase.auth.getUser();
        setUser(user);
      }
      getUser();
       const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.subscription.unsubscribe();
  };
}, []);





      useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);


      return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleLogout = async() => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/Login") 
  }

  return (
    <nav className= { `w-full h-16 p-12 flex justify-center fixed top-0 left-0 transition-colors duration-500 z-50 text-color shadow-md ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}>


        {/* Logo */}
    <div className="flex items-center justify-center">
    <div className="absolute left-2 top-2 items-center flex">
     <Link href={"/"}>
      <Image 
      src={"/rent-icon3_img.png"} 
      alt="rental-icon"
      width={90}
      height={70}
      style={{ width: '90px', height: 'auto' }}
      priority  
/>

        {/* Desktop Menu  */}
     </Link> 
    </div>
        <ul className={`flex gap-12 space-x-1 cursor-pointer text-inter text-shadow text-inter text-shadow ${isHome ? "text-color": scrolled ? "text-color" : "text-color2"} hidden md:flex` }>
           <Link href={"/Rent"} className={`hover:-translate-y-0.5 hover:text-color3 font-bold text-2xl`}><li>Rental Listings</li></Link>
           <Link href={""} className='hover:-translate-y-0.5 font-bold text-2xl'onClick={openFilter}><li>Filter</li></Link>
          <Link href={"/PostRental"} className='hover:-translate-y-0.5 font-bold text-2xl'><li>Post a Rental</li></Link>
          <Link href={"/AboutUs"} className='hover:-translate-y-0.5 font-bold text-2xl'><li>About Us</li></Link>
           <Link href={"/Contact"} className='hover:-translate-y-0.5 font-bold text-2xl'><li>Contact</li></Link>
        </ul>
        
        {/* Mobil Menu  Toggle*/}
        <div className='md:hidden absolute right-2'>
          <Button className={`${scrolled ? "bg-blue-600" : "bg-primary"} cursor-pointer`} onClick={() => setMenuOpen(!menuOpen)} >
            {menuOpen ? <X className='w-6 h-6'/> : <Menu className="h-12 w-12"/>}
          </Button>
        </div>


       {/* Mobile Dropdown Menu */}
       {menuOpen && (
        <div className="absolute top-16 right-0 w-1/2 bg-primary flex flex-col items-center py-4 shadow-md md:hidden rounded-2xl">
          <Link href="/Rent" className="py-2 font-bold" onClick={() => setMenuOpen(false)}>Rental Listings</Link>
          <button onClick={() => { openFilter(); setMenuOpen(false); }} className="py-2 font-bold">Filter</button>
          <Link href="/PostRental" className="py-2 font-bold" onClick={() => setMenuOpen(false)}>Post a Rental</Link>
          <Link href="/AboutUs" className="py-2 font-bold" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href="/Contact" className="py-2 font-bold" onClick={() => setMenuOpen(false)}>Contact</Link>
          {user ? (
            <Button variant="outline" onClick={handleLogout} className="mt-4 w-[80%] border-color text-black">Logout</Button>
          ) : (
            <Link href="/Login" className="w-[80%]" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="mt-4 w-full border-color text-black cursor-pointer">Login</Button>
            </Link>
          )}
        </div>
      )}







      {/* Login-Logout */}
    <div className="absolute right-3 items-center justify-center rounded-md h-9 shadow-sm text-shadow-md hidden md:flex">
      {user ? 
      (<Button 
        variant="outline" 
        onClick={handleLogout}
        className='cursor-pointer border-color text-black'>Logout</Button>)
      : 
      (<Link href={"/Login"}><Button variant="outline" className='cursor-pointer border-color text-black'>Login</Button></Link>)}
    </div>
    </div>
  </nav>
  )
}

export default Navbar