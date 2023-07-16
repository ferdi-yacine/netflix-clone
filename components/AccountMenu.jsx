"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

const AccountMenu = ({visible}) => {
    if (!visible) {
        return null
    }
  
    return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800'>
        <div className='flex flex-col gap-3'>
            <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                <Image className='rounded-md' src="/images/default-red.png" width={32} height={32} alt='Profile'/>
                <p className='text-white text-sm group-hover/item:underline'>Username</p>
            </div>
            <hr className='bg-gray-600 border-0 h-px my-4' />
            <div onClick={() => signOut()} className='px-3 text-center text-white text-sm hover:underline'>
                Sign Out
            </div>
        </div>
    </div>
  )
}

export default AccountMenu