const Blog = ({ email, password }) => {
    return (
        <div className="md:col-span-1 col-span-2 p-2">
            <div className="flex justify-start bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 hover:bg-gray-600 outline-2 hover:outline-slate-400 dark:border-gray-700 overflow-hidden">
                
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-white dark:text-white">{email}</h5>
                    </a>
                    <p className="mb-3 font-normal  text-gray-700 dark:text-gray-400">{password}</p>
                    
                </div>
            </div>
        </div>
    );
}

export default Blog;
