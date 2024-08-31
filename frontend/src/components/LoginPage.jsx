import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Lottie from 'react-lottie';
import Login from '../../public/Login.json'

export default function LoginPage() {
    const navigate = useNavigate();
    const [wrongPass, setWrongPass] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    function handleVisible() {
        setIsVisible(!isVisible);
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Login,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            const token = response.data.token;
            // alert("Login Successfull")
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (error) {
            console.log(error.response.data.msg)
            return setWrongPass(error.response.data.msg);
        }
    };

    const handleGoogleResponse = async (authResult) => {
        try{
            if(authResult['code']){
                console.log(authResult)
            }
        } catch (err) {

        }
    }

    // const googleLogin =  useGoogleLogin({
    //     onSuccess: handleGoogleResponse,
    //     onError: handleGoogleResponse,
    //     flow: 'auth-code'
    // })

    return (
        <div className="h-screen sm:h-dvh mt-10">
            <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-1 justify-center items-center ml-4">
                <div className="col-span-1 md:flex hidden"><Lottie
                    options={defaultOptions}
                    height={600}
                    width={600}
                /></div>
                <form onSubmit={handleSubmit} className="col-span-1 h-fit  mx-8 dark:bg-slate-950 p-6 border dark:border-slate-800 rounded-md">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white pb-2">
                        Sign in to Blogsite
                    </h2>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-950 dark:border-slate-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" autoComplete="email" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-950 dark:border-slate-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        <div className=" mb-4 text-lg text-red-800 dark:text-red-500" role="alert">
                            {wrongPass}
                        </div>
                    </div>

                        <div className="md:grid md:grid-cols-4 gap-4 grid grid-cols-4">
                            <div className="md:mt-2 mt-2 md:col-span-2 col-span-2">
                                <button type="submit" className="text-white dark:text-slate-950 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                            </div>

                        <div className="md:mt-2 mt-2 md:col-span-2 col-span-2">
                            <Link to='/signup'><button type="button" className="text-white bg-blue-700 dark:text-slate-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button></Link>
                        </div>

                        <div className="md:my-2 my-4 col-span-4 ">
                            <div className="border-t dark:border-slate-800 pb-6"></div>
                            <button type="button" className="text-white dark:text-slate-950 bg-blue-600 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center justify-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
                                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                </svg>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}
