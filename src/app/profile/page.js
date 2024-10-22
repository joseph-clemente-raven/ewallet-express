'use client';
import React from 'react';
import { useFormik } from 'formik';

const Profile = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      fullname: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
      // Handle form submission here (e.g., API call)
    },
  });

  return (
    <div className='h-screen flex w-full flex-col justify-center items-center bg-gradient-to-tr from-primary via-white to-secondary'>
      <div className='bg-white rounded-lg shadow-xl p-8 max-w-sm w-full'>
        <h1 className='text-4xl text-center font-extrabold text-gray-800 mb-6'>Profile</h1>
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
          <div className="flex flex-col">
            <label htmlFor='username' className='text-gray-700 font-semibold mb-2'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              onChange={formik.handleChange}
              value={formik.values.username}
              className='p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor='fullname' className='text-gray-700 font-semibold mb-2'>Full Name</label>
            <input
              type='text'
              id='fullname'
              name='fullname'
              placeholder='Enter your full name'
              onChange={formik.handleChange}
              value={formik.values.fullname}
              className='p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor='password' className='text-gray-700 font-semibold mb-2'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              onChange={formik.handleChange}
              value={formik.values.password}
              className='p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          <button
            type='submit'
            className='bg-primary hover:bg-secondary text-white font-semibold p-3 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
