'use client'

import React from 'react'
import LoginForm from '@/components/LoginForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/Firebase/Firebase'
import { useRouter } from 'next/navigation'
const Page = () => {
    const [user] = useAuthState(auth)

    // router
    const router = useRouter()


    if (user) {
        return (
            <>
                <div
                    className='flex flex-col gap-4 items-center align-middle justify-center'
                >
                    <p>Logged in:  {user.email}</p>

                    <p>Go To HomePage</p>
                    <button
                        onClick={() => router.push('/')}
                        className='text-lg bg-sky-800 p-3 text-white hover:opacity-75 font-semibold rounded-md shadow-lg outline-none border-none'>
                        Home
                    </button>

                </div>
            </>
        )
    }
    else if (!user)
        return (
            <>
                <LoginForm />
                <ToastContainer />
            </>
        )
}

export default Page