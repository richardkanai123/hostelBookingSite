import React from 'react'

import { FaUserAlt, FaUserCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FcPhone } from 'react-icons/fc';
import { HiOutlineIdentification } from 'react-icons/hi';

const Usercard = ({currentUser}) => {
  return (
                    <div className='flex flex-col  justify-center items-center w-full md:w-[40%]  h-fit  border-b-2 border-black  bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-xl shadow-2xl p-2'>
                    {/* <div className='flex flex-col gap-2 items-center align-middle bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-xl shadow-2xl p-4'> */}
                    <div
                        className='w-full flex flex-col gap-2 items-start align-middle p-2'
                    >

                        <div
                            className='w-full flex items-center align-middle p-1 mb-2 gap-2 border-b-2 border-black '>

                            <FaUserCircle className='text-3xl text-sky-900' />

                            <h1 className='text-lxl font-extrabold text-slate-900 text-center'>User Information</h1>
                        </div>

                        <p
                            className='flex items-center gap-2 font-bold text-slate-900 text-center'
                        >
                            <span
                                className='text-sm font-bold text-slate-900 text-center'
                            >
                                <HiOutlineIdentification
                                    className='text-lg text-sky-900'
                                />
                            </span>
                            {currentUser ? currentUser.id : ''}
                        </p>

                        <p
                            className='flex items-center gap-2 font-bold text-slate-900 text-center'
                        >
                            <span
                                className='text-sm font-bold text-slate-900 text-center'
                            >
                                <FaUserAlt
                                    className='text-lg text-sky-900'
                                />
                            </span>
                            {currentUser ? currentUser.username : ''}
                        </p>



                        <p
                            className='flex items-center gap-2 font-semibold text-slate-900  text-center'
                        >
                            <span>
                                <MdEmail
                                    className='text-lg text-sky-900'
                                />
                            </span>

                            {currentUser ? currentUser.email : ''}</p>


                        <p
                            className='flex items-center gap-2 font-bold text-slate-900 text-center'
                        >
                            <span
                                className='text-sm font-bold text-slate-900 text-center'
                            >
                                <FcPhone
                                    className='text-lg text-sky-900'
                                />
                            </span>
                            {currentUser ? currentUser.phoneNumber : ''}
                        </p>
                    </div>
                </div>
  )
}

export default Usercard