import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Blog from './Blog'
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserBlogs() {
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([{
        title: '',
        description: '',
        createdAt: Date()
    }]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userInfo = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        "Authorization": localStorage.getItem('token')
                    },
                })
                setUserId(userInfo.data.user._id);
                // console.log(userInfo.data.user._id)
            }
            catch (err) {
                console.log(err)
            }
        }
        loadUser();
    }, [])

    useEffect(() => {
        const loadUserBlogs = () => {
            setTimeout(async () => {
                try {
                    const userInfo = await axios.get('http://localhost:3000/getUserBlogs', {
                        headers: {
                            "Authorization": localStorage.getItem('token')
                        },
                    })
                    setBlogs(userInfo.data.userBlogs);
                    // setPulse(false)
                }
                catch (err) {
                    console.log(err)
                }
                finally {
                    setLoading(false);
                }
            }, 3000);
        }
        loadUserBlogs();
    }, []);


    return (
        <div>
            {/* <Navbar position={false} /> */}
            <div className="md:ml-64 pl-6 text-5xl flex dark:text-white font-bold pt-28">Blogs to read</div>
            {loading ? (
                <div className='md:ml-64 lg:ml-60 mx-auto md:grid md:grid-cols-2 grid grid-cols-2 md:p-4 p-2 lg:grid shadow lg:grid-cols-2 gap-6 m-10 h-screen'>
                    <div className="md:col-span-1 col-span-2 p-2  animate-pulse cursor-not-allowed">
                        <div className="flex flex-col justify-between bg-gray-100 border border-gray-200 rounded-md shadow dark:bg-gray-800 hover:bg-gray-200 outline-2 hover:outline-slate-400 dark:border-gray-700 h-60">
                            <div className='p-5 flex-grow overflow-hidden'>
                                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 col-span-2 p-2 hover:scale-110 duration-300 animate-pulse cursor-not-allowed">
                        <div className="flex flex-col justify-between bg-gray-100 border border-gray-200 rounded-md shadow dark:bg-gray-800 hover:bg-gray-200 outline-2 hover:outline-slate-400 dark:border-gray-700 h-60">
                            <div className='p-5 flex-grow overflow-hidden'>
                                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="md:ml-64 mx-auto md:grid md:grid-cols-2 grid grid-cols-2 md:p-4 p-2 lg:grid shadow lg:grid-cols-2 gap-6 m-6">
                    {blogs.map((blog, index) => (
                        <div key={index}>
                            {/* Wrap Blog card with Link, but keep Edit button outside to avoid triggering redirection */}
                            <Link to={`/userBlogs/${userId}/blogPage/${blog._id}`}>
                                <Blog title={blog.title} description={blog.description} createdAt={blog.createdAt} blogId={blog._id}/>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserBlogs
