'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Profile = {
  first_name: string;
  last_name: string;
  phone: string;
};

const Page = () => {
  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const location = searchParams.get("location");
  const image_url = searchParams.get("image_url");
  const price = searchParams.get("price");
  const date = searchParams.get("date");

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, phone")
          .eq("user_id", user.id)
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

  if (loadingProfile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto font-inter mt-26">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2">
        <div>
      <h1 className="text-2xl font-bold mb-4 text-color2">Reservation Confirmation</h1>

      {image_url && (
        <Image
          src={image_url}
          alt={title ?? "Reservation Image"}
          width={500}
          height={300}
          className="rounded w-full max-w-lg mb-4 h-[500px]"
        />


      )}

      <div className="space-y-2 mb-8">
        <p className="text-lg font-semibold text-color2">{title}</p>
        <p className="text-base font-semibold text-color3">{description}</p>
        <p className="font-semibold text-color3"><span className="text-color2">Location:</span> {location}</p>
        <p className="font-semibold text-color3"><span className="text-color2">Price:</span> £{price}</p>
        <p className="font-semibold text-color3"><span className="text-color2">Date:</span> {new Date(date!).toLocaleDateString()}</p>
      </div>
      </div>


        {/* Maps */}
       <div className="overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 text-color2">United Kingdom Address Information</h2>
          <div className="w-full h-[500px] aspect-video border rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.563160%2C51.280430%2C0.278970%2C51.683979&layer=mapnik"
              className="w-full h-full border-none"
              title="UK Map"
              loading="lazy"
            />
          </div>
        </div>
</div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* User Info Card */}
        <Card className="w-full shadow-xl rounded-2xl">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold text-color2">User Information</h2>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                defaultValue={profile?.first_name ?? ""}
                placeholder="First Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                defaultValue={profile?.last_name ?? ""}
                placeholder="Last Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                defaultValue={profile?.phone ?? ""}
                placeholder="Phone Number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={user?.email ?? ""}
                placeholder="Email"
                readOnly
              />
            </div>

            <Button className="w-full mt-4 cursor-pointer">Update</Button>
          </CardContent>
        </Card>

        {/* Payment Card */}
        <Card className="w-full shadow-xl rounded-2xl">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold text-color2">Payment Information</h2>

            <div className="space-y-2">
              <Label htmlFor="cardName">Full Name</Label>
              <Input id="cardName" placeholder="Full Name" />
            </div>

             <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="United Kingdom" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-2 w-full sm:w-1/2">
                <Label htmlFor="expiryDate">Expiration Date</Label>
                <Input id="expiryDate" placeholder="MM/YY" />
              </div>
              <div className="space-y-2 w-full sm:w-1/2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" type="password" />
              </div>
            </div>

            <Button className="w-full mt-4 cursor-pointer">Complete Payment</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
