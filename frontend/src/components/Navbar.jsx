import { useState } from "react";
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
    const [navbar, setNavbar] = useState(true);
    function handleNavbar() {
        setNavbar(!navbar);
    }

    return (
        <div className='flex justify-between items-center h-20 mx-auto max-w-screen-2xl border-b border-white-800 text-black dark:border-slate-800 dark:text-white px-4'>
            <div onClick={handleNavbar} className="md:hidden items-center justify-center p-6 block">
                {!navbar ? <AiOutlineClose size={24}/> : <AiOutlineMenu size={24}/>}
            </div>
            <h1 className='w-full text-5xl font-bold text-[#00df9a]'>
                Blogsite
            </h1>
            <ul className='hidden md:flex'>
                <li className='p-4'>Home</li>
                <li className='p-4'>Blogs</li>
                <li className='p-4'>Resources</li>
                <li className='p-4'>Contacts</li>
                <li className='p-4'>About</li>
            </ul>
            <DarkModeToggle />

            <div className={!navbar ? 'fixed left-0 w-full text-lg backdrop-blur-md  h-auto text-center mt-20 top-0 ease-in-out duration-500' : 'fixed top-[-100%]'}>
            <ul className='block md:hidden'>
                <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Home</li>
                <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Blogs</li>
                <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Resources</li>
                <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Contacts</li>
                <li className='p-4'>About</li>
            </ul>

            </div>

            
        </div>



    );
}
