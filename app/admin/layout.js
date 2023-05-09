'use client'
import AdminBar from '@/components/AdminBar'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/Firebase/Firebase'

// meta data for admin page
export const meta = {
    title: 'Admin Page',
    description: 'Admin page for Bookkie',
    keywords: 'Admin, Dashboard, Admin page',
}

const AdminPage = ({ children }) => {
    // get current user
    const [user] = useAuthState(auth)

    return (
        <div className=' flex items-center align-middle relative w-full min-h-fit h-full bg-green-300'>
            {/* light green bg side bar for navigation */}
            {user && <AdminBar />}
            {/* main  part of dashboard */}
            <main className='flex flex-col h-full min-h-screen flex-1 gap-2
            bg-green-300 justify-center items-center w-full  max-h-fit p-1 border-b-2 border-black md:border-none transition-all ease-in delay-500  duration-1200 overflow-hidden'>
                {children}
            </main>
        </div >

    )
}

export default AdminPage