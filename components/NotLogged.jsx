import React from 'react'
import { useRouter } from 'next/navigation'

const NotLogged = () => {
       // router
    const router = useRouter()
  return (
        <div className=" h-full flex flex-wrap justify-center items-center  gap-4 mix-blend-color-overlay bg-green-400 shadow-md shadow-neutral-400 rounded-md bg-opacity-80 p-2">
            <div className='w-full h-full flex flex-col justify-center items-center gap-2 text-cyan-800'>
                <h1
                    className='text-lg text-red-700 font-bold'
                >You are not logged in</h1>
                <button

                    onClick={() => {
                        router.push('/Login')
                    }}
                    className='w-[200px] self-center mx-auto p-2 rounded-md bg-blue-700 text-white font-bold hover:opacity-80'
                >Log In</button>
            </div>

        </div>
  )
}

export default NotLogged