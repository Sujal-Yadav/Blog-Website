import { Link, useNavigate } from "react-router-dom";
// import { Navbar } from "./Navbar";
import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {

    const navigate = useNavigate();
    const [wrongPass, setWrongPass] = useState("");

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
            // Store the token in localStorage
            alert("Login Successfull")
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (error) {
            return setWrongPass("You entered wrong password")
        }
    };

    return (
        <div>
            {/* <Navbar /> */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 bg-black p-6 rounded-md">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" autoComplete="email" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <div className=" mb-4 text-lg text-red-800 dark:text-red-500" role="alert">
                        {wrongPass}
                    </div>
                </div>

                <div className="md:grid md:grid-cols-4 gap-4 grid grid-cols-4">
                    <div className="md:mt-2 mt-2 md:col-span-2 col-span-2">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                    </div>

                    <div className="md:mt-2 mt-2 md:col-span-2 col-span-2">
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to='/signup'>Sign Up</Link></button>
                    </div>

                    <div className="md:my-2 my-4 col-span-4 border-t-2 pt-4">
                        <button type="button" className="text-white bg-blue-600 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center justify-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
