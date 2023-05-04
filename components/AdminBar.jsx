'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { MdMenuOpen } from 'react-icons/md'
import { RiMenuUnfoldLine, RiNotification3Fill } from 'react-icons/ri'
import { ImHome } from 'react-icons/im'
import { FaUsers } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'

const AdminBar = () => {
    const [showSidePanel, setShowSidePanel] = useState(true)

    return (
        <>
            <div className={showSidePanel ?
                `flex flex-col bg-green-800 justify-center items-center  h-screen w-full md:w-[20%] max-h-full p-1 border-b-2 border-black md:border-none transition-all ease-in-out delay-300  duration-900 left-0   ` :
                "flex flex-col bg-green-800 justify-center items-center h-screen min-h-full w-[10%] md:w-[5%] max-h-full p-1 border-b-2 border-black md:border-none overflow-clip transition-all ease-in-out delay-300  duration-1500  left-0 "}>
                {/* WIDTH TOGGLE FOR sidebar */}
                <button
                    onClick={() => setShowSidePanel(!showSidePanel)}
                    className=' text-gray-100 p-1 rounded-md hover:bg-green-600 transition-all ease-in-out delay-100  duration-900'>
                    {showSidePanel ?
                        <MdMenuOpen className='text-2xl' />
                        :
                        <RiMenuUnfoldLine className='text-2xl' />
                    }
                </button>
                {/* sidebar content */}

                <nav className='flex flex-col items-center w-full h-full gap-1 p-4'>
                    {/* sidebar menu */}

                    {/* icon and name: Ion visible when tile is closed */}


                    <Link href='/admin'
                        className='p-2 hover:text-cyan-200 text-lime-400 transition-all ease-in-out delay-1000  duration-900'
                    >
                        <span className='flex flex-col justify-center items-center '>
                            <ImHome className='text-2xl ' />
                            {
                                showSidePanel && <span className='text-xl'>Home</span>
                            }

                        </span>

                    </Link>

                    <Link href='/admin/users'
                        className='p-2 hover:text-cyan-200 text-yellow-400 transition-all ease-in-out delay-1200  duration-900'
                    >
                        <span className='flex flex-col justify-center items-center '>
                            <FaUsers className='text-2xl ' />
                            {
                                showSidePanel && <span className='text-xl'>Users</span>
                            }
                        </span>
                    </Link>

                    <Link href='/admin/dates'
                        className='p-2 hover:text-cyan-200 text-sky-400 transition-all ease-in-out delay-1250  duration-900'
                    >
                        <span className='flex flex-col justify-center items-center '>
                            <RiNotification3Fill className='text-2xl ' />
                            {
                                showSidePanel && <span className='text-xl '>Dates</span>
                            }
                        </span>
                    </Link>

                    <Link href='/admin/Settings'
                        className='p-2 hover:text-cyan-200 text-blue-700 transition-all ease-in-out delay-1300  duration-9000'
                    >
                        <span className='flex flex-col justify-center items-center '>
                            <IoSettingsSharp className='text-2xl ' />
                            {
                                showSidePanel && <span className='text-xl'>Settings</span>
                            }
                        </span>
                    </Link>

                </nav>
            </div></>
    )
}

export default AdminBar