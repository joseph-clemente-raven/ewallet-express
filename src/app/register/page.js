'use client'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { imgSetup } from "@/helper";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Register() {
  const navigate = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle registration logic here (e.g., API call)
      console.log(values);
      
      // Redirect to the trip tracking page after successful registration
      navigate.replace('/trip-tracking');
    },
  });

  return (
    <main className="flex flex-col relative w-full bg-gradient-to-tr justify-center items-center min-h-screen from-primary via-white to-secondary p-6">
      <div className='absolute inset-0 bg-black opacity-40'/>
      <div className="gap-4 z-10 flex px-6 flex-col items-center justify-center text-center text-black py-6 shadow-xl bg-white">
        <h1 className="text-4xl font-bold">Create Account</h1>
          <p className="text-lg text-gray-700">Sign up for a seamless travel experience with our e-wallet!</p>
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
            <div className="flex flex-col mb-6 gap-1">
              <label htmlFor="confirmPassword" className="text-left">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
                className={`p-2 rounded-md border-2 text-black ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-left">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <button type="submit" className="py-2 px-6 bg-primary rounded-md text-white text-center">
              Submit
            </button>
            <Link href="/login" className="hover:text-secondary text-gray-700 mt-4">Already have an account? Sign in</Link>
          </form>
        </div>
    </main>
  );
}
