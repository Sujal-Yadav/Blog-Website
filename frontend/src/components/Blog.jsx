const Blog = ({ title, description }) => {
    return (
        <a href="#">
            <div className="md:col-span-1 col-span-2 p-2 hover:scale-110 duration-300 cursor-pointer">
                <div className="flex justify-start bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 hover:bg-gray-600 outline-2 hover:outline-slate-400 dark:border-gray-700 text-wrap overflow-hidden">
                    <div className="p-5 text-wrap w-screen ">

                        <div className="mb-2 text-xl font-bold tracking-tight text-black  dark:text-white">{title}</div>
                        <div className="mb-3 font-normal  text-gray-700 dark:text-gray-400 ">{description}</div>

                        <div className="grid grid-cols-3">
                            <a href="#" class="col-sapn-start inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            <a href="#" class="col-start-3 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Share
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </a>
    );
}

export default Blog;
