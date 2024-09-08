import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BlogPage() {
  const { userId, blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${blogId}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setBlog(response.data.blog);
        console.log(response.data)
      } catch (err) {
        setError('Failed to fetch blog');
      }
    }

    fetchBlog();
  }, [blogId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
    {/* <Navbar /> */}
      <div className='mt-20 h-screen dark:text-white'>

        <h1>{blog.title}</h1>
        <p>{blog.description}</p>
        <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
    </>
  );
};

export default BlogPage
