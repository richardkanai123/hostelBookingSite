'use client'
import Rooms from "@/components/Rooms"
import { useRooms } from '@/context/RoomsContext'


const Page = () => {
  const RoomsList = useRooms()
  return (

    <div className='flex items-center justify-center align-middle text-center bg-lime-200'>
      <Rooms RoomsList={RoomsList} />
    </div>

  )
}

export default Page