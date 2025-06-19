"use client"
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { Label } from '@radix-ui/react-label';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

    type Profile = {
    first_name:string;
    last_name:string;
    phone:string;
  };


const PostRental = () => {


      const [user, setUser] = useState<User | null>(null);
      const [profile, setProfile] = useState<Profile | null>(null);
      const [loadingProfile, setLoadingProfile] = useState(true);
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [price, setPrice] = useState('');
      const [location, setLocation] = useState('');
      const [imageFile, setImageFile] = useState<File | null>(null);
      




        useEffect(() => {
      const getUserAndProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
  
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('first_name, last_name, phone')
            .eq('user_id', user.id)
            .single();
  
          if (error) {
            console.error("Profile fetch error:", error);
          } else {
            setProfile(data);
          }
        }
        setLoadingProfile(false);
      };
  
      getUserAndProfile();
    }, []); 


    const handlerPostRent = async() => {
      if(!user){
        return toast("User is not logged in")
      }

      let imageUrl = '';
      if(imageFile){
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `rentals/${Date.now()}-${user.id}.${fileExt}`

        const {error:uploadError } = await supabase.storage.from("rental-images").upload(filePath, imageFile);

        if(uploadError){
          toast(`Failed to save the listing: ${uploadError.message}`);
          return
        }

        const {data:publicUrlData} = supabase.storage.from('rental-images').getPublicUrl(filePath)
        imageUrl = publicUrlData.publicUrl;   
        }

        const {error} = await supabase.from('rentals').insert([
          {
          user_id:user.id,
          title,
          description,
          price:parseFloat(price),
          location,
          image_url:imageUrl,
          available: true,
          created_at : new Date(),
        }
      ])
     

       if (error) {
      console.error('Rental insert error:', error.message);
      toast(`Ad could not be added: ${error.message}`);
    } else {
      toast.success('Ad added successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setLocation('');
      setImageFile(null);
    }
};



     if (loadingProfile) return <p>Loading profile...</p>;

  return (
    <div className='container mx-auto px-4 py-10 mt-24'>
       <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-xl rounded-2xl ">
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold text-color2">User Information</h2>

         <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              defaultValue={profile?.first_name ?? ''}
              placeholder="First Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              defaultValue={profile?.last_name ?? ''}
              placeholder="Last Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              defaultValue={profile?.phone ?? ''}
              placeholder="Phone Number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              defaultValue={user?.email ?? ''}
              placeholder="Email"
              readOnly
            />
          </div>
         <Button className='w-full mt-4 cursor-pointer'>
            Update
          </Button>
      </CardContent>
    </Card>

  
         <Card className="w-full max-w-md p-6 shadow-lg rounded-xl">
        <CardContent className="space-y-4">
          <h2 className="text-xl font-bold text-color2">Listing Information</h2>
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
           <div>
      <Label htmlFor="file-upload" className="block mb-2 cursor-pointer text-primary">
        Upload Image
      </Label>

      <input
        id="file-upload"
        type="file"
        className="hidden "
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      <Button
        variant="outline"
        onClick={() => {
          const input = document.getElementById('file-upload')
          input?.click()
        }}
        className='text-color3 cursor-pointer'
      >
        {imageFile ? imageFile.name : "Choose File"}
      </Button>
    </div>
          <Button className="w-full mt-4 cursor-pointer" onClick={handlerPostRent}>
            Publish Listing
          </Button>
        </CardContent>
      </Card>
    </div>
    </div>

  )
}

export default PostRental