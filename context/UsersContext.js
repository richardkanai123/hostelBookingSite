'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '@/app/utils/Firebase/Firebase'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'



const UsersContext = createContext()

export const UsersProvider = ({ children }) => {

    const [UsersList, setUsersList] = useState([])


    // fetch data from users doc in firestore in realtime 
    useEffect(() => {
        const usersRef = collection(db, 'users')
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            }
            )
            setUsersList(users)
        })
        return unsubscribe
    }, [])

    return (
        <UsersContext.Provider value={UsersList}>
            {children}
        </UsersContext.Provider>
    )
}

export const useUsers = () => {
    return useContext(UsersContext)
}
