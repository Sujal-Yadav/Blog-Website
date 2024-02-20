import { useState } from "react";
import { AiOutlineClose, AiOutlineHome, AiOutlineMenu } from 'react-icons/ai'

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);
    function handleNavbar() {
        setNavbar(!navbar);
    }

    return (
        <div className='flex justify-between items-center h-20 mx-auto max-w-screen-2xl text-white px-4'>
            <div onClick={handleNavbar} className="md:hidden flex items-center justify-center p-6">
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

            
        </div>



    );
}
