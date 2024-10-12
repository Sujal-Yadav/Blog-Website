import { format } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ title, description, createdAt }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);
    const [loading, setLoading] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsModalOpen(false);
    };

    const handleSave = async (e) => {
        e.stopPropagation();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/updateBlog/${blogId}`, {
                title: editedTitle,
                description: editedDescription,
            }, {
                headers: {
                    "Authorization": localStorage.getItem('token'),
                }
            });
            // onBlogUpdate(blogId, editedTitle, editedDescription); // Update parent state with new values
        } catch (err) {
            console.log(err);
        }
    };

    const formattedDate = format(new Date(createdAt), 'PPp');
    return (
        <>
            <div className="md:col-span-1 col-span-2 p-2  cursor-pointer">
                <div className="flex flex-col justify-between bg-gray-100 border border-gray-200 rounded-md shadow dark:bg-gray-800 hover:bg-gray-200 outline-2 hover:outline-slate-400 dark:border-gray-700 h-60">
                    <div className='p-5 flex-grow overflow-hidden'>
                        <div className='flex justify-between items-center'>
                            <div className="mb-2 text-2xl font-bold text-black dark:text-white line-clamp-none">{title}</div>

                            <button type="button" onClick={openModal} className="h-6 w-6">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.474 3.526a1.875 1.875 0 1 1 2.651 2.651l-9.82 9.82-3.53.879.878-3.53 9.821-9.82Z" />
                                </svg>
                            </button>

                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-none break-words">{description}</p>
                    </div>
                    <div className='relative '>
                        <div className='text-sm absolute dark:text-gray-400 right-0 bottom-0 px-6 py-4'>{formattedDate}</div>
                    </div>

                    {/* <div className="grid grid-cols-2 gap-4 p-5">
                        <a href="#" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Share
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div> */}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
                        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Edit Blog</h2>

                        {/* Full Blog Title Editing */}
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                            placeholder="Title"
                            
                        />

                        {/* Full Blog Description Editing */}
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
                            rows="6"
                            placeholder="Description"
                        />

                        {/* Save and Cancel Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Blog;
