'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { imgSetup } from "@/helper";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required')
});

export default function Login() {

  const navigate = useRouter()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      navigate.replace('/menu');
    },
  });

  return (
    <main className="flex flex-col relative w-full bg-gradient-to-tr justify-center items-center min-h-screen from-primary via-white to-secondary p-6">
      <div className='absolute inset-0 bg-black opacity-40'/>
      <div className="gap-4 z-10 flex px-6 flex-col items-center justify-center text-center text-black py-6 shadow-xl bg-white">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <p className="text-lg text-gray-700">Sign in to access your e-wallet and travel hassle-free.</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-full max-w-md">
          <div className="flex flex-col mb-4 gap-1">
            <label htmlFor="username" className="text-left">Username</label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps('username')}
              className={`p-2 rounded-md border-2 text-black ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-left">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="flex flex-col mb-4 gap-1">
            <label htmlFor="password" className="text-left">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className={`p-2 rounded-md border-2 text-black ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-left">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-between mb-4">
            <div className='flex items-center'>
              <input
                id="rememberMe"
                type="checkbox"
                {...formik.getFieldProps('rememberMe')}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className='text-sm'>Remember Me</label>
            </div>
            <div>    
              <a href="#" className="text-gray-700 text-sm mt-4">Forgot Password?</a>
            </div>
          </div>
          <button type="submit" className="py-2 px-6 bg-primary text-white rounded-md text-center">
            Submit
          </button>
          <Link href="/register" className="hover:text-secondary text-gray-700 mt-4">Don&apos;t have an account? Register</Link>
        </form>
      </div>
    </main>
  );
}
