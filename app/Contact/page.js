"use client";
import React from 'react'

// contact page
const page = () => {
    return (
        // contact form

        <div className='w-full flex flex-col items-center text-center '>
            <h1 className='text-2xl font-bold mb-3 mt-2  text-lime-700 '>Contact</h1>
            <p className='text-gray-700 text-sm mb-2'>Please fill in the form below to contact us</p>

            <form className='w-full max-w-lg p-4 flex flex-col border rounded gap-4 justify-center items-center'>
                <div className='w-full flex flex-wrap'>
                    <label className='block text-green-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text'
                        placeholder='Name'
                        required
                    />

                </div>
                <div className='w-full flex flex-wrap'>
                    <label className='block text-green-700 text-sm font-bold mb-2' htmlFor='IDNo'>
                        ID Number
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='IDNo' type='text'
                        placeholder='IDNo'
                        required
                    />
                </div>

                <div className='w-full flex flex-wrap'>
                    <label className='block text-green-700 text-sm font-bold mb-2' htmlFor='Subject'>
                        Subject
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='Subject' type='text'
                        placeholder='Subject'
                        required
                    />
                </div>
                <div className='w-full flex flex-wrap'>
                    {/* textarea */}
                    <label className='block text-green-700 text-sm font-bold mb-2' htmlFor='message'>
                        Message
                    </label>
                    <textarea className='shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='message' type='text' placeholder='Message' />
                </div>

                <div className='w-full flex flex-wrap items-center justify-center mt-4'>
                    <button
                        onClick={() => {
                            alert('Message sent')
                        }
                        }
                        className='bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[200px]' type='submit'>
                        Send
                    </button>
                </div>
            </form>


        </div>

    )
}

export default page