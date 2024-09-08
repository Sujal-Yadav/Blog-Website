import { format } from 'date-fns';

const Blog = ({ title, description, createdAt }) => {
    const formattedDate = format(new Date(createdAt), 'PPpp');
    return (
        <>
            <div className="md:col-span-1 col-span-2 p-2 hover:scale-110 duration-300 cursor-pointer">
                <div className="flex flex-col justify-between bg-gray-100 border border-gray-200 rounded-md shadow dark:bg-gray-800 hover:bg-gray-200 outline-2 hover:outline-slate-400 dark:border-gray-700 h-60">
                    <div className='p-5 flex-grow overflow-hidden'>
                        <div className='flex justify-between items-center'>
                            <div className="mb-2 text-2xl font-bold text-black dark:text-white line-clamp-none">{title}</div>
                            <div className='text-sm dark:text-gray-400'>{formattedDate}</div>
                        </div>

                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-none break-words">{description}</p>
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
        </>
    );
}

export default Blog;
