'use client'

import React from 'react'
import LoginForm from '@/components/LoginForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/Firebase/Firebase'

const Page = () => {

    const [user] = useAuthState(auth)

    if (user) {
        // redirect to home page
        window.location.href = '/'
    }

    return (
        <>
            <LoginForm />
            <ToastContainer />
        </>
    )
}

export default Page