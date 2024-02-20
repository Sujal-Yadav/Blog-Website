import Blog from "./Blog";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [blogs, setBlogs] = useState([{
        email: '',
        password: ''
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
        <div className='md:grid md:grid-cols-3 grid grid-cols-2 md:p-4 p-2'>
            {blogs.map((blog, index) => (
                <Blog key={index} email={blog.email} password={blog.password} />
            ))}
        </div>
    );
};

export default HomePage;
