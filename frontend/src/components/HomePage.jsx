import Blog from "./Blog";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [blogs, setBlogs] = useState([{
        title: '',
        description: ''
    }]);

    useEffect(() => {

        axios.get('http://localhost:3000/getBlog', {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(function (res) {
            const data = res.data;
            // console.log(data);
            setBlogs(data);
        });
    }, []);

    return (
        <>
            <div className="grid grid-cols-2 h-screen dark:text-white">
                <div className="col-span-1">
                    <div className="mt-20 text-5xl p-8 font-bold">
                        Create a blog
                    </div>
                    <p className="text-xl px-8">
                        Share your story with the world. Stand out with a professionally-designed blog website that can be customized to fit your brand. Build, manage, and promote your blog with Squarespace’s built-in suite of design and marketing tools.
                    </p>
                    <button className="mx-8 my-10 px-6 py-4 text-xl border rounded-md font-bold bg-[#00df9a]">Get started</button>
                </div>
                <div className="col-span-1 pl-10">
                    <img className="mt-28 w-10/12" src="src\assets\blog.jpeg" alt="" />
                </div>

            </div>
            <div className="text-7xl flex justify-center dark:text-white font-bold">Blogs to read</div>
            <div className='md:grid md:grid-cols-2 grid grid-cols-2 md:p-4 p-2 lg:grid lg:grid-cols-3'>

                {blogs.map((blog, index) => (
                    <Blog key={index} title={blog.title} description={blog.description} />
                ))}
            </div>
        </>
    );
};

export default HomePage;
