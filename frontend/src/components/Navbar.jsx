import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import DarkModeToggle from "./DarkModeToggle";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const [navbar, setNavbar] = useState(true);
    const [profile, setProfile] = useState("");
    const [userProfile, setUserProfile] = useState(false);
    const [position, setPosition] = useState(false);
    const navigate = useNavigate();

    function handleNavbar() {
        setNavbar(!navbar);
    }

    useEffect(() => {
        async function renderName() {
            try {
                const response = await axios.get('http://localhost:3000/userAuth', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                const name = response.data;
                setProfile(name);
                setUserProfile(true);

            } catch (error) {
                alert(error.response.data.msg);
            }
        }

        { props.user && renderName() }
    }, [])

    return (
        <div className={props.position ? 'flex justify-between items-center fixed h-20 mx-auto max-w-screen-2xl w-full border-b border-white-800 bg-white dark:bg-slate-950 text-black dark:border-slate-800 dark:text-white px-4' : 'flex justify-between items-center h-20 mx-auto max-w-screen-2xl border-b border-white-800 text-black dark:border-slate-800 dark:text-white px-4'}>
            <div onClick={handleNavbar} className="md:hidden items-center justify-center p-6 block">
                {!navbar ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </div>
            <h1 className='w-full text-5xl font-bold text-[#00df9a]'>
                Blogsite
            </h1>
            {!props.position && <ul className='hidden md:flex'>
                <li className='p-4'>Home</li>
                <li className='p-4'>Blogs</li>
                <li className='p-4'>Resources</li>
                <li className='p-4'>Contacts</li>
                <li className='p-4'>About</li>
                
            </ul>}
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

            {userProfile &&
                <>
                    {/* <div>
                        <button className="bg-slate-100 p-2 rounded-md dark:bg-slate-800" onClick={handleLogout}>Logout</button>
                    </div> */}
                    <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md m-2">
                        <Link to='/profile'>
                            <div className="flex justify-center items-center">
                                <div className=" ml-2 rounded-full">
                                    <img className="object-fill max-w-9" src="src\assets\male_icon.png" alt="" />
                                </div>
                                <div className="mx-2 text-nowrap">{profile}</div>
                            </div>
                        </Link>

                    </div>

                </>
            }
        </div>
    );
}
