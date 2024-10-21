// components/Sidebar.js

import { imgSetup } from '@/helper';
import Image from 'next/image';
import { useState } from 'react';

const SidebarContent = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full">
      {/* Mobile Hamburger Icon */}
      {/* <div className="md:hidden">
        <button onClick={toggleSidebar} className="p-4"> */}
          {/* You can use an icon here */}
          {/* <span className="text-2xl">&#9776;</span>
        </button>
      </div> */}

      {/* Sidebar */}
      <div className={`fixed inset-0 z-40 bg-gray-800 h-screen shadow-xl bg-opacity-75 md:bg-transparent md:relative md:block ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}>
        <div className="flex flex-col bg-white w-64 h-full p-4">
            <div className='flex self-center pt-4'>
                <Image
                    src={`${imgSetup}logo.png`}
                    alt='logo'
                    width={80}
                    height={80}
                    objectFit='contain'
                />
            </div>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="block p-2 hover:bg-gray-200">Home</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-200">About</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-200">Services</a></li>
            <li><a href="#" className="block p-2 hover:bg-gray-200">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-grow w-full transition-all duration-300 ${isOpen ? 'opacity-50' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

export default SidebarContent