"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation';

const Page = () => {

  const router = useRouter();

  const [form,setForm] = useState({
    email:'',
    password:'',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form,[e.target.name]: e.target.value});
  }

  const handleLogin = async () => {
    if(!form.email || !form.password){
      toast.error("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Login successful!");
      console.log("User Info", data.user);
      router.push("/");
    }
  };

  return (
    <div className='mt-24 flex overflow-hidden w-full h-[814px]'>
      <div className='background-image-login w-1/2 h-screen hidden lg:block'>
      </div>
      {/* Login Form */}
      <div className='bg-[#111c1e] w-full lg:w-1/2'>
        <div className='ml-8 mr-8 lg:ml-72 mt-20 lg:mt-72 font-bold text-2xl'>
          <h3 className='text-color2 inline-block lg:ml-38 ml-32'>Login</h3>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-12">
            <Label htmlFor="email" className='text-color'>Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email"
              placeholder="you@example.com" 
              value={form.email}
              onChange={handleChange} 
              className='text-color'
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-8">
            <Label htmlFor="password" className='text-color'>Password</Label>
            <Input 
              type="password" 
              id="password" 
              name='password'
              placeholder="********"
              value={form.password}
              onChange={handleChange} 
              className='text-color'
            />
          </div>

          <div className='mt-3'>
            <Link href={"/Register"}>
              <p className='text-color2 cursor-pointer'>Register</p>
            </Link>
          </div>

          <div className='mt-5'>
            <Button 
              className='bg-white text-zinc-900 cursor-pointer hover-bg-primary hover:-translate-y-1 w-full max-w-sm'
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default Page;
