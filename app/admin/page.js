'use client'
import AdminRoomsLister from '@/components/AdminRoomsLister'
// rooms context
import { useRooms } from '@/context/RoomsContext'
import { useBookings } from '@/context/BookingsContext'
import AdminBookingsLister from '@/components/AdminBookingsLister'

// toasts
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'

// react form hook
import { useForm } from 'react-hook-form'
// react yup for form validation
import * as yup from 'yup'
// yup resolver
import { yupResolver } from '@hookform/resolvers/yup'
import { db } from '../utils/Firebase/Firebase'
import { doc, setDoc } from 'firebase/firestore'
import AdminAllBookingsLister from '@/components/AdminAllBookingsLister'


// auth context
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/Firebase/Firebase'
import AdminMessagesLister from '@/components/AdminMessagesLister'
import NotLogged from '@/components/NotLogged'



const Page = () => {
    // context consumption
    const rooms = useRooms()
    const bookings = useBookings()
    // modal state
    const [showModal, setShowModal] = useState(false)
    const [pendingBookings, setPendingBookings] = useState([])

    // auth state
    const [user, loading] = useAuthState(auth)

    // filter bookings to get pending bookings only
    useEffect(() => {
        const pending = bookings.filter(booking => booking.Status === 'pending')
        setPendingBookings(pending)
    }, [bookings])



    // form validation schema
    const schema = yup.object().shape({
        roomNumber: yup.string().required('Room Number is required'),
        // roomtype is either single or shared
        roomType: yup.string("Must be a string").oneOf(["single", "shared"]).required("Room Type is required!"),
        // roomPrice must be greater than 1
        roomPrice: yup.number().required('Room Price is required').min(1, 'Room Price must be greater than 1'),
    })

    // form hook
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        //    upload data to firestore
        const newRoom = {
            Type: data.roomType,
            Price: data.roomPrice,
            Occupancy: 'vacant',
            Booked: false,
        }

        // check if room number exists in rooms collection
        if (rooms.find(room => room.id === data.roomNumber)) {
            toast.error('Room Number already exists')
            return false;
        }
        else {
            // add room to firestore
            const RoomsRef = doc(db, 'rooms', data.roomNumber)
            await setDoc(RoomsRef, newRoom)
                .then(() => {
                    toast.success(`Room ${data.roomNumber} added successfully`)
                    // reset form
                    reset()
                })
                .catch((error) => {
                    toast.error(error.message)
                }
                )
        }


    }

    if (!user && !loading) {
        // div with a button to redirect to login page
        return (
            <NotLogged />
        )
    }

    if (user)
        return (
            <div className='w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-2'>
                <div className='bg-green-100 p-2 md:w-[full] rounded-md bg-blend-overlay shadow-slate-300 shadow-md max-h-[600px] scrollbar-hide'>
                    <h1>Pending Bookings</h1>
                    <hr className='w-full bg-slate-500 h-[2px] mb-2' />
                    <div
                        className='w-full h-fit overflow-y-scroll overscroll-none'
                    >
                        <AdminBookingsLister BookingsList={pendingBookings} />
                    </div>

                </div>
                <div className='bg-green-100 p-2 md:w-[full] rounded-md bg-blend-overlay shadow-slate-300 shadow-md max-h-[600px] scrollbar-hide '>
                    <div className="w-full flex align-middle justify-between p-1">
                        <h1>Rooms Data</h1>
                        {/* button to add room */}
                        <button
                            onClick={() => setShowModal(true)}
                            className='bg-green-500 font-semibold text-sky-800 p-1 rounded-md shadow-md hover:bg-blue-600 hover:text-white'>
                            Add Room
                        </button>
                    </div>
                    <hr className='w-full bg-slate-500 h-[2px] mb-2' />


                    <AdminRoomsLister RoomsList={rooms} />
                </div>


                <div className='bg-green-100 p-2 md:w-[full] rounded-md bg-blend-overlay shadow-slate-300 shadow-md max-h-[500px] scrollbar-hide '>
                    <h1>Past Bookings</h1>
                    <hr className='w-full bg-slate-500 h-[2px] mb-2' />
                    <AdminAllBookingsLister BookingsList={
                        bookings.filter(booking => booking.Status !== 'pending')
                    } />
                </div>
                <div className='bg-green-100 p-2 md:w-[full] rounded-md bg-blend-overlay shadow-slate-300 shadow-md max-h-[600px] scrollbar-hide '>
                    <h1>Messages</h1>
                    <hr className='w-full bg-slate-500 h-[2px] mb-2' />

                    <AdminMessagesLister />

                </div>

                <ToastContainer
                    position="top-center"
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={true}
                    pauseOnHover={true}
                />

                {
                    showModal && (

                        <div className='w-screen h-full flex flex-col justify-center items-center p-2'>

                            <div className='w-full h-full flex flex-col items-center align-middle  bg-black bg-opacity-90 absolute top-0 left-0 z-20'>

                                <div className='w-full h-full flex flex-col items-center align-middle justify-center gap-2'>
                                    {/* add room form */}
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}

                                        className='w-[90%] md:w-[400px] h-fit flex flex-col items-center align-middle justify-center bg-lime-400 text-white p-2 rounded-md bg-opacity-30'>


                                        <h1
                                            className='w-full text-center text-2xl font-semibold '
                                        >Add Room
                                        </h1>

                                        <hr className='w-full bg-slate-500 h-[2px] mb-2' />

                                        <div className='w-full  flex flex-col items-center align-middle'>
                                            <label htmlFor='roomNumber'
                                                className='w-full '
                                            >
                                                Room Number
                                            </label>
                                            <input
                                                type='text'
                                                name='roomNumber'
                                                id='roomNumber'
                                                {...register('roomNumber')}
                                                className='self-start p-1 rounded-md shadow-md w-[200px] border-none ring-0 hover:border-none hover:ring-0 focus:border-none focus:ring-0 bg-slate-400'
                                            />
                                            {
                                                errors.roomNumber &&
                                                <p className='text-red-500'>
                                                    {errors.roomNumber.message}
                                                </p>
                                            }
                                        </div>
                                        <div className='w-full flex flex-col items-center align-middle'>
                                            <label htmlFor='roomType'
                                                className='w-full '
                                            >Room Type</label>
                                            <select
                                                name="roomType"
                                                id="roomType"
                                                {...register('roomType')}
                                                className='self-start p-1 rounded-md shadow-md w-[200px] border-none ring-0 hover:border-none hover:ring-0 focus:border-none focus:ring-0 bg-slate-400'>
                                                <option value="select">select type</option>
                                                <option value="single">Single</option>
                                                <option value="shared">Shared</option>
                                            </select>

                                            {
                                                errors.roomType &&
                                                <p className='text-red-500'>
                                                    {errors.roomType.message}
                                                </p>
                                            }
                                        </div>

                                        <div className='w-full flex flex-col items-center align-middle'>
                                            <label htmlFor='RoomPrice'
                                                className='w-full '
                                            >Room Price</label>
                                            <input
                                                type='number'
                                                name='roomPrice'
                                                id='roomPrice'
                                                {...register('roomPrice')}
                                                className='self-start p-1 rounded-md shadow-md w-[200px] border-none ring-0 hover:border-none hover:ring-0 focus:border-none focus:ring-0 bg-slate-400'
                                            />

                                            {
                                                errors.roomPrice &&
                                                <p className='text-red-500'>
                                                    {errors.roomPrice.message}
                                                </p>
                                            }
                                        </div>

                                        <div className="w-full mt-2 flex items-center gap-2 justify-around align-middle">

                                            <button
                                                type='submit'
                                                className=' bg-green-500 font-semibold text-sky-800 p-1 rounded-md shadow-md hover:bg-blue-600 hover:text-white'>
                                                Add Room
                                            </button>
                                            <button
                                                className='w-[70px]  bg-red-500 font-semibold text-lg text-sky-800 p-2 rounded-md shadow-md hover:bg-blue-600 hover:text-gray-200 z-40'
                                                onClick={() => setShowModal(false)}>
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>


                        </div>
                    )
                }

            </div >
        )
}

export default Page