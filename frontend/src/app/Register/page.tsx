"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const Page = () => {
  
    const router = useRouter();

    const [form,setForm] = useState({           
      first_name : '',
      last_name: '',
      phone:'',
      email:'',
      password:''
    });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({...form, [e.target.name]:e.target.value})
    };


    const handlerRegister = async() => {

       const { email, password, first_name, last_name, phone } = form;

    // Basit validasyon
    if (!email || !password || !first_name || !last_name || !phone) {
      toast.error("Please Fill Full Form!.");
      return;
    }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const { data,error } = await supabase.auth.signUp({
        email:form.email,
        password:form.password
      })

      
          if (error) {
            toast.error(error.message);
            return;
          }


          const userId = data.user?.id;
             if (userId) {
               const { error: profileError } = await supabase.from("profiles").insert([
                 {
                   user_id: userId,
                   first_name: form.first_name,
                   last_name: form.last_name,
                   phone: form.phone,
                 },
               ]);
         
               if (profileError) {
                 toast.error("Profile creation error:" + profileError.message);
               } else {
                toast.success("success")
                console.log("userId:", userId);
                 router.push("/Login");
               }
             }
           };
  
  
  return (
       <div className='mt-24 flex  w-full h-[814px]'>
      
      {/* Register İmage */}
      <div className='background-image-login w-full lg:w-1/2 h-64 hidden lg:block lg:h-[814px]'>
      </div>
     
       {/* Register Main  */}
      <div className='lg:w-1/2 w-full bg-[#111c1e]'>
      
      <div className='ml-8 lg:ml-72 mt-20 lg:mt-32 font-bold text-2xl'>
      <h3 className='text-color2 lg:ml-38 inline-block ml-38'>Register</h3>





      <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
        <Label htmlFor="first_name" className='text-color'>First Name</Label>
        <Input 
        type="text"   
        id="first_name" 
        name="first_name"
        placeholder="Enter your first name" 
        className='text-color' 
        value={form.first_name}
        onChange={handlerChange}
        />
        
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
        <Label htmlFor="last_name" className='text-color'>Last Name</Label>
        <Input 
        type="text" 
        id="last_name"
        name="last_name" 
        placeholder="Enter your last name" 
        className='text-color'
        value={form.last_name}
        onChange={handlerChange}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
        <Label htmlFor="phone" className='text-color'>Phone</Label>
        <Input 
        type="text" 
        id="phone" 
        name="phone"
        placeholder="+1 234 567 8901" 
        className='text-color' 
        value={form.phone}
        onChange={handlerChange}
        />
      </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
        <Label htmlFor="email" className='text-color'>Email</Label>
        <Input 
        type="email" 
        id="email"
        name="email" 
        placeholder="you@example.com" 
        className='text-color' 
        value={form.email}
        onChange={handlerChange}
        />
      </div>

       <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
        <Label htmlFor="password" className='text-color'>Password</Label>
        <Input 
        type="password" 
        id="password" 
        name="password"
        placeholder="********" 
        className='text-color' 
        value={form.password}
        onChange={handlerChange}
        />
      </div>

      <div className='mt-3'>
        <Link href={"/Login"}>
        <p className='text-color2 cursor-pointer'>Login</p>
        </Link>
      </div>  
      <div className='mt-5'>
        <Button onClick={handlerRegister} className='bg-white text-zinc-900 cursor-pointer hover-bg-primary hover:-translate-y-1 w-full max-w-sm'>Sign Up</Button>
      </div>
      </div>
      </div> 
    </div>
  )
}

export default Page
