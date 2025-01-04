"use client";
import React from 'react';
import Image from 'next/image';
import ShinyButton from '../ui/shiny-button';
import { useRouter } from 'next/navigation';

function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem('userDetails');
    // reload the page
    window.location.reload();
    // return await router.replace('/signup');
  };

  return (
    <div suppressHydrationWarning>
      <div className='flex flex-col items-center p-3 gap-4'>
        <div>
          <Image
            src="https://i-venture.org/wp-content/uploads/2022/07/Saumya.png"
            alt="Bot"
            width={500}
            height={500}
            draggable={false}
            className="h-24 w-24 rounded-3xl object-cover object-center" />
        </div>
        <div className='text-center'>
          <p className='font-semibold'>Saumya Kumar</p>
          <p className='text-xs'>i-venture@isb.edu</p>
        </div>
      </div>
      <p className='text-center text-sm underline cursor-pointer' onClick={handleLogout}>
        Log out
      </p>
    </div>
  );
}

export default Profile;
