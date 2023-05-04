"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { useUsers } from '@/context/UsersContext';
import { auth } from '@/app/utils/Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  const [loggedInUser, setLoggedInUser] = useState(null);
  const usersList = useUsers();
  
  useEffect(() => {
    if (usersList && user) {
      const userInfo = usersList.find((userdata) => userdata.email === user.email);
      setLoggedInUser(userInfo);
    }
  }, [loggedInUser, user, usersList]);


  if (loggedInUser?.role === 'admin' ) {
    return (
      <div className='w-full flex bg-lime-700 p-1 items-center '>
        <nav className='w-full flex items-center justify-between flex-wrap p-2'>

          <Link
            href='/admin'
            className='flex items-center flex-shrink-0 text-white mr-6'>
            <span className='font-bold text-xl tracking-tight'>Admin Panel</span>
          </Link>

        </nav>
      </div>
    )

  }else if (user || user===null)   {
    return (
      <>
        <div className='w-full flex bg-lime-700 p-1 items-center '>
          <nav className='w-full flex items-center justify-between flex-wrap   p-4'>
            <div className='flex items-center flex-shrink-0 text-white mr-6'>
              <span className='font-bold text-xl tracking-tight'>Bookkie 🏨📑</span>
            </div>
            <div className='block lg:hidden'>
              <button
                //   menu toggle button
                onClick={() => {
                  const menu = document.querySelector('.menu')
                  menu.classList.toggle('hidden')
                }
                }
                className='flex items-center px-3 py-2 border rounded text-teal-900 border-teal-400 hover:text-white hover:border-white'>
                <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                </svg>
              </button>
            </div>
            <div
              //   menu
              className='menu w-full block  flex-grow lg:flex lg:items-center lg:w-auto transition-transform gap-3'>
              <div className='text-sm lg:flex-grow gap-3'>
                <Link href='/' className='block text-base font-semibold mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4'>
                  Rooms
                </Link>
                <Link href='./Booking' className='block text-base font-semibold mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4'>
                  Booking
                </Link>
                <Link href="./Contact" className='block text-base font-semibold mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4'>
                  Contact
                </Link>
              </div>
          
              {/* user profile */}
        
              <div className='flex items-center text-sm lg:flex-grow gap-3 mt-4 lg:mt-0'>
                <Link href='/Profile' className='flex flex-col items-center justify-end'>
                  <FaUserCircle className='font-bold text-2xl text-teal-100' />
                  <span className='text-xs text-lime-100 MT-2'>Profile</span>
                </Link>
              </div>
            </div>
        

          </nav>
        </div>
      </>
    )
  }
  
}

export default Navbar