import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import UserBlogs from './UserBlogs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Setting() {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [activeTab, setActiveTab] = useState('setting'); // State to track active tab

    function handleTabClick(tab) {
        setActiveTab(tab);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        // setProfile(false);
        navigate('/');
    }

    useEffect(() => {
        async function renderProfile() {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                // const name = response.data.name;
                setUserDetails(response.data.user);
                // setProfile(true);
            } catch (error) {
                alert(error.response.data.msg);
            }
        }
        renderProfile();
    }, []);

    return (
        <div>
            <div>
                <div className="fixed top-20 left-0 w-64 h-0 transition-transhtmlForm -translate-x-full md:translate-x-0">
                    <div className="h-full grid grid-rows-[1fr,auto] bg-white dark:bg-gray-950 rounded-lg">
                        <div className="px-3 py-4">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link to={`/setting/${userDetails._id}`}>
                                        <button onClick={() => handleTabClick('setting')} className={`flex items-center p-2.5 rounded-lg ${activeTab === 'setting'
                                            ? 'bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-white'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}>
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/setting/${userDetails._id}/blogs`}>
                                        <button onClick={() => handleTabClick('blogs')} className={`flex items-center p-2.5 rounded-lg ${activeTab === 'blogs'
                                            ? 'bg-gray-100 dark:bg-gray-700  text-gray-900 dark:text-white'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}>
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Your Blogs</span>
                                            {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/setting/${userDetails._id}/resources`}>
                                        <button onClick={() => handleTabClick('resources')} className={`flex items-center p-2 rounded-lg ${activeTab === 'resources'
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}>
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Resources</span>
                                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/setting/${userDetails._id}/contacts`}>
                                        <button onClick={() => handleTabClick('contacts')} className={`flex items-center p-2 rounded-lg ${activeTab === 'contacts'
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}>
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">Contacts</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/setting/${userDetails._id}/about`}>
                                        <button onClick={() => handleTabClick('about')} className={`flex items-center p-2 rounded-lg ${activeTab === 'about'
                                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}>
                                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                            </svg>
                                            <span className="flex-1 ms-3 whitespace-nowrap">About</span>
                                        </button>
                                    </Link>
                                </li>

                                <li>
                                    <button className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                        </svg>
                                        <span className="flex ms-3 justify-start whitespace-nowrap" onClick={handleLogout} role='button' onFocus={ () => {} }>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="">
                {/* Render the content based on the active tab */}
                {activeTab === 'setting' && <Profile />}
                {activeTab === 'blogs' && <UserBlogs />}
                {activeTab === 'resources' && <div>Resources Content</div>}
                {activeTab === 'contacts' && <div>Contacts Content</div>}
                {activeTab === 'about' && <div>About</div>}
            </div>

        </div>
    )
}

export default Setting
