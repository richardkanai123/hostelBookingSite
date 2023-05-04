// Bookings context


// firebase user context
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '@/app/utils/Firebase/Firebase'
import { collection, onSnapshot } from 'firebase/firestore'



const BookingsContext = createContext()

export const BookingsProvider = ({ children }) => {

    const [Bookings, setBookings] = useState([])



    // fetch rooms once on mount and every time data changes
    useEffect(() => {
        const bookingsRef = collection(db, 'bookings')
        const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
            const bookings = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }
            )
            setBookings(bookings)
        })
        return unsubscribe
    }, [])



    return (
        <BookingsContext.Provider value={Bookings}>
            {children}
        </BookingsContext.Provider>
    )
}

export const useBookings = () => {
    return useContext(BookingsContext)
}
