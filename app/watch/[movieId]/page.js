"use client"

import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from "react-icons/ai"
import React from 'react'

const Watch = ( movieId ) => {
    const router = useRouter();
    const id = movieId.params.movieId

    const { data } = useMovie(id)
     
  return (
    <div className='h-screen w-screen bg-black'>
        <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
            <AiOutlineArrowLeft onClick={() => router.push("/")} className='text-white cursor-pointer' size={40} />
            <p className='text-white text-1xl md:text-3xl font-bold'>
                <span className='font-light mr-2'>
                    Watching: 
                </span>
                {data?.title}
            </p>
        </nav>
        <video 
            className='h-full w-full'
            autoPlay
            controls
            src={data?.videoUrl}></video>
    </div>
  )
}

export default Watch