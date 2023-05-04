'use client'
import React from 'react'

// users Context 
import { useUsers } from '@/context/UsersContext'
import { useState } from 'react'

const Page = () => {
    const usersList = useUsers()
    const [search, setSearch] = useState('')

    const [filteredUsers, setFilteredUsers] = useState(usersList)

    // search for a user by name or student id
    const HandleUserSearch = () => {
        if (search === '') {
            setFilteredUsers(usersList)
        } else {
            setFilteredUsers(usersList.filter((user) => {
                return user.username.toLowerCase().includes(search.toLowerCase()) || user.studentID.toLowerCase().includes(search.toLowerCase())
            }))
        }

    }

    return (

        <div className='w-full flex flex-col gap-2 items-center justify-center align-middle text-center '>
            <h1 className='text-2xl text-sky-700 font-bold'>Users</h1>

            {/* search bar to get a user by name or student id */}
            <div className='w-full flex items-center align-middle text-center px-4'>
                <input
                    value={search}
                    type='text'
                    placeholder='Search by name or student id'
                    className='w-[40%] mx-auto self-center border-2 border-none p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-300 bg-lime-100 '
                    onChange={(e) => {
                        setSearch(e.target.value)
                        if (e.target.value === '') {
                            setFilteredUsers(usersList)
                        }
                        else {
                            HandleUserSearch()
                        }
                    }}
                />

            </div>

            <div className='w-full p-2 flex items-center justify-center align-middle text-center border-2 '>
                <table className='w-full table-auto border-collapse border-zinc-600 border-spacing-1 rounded-md transition-all ease-in'>
                    <thead>
                        <tr
                            className='bg-zinc-700 text-white text-center border border-zinc-600'
                        >
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Student ID</th>
                            <th className='px-4 py-2'>Email</th>
                            <th className='px-4 py-2'>Phone Number</th>
                            <th className='px-4 py-2'>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className='border px-4 py-2'>{user.username}</td>
                                <td className='border px-4 py-2'>{user.studentID}</td>
                                <td className='border px-4 py-2'>{user.email}</td>
                                <td className='border px-4 py-2'>{user.phoneNumber}</td>
                                <td className='border px-4 py-2'>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div >

    )
}

export default Page