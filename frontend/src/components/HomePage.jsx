import Blog from "./Blog";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [blogs, setBlogs] = useState([{
        title: '',
        description: '',
        createdAt: Date()
    }]);

    useEffect(() => {
        async function handleBlog() {
            const response = await axios.get('http://localhost:3000/getBlog', {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            setBlogs(response.data);
        }
        handleBlog();
    }, []);

    return (
        <>
            {/* <Navbar home={true} position={false} /> */}
            <div className="pb-2 mt-16">
                <div className="grid grid-cols-2 h-screen dark:text-white">
                    <div className="col-span-1 pt-20 ml-16">
                        <div className="mt-20 text-5xl p-8 font-bold">
                            Create a blog
                        </div>
                        <p className="text-xl px-8">
                            Share your story with the world. Stand out with a professionally-designed blog website that can be customized to fit your brand. Build, manage, and promote your blog with Squarespace’s built-in suite of design and marketing tools.
                        </p>
                        <button className="mx-8 my-10 px-6 py-4 text-xl border rounded-md font-bold bg-[#00df9a]">Get started</button>
                    </div>
                    <div className="col-span-1 pl-10">
                        <img className="mt-28 w-10/12" src="/src/assets/blog.jpeg" alt="" />
                    </div>
                </div>
                <div className="text-7xl flex justify-center dark:text-white font-bold">Blogs to read</div>
                <div className='md:grid md:grid-cols-2 grid grid-cols-2 md:p-4 p-2 lg:grid lg:grid-cols-2 gap-6 m-20'>

                    {blogs.map((blog, index) => (
                            <Link key={index} to={`/blogPage/${blog._id}`}>
                                <Blog title={blog.title} description={blog.description} createdAt={blog.createdAt} />
                            </Link>
                    ))}
                </div>

                <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
                    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Blogsite™</a>. All Rights Reserved.
                        </span>
                        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>


        </>
    );
};

export default HomePage;
