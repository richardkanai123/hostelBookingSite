'use client'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/utils/Firebase/Firebase'
import { useUsers } from '@/context/UsersContext'

import { useRouter } from 'next/navigation'

// firestore
import { db } from '@/app/utils/Firebase/Firebase'
import { setDoc, doc } from 'firebase/firestore'

// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotLogged from '@/components/NotLogged'


const Page = () => {

    const router = useRouter()


    const [user, loading] = useAuthState(auth)
    const usersList = useUsers()

    const makeUserAdmin = async (e) => {
        e.preventDefault()
        // get the email selected from the dropdown selected in the form
        const SelectedEmail = e.target.useremail.value

        // get the user from the usersList
        const TargetUser = usersList.find((userdata) => userdata.email === SelectedEmail)

        // get the user id from the user
        const TargetUserId = TargetUser.studentID

        // set doc with targetuserid role as admin

        try {
            const docRef = doc(db, 'users', TargetUserId)
            await setDoc(docRef, {
                role: 'admin'
            }, { merge: true })
                .then(() => {
                    toast.success('User made admin successfully')
                    console.log('User made admin successfully')
                }
                )
        } catch (error) {
            toast.error(error.message)
        }


    }

    if (!user && !loading) {
        // div with a button to redirect to login page
        return (
            <NotLogged />
        )
    }


    if (loading) {
        return (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-700 rounded"></div>
                            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else if (user && !loading) {
        return (
            <>

                <div
                    className='w-full h-fit max-h-screen p-2 flex flex-col justify-center items-center gap-2 text-cyan-800'
                >
                    <h2
                        className='text-xl font-bold'
                    >
                        Settings
                    </h2>

                    {/* neurmorphic div for holding users info */}
                    <div
                        className='w-full flex flex-col justify-center items-center gap-2 shadow-md rounded-md p-2 bg-green-100 bg-blend-overlay backdrop-filter backdrop-blur-md '
                    >
                        <h1
                            className='text-2xl font-bold'
                        >Admin Details</h1>
                        <p
                            className='text-lg font-bold'
                        >{user.email}</p>
                        <p
                            className='text-lg font-bold'
                        >{user.displayName && user.displayName}</p>
                        <p
                            className='text-lg font-bold flex items-center gap-2'
                        >
                            Last seen:
                            <span
                                className='text-sm font-normal'
                            >{user.metadata.lastSignInTime}</span>
                        </p>

                    </div>

                    {/* making an existing user an admin */}
                    <div
                        className='w-full flex flex-col justify-center items-center gap-2 shadow-md rounded-md p-2 bg-green-100 bg-blend-overlay backdrop-filter backdrop-blur-md '>
                        <h1
                            className='text-2xl font-bold'
                        >Make an existing user an admin</h1>
                        <form
                            onSubmit={makeUserAdmin}
                            className='flex  flex-col align-middle items-center gap-3' >
                            <select
                                className='w-full p-2 rounded-md'
                                name='useremail'
                            >
                                <option
                                    className='p-2'
                                >Select a user</option>
                                {usersList && usersList.map((userdata) => (
                                    <option
                                        key={userdata.id}
                                        className='p-2'
                                    >{userdata.email}</option>
                                ))}
                            </select>

                            <button
                                type='submit'
                                className='w-[200px] self-center mx-auto p-2 rounded-md bg-blue-700 text-white font-bold'
                            >Make Admin</button>

                        </form>
                    </div>

                    {/* log out button */}

                    <button
                        onClick={async () => {
                            await auth.signOut()
                                .then(() => {
                                    router.push('/Login')
                                })

                        }}
                        className='w-[200px] self-center mx-auto p-2 rounded-md bg-red-700 text-white font-bold'
                    >Log Out</button>


                </div>
                <ToastContainer />

            </>


        )
    }
}

export default Page