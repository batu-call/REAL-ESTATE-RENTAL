"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Profile = {
  first_name: string
  last_name: string
  phone: string
}

const ProfileInfo = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, phone')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div>
      <p><strong>First Name:</strong> {profile.first_name}</p>
      <p><strong>Last Name:</strong> {profile.last_name}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
  );
};

export default ProfileInfo;
