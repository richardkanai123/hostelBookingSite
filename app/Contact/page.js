"use client";
import React from 'react'

// yup and form hook
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
// resolver
import { yupResolver } from '@hookform/resolvers/yup'

// db
import { db } from '../utils/Firebase/Firebase';
import { collection, addDoc } from "firebase/firestore";

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// contact page
const Page = () => {
    // yup schema
    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        IDNo: yup.string().required('Student ID is required'),
        Subject: yup.string().required('Subject is required'),
        // message is a string of more than 50 characters and less than 200 characters
        message: yup.string().min(50).max(200).required('Message is required')
    })

    // form hook
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


    // submit function
    const onSubmit = async (data) => {
        // add data to firestore to messages collection in firebase db
        await addDoc(collection(db, "messages"), {
            name: data.name,
            IDNo: data.IDNo,
            Subject: data.Subject,
            message: data.message,
            time: new Date().toDateString(),
            status: 'unread'
        })
            .then(() => {
                // toast success
                toast.success('Message sent successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                })

                // reset form
                reset()

            })
            .catch((error) => {
                // toast error
                toast.error(`Error Occurred! ${error.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                })
            });

    }


    return (
        // contact form

        <div className='w-full flex flex-col items-center text-center '>
            <h1 className='text-2xl font-bold mb-3 mt-2  text-lime-700 '>Contact</h1>
            <p className='text-gray-700 text-sm mb-2'>Please fill in the form below to contact us</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full max-w-lg p-4 flex flex-col border rounded gap-4 justify-center items-center'>
                <div className='w-full flex flex-col flex-wrap'>
                    <label className='w-full text-left block text-green-700 text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='name' type='text'
                        placeholder='Name'
                        {...register('name')}
                    />
                    {/* error message */}
                    {
                        errors.name && <p className='text-red-500 text-xs italic'>{errors.name.message}</p>
                    }
                </div>
                <div className='w-full flex flex-wrap'>
                    <label className='w-full text-left block text-green-700 text-sm font-bold mb-2' htmlFor='IDNo'>
                        Student ID
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='IDNo' type='text'
                        placeholder='IDNo'
                        {...register('IDNo')}
                    />
                    {
                        errors.IDNo && <p className='text-red-500 text-xs italic'>{errors.IDNo.message}</p>
                    }
                </div>

                <div className='w-full flex flex-wrap'>
                    <label className='w-full text-left block text-green-700 text-sm font-bold mb-2' htmlFor='Subject'>
                        Subject
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='Subject' type='text'
                        placeholder='Subject'
                        {...register('Subject')}
                    />
                    {
                        errors.Subject && <p className='text-red-500 text-xs italic'>{errors.Subject.message}</p>
                    }
                </div>
                <div className='w-full flex flex-wrap'>
                    {/* textarea */}
                    <label className='w-full text-left block text-green-700 text-sm font-bold mb-2' htmlFor='message'>
                        Message
                    </label>
                    <textarea className='shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='message' type='text' placeholder='Message'
                        {...register('message')}
                    />
                    {
                        errors.message && <p className='text-red-500 text-xs italic'>{errors.message.message}</p>
                    }
                </div>

                <div className='w-full flex flex-wrap items-center justify-center mt-4'>
                    <button
                        type="submit"
                        className='bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[200px]'>
                        Send
                    </button>
                </div>
            </form>

            <ToastContainer />

        </div>

    )
}

export default Page