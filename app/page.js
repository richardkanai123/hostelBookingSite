'use client'
import Rooms from "@/components/Rooms"
import { useRooms } from '@/context/RoomsContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link';
import { auth } from "./utils/Firebase/Firebase"

const Page = () => {
  const RoomsList = useRooms()
  const [user, loading] = useAuthState(auth)

  if (!user) {
    return (
      <div className='w-full flex items-center align-middle flex-col justify-center max-h-fit bg-slate-100 p-4'>
        <h1 className='text-2xl font-bold text-slate-900 mb-3'>Please login to view rooms</h1>

        {/* link to Login styled as a button*/}
        <Link
          href='/Login'
          className='bg-sky-700 rounded-md p-2 text-white font-bold text-lg hover:bg-sky-400'
        >
          Login
        </Link>

      </div>
    )
  } else if (loading) {
    return (
      <div
        // center and pad the div tailwind
        className='flex flex-col justify-center items-center w-full h-screen p-2'>
        <h1 className=' text-2xl font-bold text-slate-900 mt-3 text-center mb-3'>
          Loading .....
        </h1>

      </div>
    )
  } else

    if (user && !loading)
      return (

        <div className='flex items-center justify-center align-middle text-center bg-lime-200'>
          <Rooms RoomsList={RoomsList} />
        </div>

      )
}

export default Page