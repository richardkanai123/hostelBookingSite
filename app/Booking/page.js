"use client"

import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRooms } from '@/context/RoomsContext';
import { useUsers } from '@/context/UsersContext';
import { useBookings } from '@/context/BookingsContext';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/Firebase/Firebase'
import Link from 'next/link';

//
import { db } from '@/app/utils/Firebase/Firebase';
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";


const Booking = () => {


    // auth context
    const [user, loading] = useAuthState(auth)

    // rooms context
    const RoomsList = useRooms()
    const [RoomsArray] = useState(RoomsList);
    // bookings context
    const bookingsList = useBookings()

    // users context
    const UsersList = useUsers()
    const [UsersArray, setUsersArray] = useState(UsersList);

    // current user bookings
    const [CurrentUserBookings] = useState(bookingsList?.filter(booking => booking.BookedBy === user?.uid))

    // form state
    const [RoomNumber, setRoomNumber] = useState("select room")
    const [Duration, setDuration] = useState("select")

    // on mount, filter the rooms to only show the ones whose occupancy is vacant and booked is false
    const [VacantRooms, setVacantRooms] = useState([])

    useEffect(() => {
        // filter the rooms to only show the ones whose occupancy is vacant and booked is false
        const FilteredRooms = RoomsArray.filter(room => room.Occupancy === 'vacant' && room.Booked === false)
        setVacantRooms(FilteredRooms)
    }, [RoomsArray])


    useEffect(() => {
        // get current user from user list by comparing the user's email to the email in the user list
        if (user) {
            const Loggeduser = UsersArray?.find(userdata => userdata.email === user.email)
            setCurrentUser(Loggeduser)
        }

    }, [UsersArray, user])


    // get current user from user list by comparing the user's email to the email in the user list
    const [CurrentUser, setCurrentUser] = useState(null)

    const HandleBooking = async () => {
        const UserHasBookings = CurrentUserBookings?.some(booking => booking.Status === 'pending' || booking.Status === 'approved')

        // check if user has selected a room and duration
        if (RoomNumber === "select room" || Duration === "select") {
            toast.error('Please select a room and duration')
            return false
        } else
            if (UserHasBookings) {
                toast.error(`You already have a booking pending or approved. Please check your Profile page`)
                return false
            }
            else {
                // proceed to book room
                // log to console the selected room and duration
                console.log(RoomNumber, Duration);

                const newBooking = {
                    BookedBy: user.uid,
                    studentID: CurrentUser.studentID,
                    RoomNumber: RoomNumber,
                    Duration: Duration,
                    BookedOn: new Date().toLocaleDateString(),
                    Status: 'pending'
                }

                // add booking to firestore
                await addDoc(collection(db, "bookings"), newBooking)
                    .then(() => {
                        // update room booked status to true
                        const roomRef = doc(db, "rooms", RoomNumber);
                        updateDoc(roomRef, {
                            Booked: true
                        })
                    })
                    .then(() => {
                        // alert user of successful booking
                        toast.success(`Booking successful. Please check your Profile page for booking status`)

                        // reset form
                        setRoomNumber("select room")
                        setDuration("select")

                    })
                    .catch((error) => {
                        toast.error(`Error:${error.message}. Please try again later or contact the admin`)
                    });
            }
    }


    // update rooms and users  collection
    if (!user) {
        return (
            <div className='w-full flex items-center align-middle flex-col justify-center max-h-fit bg-slate-100 p-4'>
                <h1 className='text-2xl font-bold text-slate-900 mb-3'>Please login to book a room</h1>

                {/* link to Login styled as a button*/}
                <Link
                    href='/Login'
                    className='bg-sky-700 rounded-md p-2 text-white font-bold text-lg hover:bg-sky-400'
                >
                    Login
                </Link>

            </div>
        )
    }

    if (loading) {
        return <h1
            className='text-2xl font-bold text-slate-900 mb-3 text-center'
        >loading...</h1>
    }

    if (user) {
        return (
            <div className='w-full flex items-center align-middle flex-col justify-center max-h-fit bg-slate-100 p-4'>
                <h1 className='text-2xl font-bold text-slate-900 mb-3'>Booking</h1>
                {/* booking form */}
                <form
                    className='w-full md:w-3/4 lg:w-1/2 flex flex-col items-center justify-center align-middle   gap-2 p-2'
                    // on submit, alert the user
                    onSubmit={(e) => {
                        e.preventDefault();
                        HandleBooking()
                    }

                    }
                >
                    {/* step by step form,
                    1. select room type, this filters the rooms to only show the ones that match the selected type, type is selected from the dropdown as either single or shared
                    2. select room by selecting room number from the filtered list of rooms that match the selected type in step 1 either by clicking on the room number or by selecting from the dropdown
                     */}
                    <div className='w-full flex flex-col items-center justify-center align-middle gap-2  '>
                        <label
                            htmlFor='roomType'
                            className='w-full text-lg font-bold text-slate-900'
                        >Room Type</label>
                        <select
                            name='roomType'
                            id='roomType'
                            className='w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:border-slate-500 hover:bg-lime-300 '
                            onChange={(e) => {
                                // filter the rooms to only show the ones whose occupancy is vacant and booked is false
                                const FilteredRooms = RoomsArray.filter(room => room.Occupancy === 'vacant' && room.Booked === false)

                                if (e.target.value === 'all') {

                                    setVacantRooms(FilteredRooms)
                                }
                                else if (e.target.value === 'single' || e.target.value === 'shared') {

                                    // filter the rooms to only show the ones whose type matches the selected type
                                    const FilteredRoomsByType = FilteredRooms.filter(room => room.Type === e.target.value)
                                    setVacantRooms(FilteredRoomsByType)
                                } else if (e.target.value === 'all') {
                                    setVacantRooms(FilteredRooms)
                                }

                            }}
                        >
                            <option
                                className='text-slate-900'
                                value='all'>All</option>
                            <option
                                className='text-slate-900'
                                value='single'  >Single</option>
                            <option
                                className='text-slate-900'
                                value='shared' >Shared</option>
                        </select>
                    </div>

                    <div className='w-full flex flex-col items-center justify-center align-middle gap-2'>
                        <label
                            htmlFor='roomNumber'
                            className=' w-full text-lg font-bold text-slate-900'
                        >Room Number</label>
                        <select
                            value={RoomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            name='roomNumber'
                            id='roomNumber'
                            className='w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:border-slate-500'
                        >
                            {/* place holder not selectable */}
                            <option value="select" unselectable='true' >Select Room</option>
                            {VacantRooms.map(room => (
                                <option value={room.id} key={room.id}>{room.id}</option>
                            ))}
                        </select>

                    </div>

                    <div className='w-full flex flex-col items-center justify-center align-middle gap-2'>
                        <label
                            htmlFor='duration'
                            className='w-full text-lg font-bold text-slate-900'
                        >Duration</label>
                        <select
                            value={Duration}
                            onChange={(e) => setDuration(e.target.value)}
                            name='duration'
                            id='duration'
                            className='w-full p-2 rounded-md border border-slate-300 focus:outline-none focus:border-slate-500'
                        >
                            <option value='select' unselectable='true' >Select Duration</option>
                            <option value='Semester'>Full Sem</option>
                            <option value='Annual' >Academic Year</option>
                        </select>

                    </div>

                    <button
                        type='submit'

                        className=' bg-lime-700 rounded-md p-2 text-white font-bold text-lg hover:bg-lime-400 transition-all duration-300 ease-in-out w-[200px] '
                    >
                        Book
                    </button>
                </form>
                <ToastContainer />
            </div >
        )
    }
}

export default Booking