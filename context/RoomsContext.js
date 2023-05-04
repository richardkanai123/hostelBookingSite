'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '@/app/utils/Firebase/Firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'


const RoomsContext = createContext()

export const RoomsProvider = ({ children }) => {

    const [RoomsList, setRoomsList] = useState([])

    // fetch data from rooms doc in firestore
    const fetchRooms = async () => {
        const roomsRef = collection(db, 'rooms')
        // real time listener to rooms collection
        const unsubscribe = onSnapshot(roomsRef, (snapshot) => {
            const roomsList = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setRoomsList(roomsList)
        })
        return unsubscribe


    }

    // fetch rooms once on mount
    useEffect(() => {
        fetchRooms()
    }, [])


    return (
        <RoomsContext.Provider value={RoomsList}>
            {children}
        </RoomsContext.Provider>
    )
}

export const useRooms = () => {
    return useContext(RoomsContext)
}


// how to use the context in a component

// import { useRooms } from '@/context/RoomsContext'
//
// const Rooms = () => {
//   const RoomsList = useRooms()
//
//   return (
//     <div>
//       {RoomsList.map((room) => (
//         <div key={room.id}>
//           <h3>{room.type}</h3>
//           <p>{room.occupancy}</p>
//           <p>{room.price}</p>
//           <p>{room.booked}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Rooms

