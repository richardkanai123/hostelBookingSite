"use client"
import React from 'react'
import { auth } from '@/app/utils/Firebase/Firebase'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
// yup
// yup for validation
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// toastify
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// login form validation schema
const schema = yup.object().shape({
  email: yup.string('Email must be a string').email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required')
})

const LoginForm = () => {
  // react hook form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // router
  const Router = useRouter()


  const LoginUser = async (data) => {
    // get email and password from form
    const { email, password } = data
    // try to login
    try {
      // login
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        // toastify
        toast.success('Login successful')
      })
      // redirect to dashboard
        .finally(() => {
          Router.push('/')
        }
      )

    } catch (error) {
      // toastify
      toast.error(error.message)
    }
   }

  return (
      // login form container
      <div className='flex justify-center items-center h-screen'>
          {/* login form */}
      <div className='w-[95%] md:w-1/2 min-h-[400px] lg:w-[30%]  max-h-fit p-2 lg:p-4 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center '>
        <form
          // disable autocomplete 
          autoComplete='off'
          // form submit handler
          onSubmit={handleSubmit(LoginUser)}
          className='flex flex-col gap-2 mt-4 w-full h-full'>
          <h1 className='text-2xl text-center font-bold text-gray-700'>Student Login</h1>
          
          <input
            // register input
            {...register('email')}
             type='email' placeholder='your email' className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-500'
          />
          {/* error message */}
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
          <input
            // register input
            {...register('password')}
           type='password' placeholder='Password' className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-teal-500 invalid:border-red-500'
          />

          {/* error message */}
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          <button type='submit' className='w-full bg-teal-500 text-white p-2 rounded-lg'>
            Login
          </button>
        </form>


        {/* register and reset password links */}
        <div className='flex justify-center items-center mt-4'>
            <span className='text-gray-500'>New Student?</span>
              <a href='/Createaccount' className='text-teal-500 ml-2'>Register</a>
        </div>


          {/* reset password link */}
        <div className='flex justify-center items-center mt-4'>
                  <span className='text-gray-500'>Forgot Password?</span>
            <button
              onClick={ async() => { 
                // get email
                const email = document.querySelector('input[name="email"]').value
                // send reset email
              await sendPasswordResetEmail(auth, email)
              .then(() => {
                // toastify
                toast.success('Password reset email sent')
              })
                .catch((error) => {
                  // toastify
                  toast.error(error.message)
                }
              )
              
              }}
              className=' rounded-md text-teal-500 ml-2 hover:text-teal-800'>
              Reset
            </button>
          </div>
        
      </div>
      <ToastContainer />
      </div>
  )
}

export default LoginForm