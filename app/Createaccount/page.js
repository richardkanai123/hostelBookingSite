"use client"

import React, { useState } from 'react'
import { auth, db } from '@/app/utils/Firebase/Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
// yup for validation
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// toastify
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// router
import { useRouter } from 'next/navigation'


// form validation schema
const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email("Enter valid email").required("Email is required"),
    studentID: yup.string().required(),
    // phone number validation
    phoneNumber: yup.string().matches(/^[0-9]+$/, 'Enter Valid Phone Number').min(10).max(10).required(),
    password: yup.string().required(),
    // confirm password validation, same as password
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Must match Password').required()
})

const CreateAccount = () => {
    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    // router
    const Router = useRouter()


    const SubmitHandler = async (data) => {
        // destructure data
        // const { email, studentID, phoneNumber, password, confirmPassword } = data

        // create user with email and password
        await createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;

                toast.success(`Account Created for ${user.email}`);

            })
            .then(async () => {
                // add user to firestore
                await setDoc(doc(db, 'users', data.studentID), {
                    username: data.username,
                    email: data.email.toLowerCase(),
                    studentID: data.studentID,
                    phoneNumber: data.phoneNumber,
                    createdAt: new Date().toLocaleDateString(),
                    role: 'student'
                })
                    .then(() => {
                        toast.dismiss()
                        toast.success('User Added to Database');
                    }
                    )
                    .then(() => {
                        // redirect to profile page
                        Router.push('/')
                    })

            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })

    }

    // if user exist redirect to profile page

    return (
        // center div
        <>

            <div className='flex justify-center items-center h-screen'>
                {/* Sign Up form */}
                <div className='w-[95%] md:w-1/2 lg:w-[40%] min-h-[400px]  max-h-fit p-2 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center'>
                    <form
                        // disable autocomplete 
                        autoComplete='off'
                        // disable auto fill
                        autoCapitalize='off'
                        // disable suggestions
                        autoCorrect='off'
                        // form submit handler
                        onSubmit={handleSubmit(SubmitHandler)}
                        className='flex flex-col gap-2 mt-4 w-full h-full'
                    >
                        <h1 className='text-2xl text-center font-bold text-gray-700'>Create Account</h1>

                        {/* username */}
                        <input
                            {...register('username')}
                            type='text'
                            placeholder='Your Name'
                            className='w-full border-2 invalid:border-red-300 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500'
                            required
                        />

                        {errors.username && <p className='text-red-500'>{errors.username.message}</p>}

                        {/* student email */}
                        <input
                            {...register('email')}
                            type='email'
                            placeholder='Email'
                            className='w-full border-2 invalid:border-red-300 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500'
                            required
                        />

                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                        {/* studentID */}
                        <input
                            {...register('studentID')}
                            type='text'
                            placeholder='Student ID'
                            className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-300'
                            required
                        />

                        {errors.studentID && <p className='text-red-500'>{errors.studentID.message}</p>}

                        {/* phoneNumber */}
                        <input
                            {...register('phoneNumber')}
                            type="tel"
                            placeholder='Phone Number'
                            className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-300'

                            required
                        />

                        {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}

                        {/* password */}
                        <input
                            {...register('password')}
                            type='password'
                            placeholder='Password'
                            className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-300'
                            required
                        />

                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        {/* confirm password */}
                        <input
                            {...register('confirmPassword')}
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-300'
                            required
                        />

                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}

                        <button type='submit'
                            onClick={() => {
                                handleSubmit()
                            }}
                            className=' self-center bg-teal-500 text-white p-2 rounded-lg w-[90%]  md:w-[50%] '>Submit</button>

                    </form>
                    <div className='flex justify-center items-center mt-4'>
                        <span className='text-gray-500'>Account Exist?</span>
                        <a href='/Profile' className='text-teal-500 ml-2 text-sm hover:text-yellow-400 hover:font-bold'>Log In</a>
                    </div>
                </div>

                {/* toastify container */}
                <ToastContainer />

            </div >

        </>
    )
}


export default CreateAccount