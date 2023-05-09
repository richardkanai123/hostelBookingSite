"use client";

import React, { useEffect, useState } from 'react'
import { auth } from '../utils/Firebase/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// CONTEXT
import { useUsers } from '@/context/UsersContext';
import { useBookings } from '@/context/BookingsContext';
import Usercard from '@/components/Usercard';
import BookingInfoCard from '@/components/BookingInfoCard';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';




const StudentPage = () => {
    const [user, loading] = useAuthState(auth)

    // context data
    const usersList = useUsers() /// get users from context
    const bookingsList = useBookings() /// get bookings from context

    const [currentUser, setCurrentUser] = useState(null)
    const [userBookings, setUserBookings] = useState([])



    //get current user data from firestore
    useEffect(() => {
        if (usersList && user) {
            const LoggedUser = usersList.find((userItem) => userItem.email === user.email)
            setCurrentUser(LoggedUser)
        }

    }, [usersList, user])


    // get current user bookings
    useEffect(() => {
        if (user) {
            const LoggedUserBookings = bookingsList.filter((booking) => booking.BookedBy === user.uid)
            setUserBookings(LoggedUserBookings)
        }
    }, [bookingsList, currentUser, user])



    if (loading) {
        return (
            <>
                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-700 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    if (!user) {

        return (
            <div
                // center and pad the div tailwind
                className='flex flex-col justify-center items-center w-full h-screen p-2'>
                <h1 className=' text-2xl font-bold text-slate-900 mt-3 text-center mb-3'>Please login to view this page</h1>

                {/* link to Login */}
                <Link
                    href='/Login'
                    className='bg-sky-700 rounded-md p-2 text-white font-bold text-lg hover:bg-sky-400'
                >
                    Login
                </Link>

                <ToastContainer />

            </div>
        )
    }

    if (user && !loading) {

        return (
            <div className="h-fit flex flex-col items-start">
                <div
                    className='flex justify-around flex-col gap-4 items-center w-full h-fit p-2'
                >
                    {/* user card  */}
                    <Usercard currentUser={currentUser} />


                    {/* glassmorphic panel to show Booking information  */}

                    {userBookings.length > 0 ? (
                        <div className='w-full flex flex-wrap gap-2 items-center align-middle justify-around p-2'>

                            {/* map userBookings and show a booking card for each */}
                            {userBookings.map((booking) => (
                                <BookingInfoCard key={booking.id} BookingInfo={booking} />
                            ))}

                        </div>
                    ) : (
                        <div className='flex flex-col  justify-center items-center w-full md:w-[40%]  h-fit  border-b-2 border-black  bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-xl shadow-2xl p-2'>
                            <div className='w-full flex flex-col gap-2 items-start align-middle  p-2'>

                                <div
                                    className='flex items-center align-middle p-1 mb-2 gap-2 border-b-2 border-black '>

                                    <BsFillBookmarkPlusFill className='text-3xl text-sky-900' />

                                    <h1 className='text-lxl font-extrabold text-slate-900 text-center'>Booking Information</h1>
                                </div>

                                <h1 className='text-lxl font-extrabold text-slate-900 text-center'>You have no bookings</h1>

                                <Link
                                    href='/Booking'
                                    className='bg-lime-700 rounded-md p-2 text-white font-bold text-lg hover:bg-green-400'
                                >
                                    Book Now
                                </Link>

                            </div>

                        </div>
                    )
                    }
                </div>

                <div className='w-full flex items-center align-middle pb-4' >
                    {/* log out button */}
                    <button
                        onClick={async () => {
                            await auth.signOut()
                                .then(() => {
                                    toast.info("Logged Out!")
                                })
                        }
                        }
                        className='mt-2 bg-blue-500 font-bold text-lg text-white p-2 rounded-lg shadow-md hover:bg-blue-900 self-center mx-auto'
                    >
                        Log Out
                    </button>
                </div>

                <ToastContainer />
            </div>


        )
    }

}

export default StudentPage