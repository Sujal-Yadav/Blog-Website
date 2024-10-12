import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import DarkModeToggle from "./DarkModeToggle";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const isHomePage = pathSegments.length === 3 && pathSegments[1] === 'home';
  const isLandingPage = pathSegments[0] === '';
  const isSettingPage = pathSegments.length === 3 && pathSegments[1] === 'setting';
  const isUserBlogs = pathSegments.length === 4 && pathSegments[3] === 'blogs';
  const isResources = pathSegments.length === 4 && pathSegments[3] === 'resources';
  const isContacts = pathSegments.length === 4 && pathSegments[3] === 'contacts';
  const isAbout = pathSegments.length === 4 && pathSegments[3] === 'about';
  const [navbar, setNavbar] = useState(true);
  const [profile, setProfile] = useState({});
  const [userProfile, setUserProfile] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveBlog, setSaveBlog] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    resetForm()
    setIsModalOpen(false);
  };
  
  function handleNavbar() {
    setNavbar(!navbar);
  }

  useEffect(() => {
    async function renderName() {
      try {
        const response = await axios.get("http://localhost:3000/userAuth", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setProfile(response.data.user);
        console.log(response.data.user);
        setUserProfile(true);
      } catch (error) {
        alert(error.response?.data?.msg || 'An error occurred');
      }
    }

    if (isHomePage) {
      renderName();
    }
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [addBlog, setAddBlog] = useState({
    title: '',
    description: ''
  })

  const resetForm = () => {
    setAddBlog({
      title: '',
      description: ''
    });
  };

  const handleBlogChange = (e) => {
    setAddBlog({ ...addBlog, [e.target.name]: e.target.value });
  };

  const handleBlogUpload = async (e) => {
    e.preventDefault();
    setSaveBlog(true);
    try {
      setTimeout(async () => {
        const res = await axios.post('http://localhost:3000/postBlog', addBlog, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem('token'),
          },
        });
        setSaveBlog(false);
        closeModal();
        toast.success('Blog saved successfully!', {
          autoClose: 5000, // Toast will disappear after 5 seconds
        });
      }, 3000);

    } catch (err) {
      console.error(err);
      toast.error('Failed to save the blog.', {
        autoClose: 5000,
      });
      setSaveBlog(false);
    }
  };

  //     return (
  //         <div className={props.position ? 'flex justify-between items-center fixed h-20 mx-auto max-w-screen-2xl w-full border-b border-white-800 bg-white dark:bg-slate-950 text-black dark:border-slate-800 dark:text-white px-4' : 'fixed top-0 flex justify-between items-center h-20 mx-auto max-w-screen-2xl border-b border-white-800 text-black dark:border-slate-800 dark:text-white px-4'}>
  //             <div onClick={handleNavbar} className="md:hidden items-center justify-center p-6 block">
  //                 {!navbar ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
  //             </div>
  //             <Link to='/home' >
  //                 <h1 className='w-full text-5xl font-bold text-[#00df9a]'>
  //                     Blogsite
  //                 </h1>
  //             </Link>
  //             {!props.position && <ul className='hidden md:flex'>
  //                 <li className='p-4'>Home</li>
  //                 <li className='p-4'>Blogs</li>
  //                 <li className='p-4'>Resources</li>
  //                 <li className='p-4'>Contacts</li>
  //                 <li className='p-4'>About</li>

  //             </ul>}
  //             <DarkModeToggle />
  //             <div className={!navbar ? 'fixed left-0 w-full text-lg backdrop-blur-md h-auto text-center mt-20 top-0 ease-in-out duration-500' : 'fixed top-[-100%]'}>
  //                 <ul className='block md:hidden'>
  //                     <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Home</li>
  //                     <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Blogs</li>
  //                     <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Resources</li>
  //                     <li className='p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold'>Contacts</li>
  //                     <li className='p-4'>About</li>
  //                 </ul>
  //             </div>

  //             {userProfile &&
  //                 <>
  //                     {/* <div>
  //                         <button className="bg-slate-100 p-2 rounded-md dark:bg-slate-800" onClick={handleLogout}>Logout</button>
  //                     </div> */}
  //                     <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md m-2">
  //                         <Link to='/profile'>
  //                             <div className="flex justify-center items-center">
  //                                 <img className="object-fill max-w-9 rounded-full mx-2" src="src\assets\male_icon.jpg" alt="" />
  //                                 <div className="mx-2 text-nowrap">{profile}</div>
  //                             </div>
  //                         </Link>

  //                     </div>
  //                 </>
  //             }
  //         </div>
  //     );
  // }

  return (
    <div
      className={`${scrolling ? "bg-opacity-90 h-16" : "h-20"} flex justify-between items-center fixed top-0 w-full z-50 transition-all duration-300 ease-in-out bg-white dark:bg-slate-950 text-black dark:text-white px-4 border-b dark:border-slate-800 
        ${scrolling ? "border-gray-300 dark:border-slate-800" : ""}`}
    >
      {/* Logo and Menu */}
      <div className="flex items-center justify-center">
        <div onClick={handleNavbar} className="mx-2 md:hidden">
          {!navbar ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
        <Link to={`/home/${profile._id}`}>
          <h1 className="text-5xl font-bold text-[#00df9a]">Blogsite</h1>
        </Link>
      </div>
      <div className="md:hidden flex justify-center items-center gap-3">
        <DarkModeToggle />
        {!isUserBlogs && <button onClick={openModal} className="flex justify-center items-center">
          <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md">
            <div className="mx-2 my-1.5 dark:text-white font-bold">Create Blog</div>
          </div>
        </button>}
      </div>

      {isUserBlogs &&
        <div className="md:hidden absolute">
          <div data-dial-init class="fixed end-6 bottom-6 p-4">
            <button type="button" onClick={openModal} data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" class="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
              <svg class="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </div>
      }

      {/* Desktop Links */}
      <div className='hidden md:flex items-center ml-4'>
        {!isSettingPage && !isUserBlogs && !isResources && !isContacts && !isAbout &&
          <>
            <div className="p-4">Home</div>
            <div className="p-4">Blogs</div>
            <div className="p-4">Resources</div>
            <div className="p-4">Contacts</div>
            <div className="p-4">About</div>
          </>
        }

        <div className="flex justify-center items-center gap-3">
          <DarkModeToggle />
          {isUserBlogs && <button onClick={openModal} className="flex justify-center items-center">
            <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md">
              <div className="mx-2 my-1.5 dark:text-white font-bold">Create Blog</div>
            </div>
          </button>}
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
          </div>
        </div>

        {userProfile && (isHomePage || !isLandingPage && isSettingPage) && (
          <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md m-2 flex justify-center items-center">
            <Link to={`/setting/${profile._id}`} className="flex items-center">
              <img
                className="object-fill w-9 h-9 rounded-full mx-2"
                src="/src/assets/male_icon.jpg"
                alt="User Profile"
              />
              <div className="mx-2 text-nowrap">{profile.name}</div>
            </Link>
          </div>
        )}

      </div>


      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-0 w-full h-auto text-lg backdrop-blur-lg text-center ${!navbar ? "translate-y-0 mt-20" : "-translate-y-full"
          } transition-transform duration-500 ease-in-out`}
      >
        <ul className="block md:hidden mt-20 backdrop-blur-lg">
          <li className="p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold">
            Home
          </li>
          <li className="p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold">
            Blogs
          </li>
          <li className="p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold">
            Resources
          </li>
          <li className="p-4 mx-10 border-b-2 border-gray-500 text-xl font-semibold">
            Contacts
          </li>
          <li className="p-4">About</li>
        </ul>
      </div>

      {/* Profile */}
      {isModalOpen && (
        <div className="absolute z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transhtmlForm overflow-hidden rounded-lg bg-white dark:bg-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <form onSubmit={handleBlogUpload}>
                  <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex flex-col">
                      <h3 className="text-3xl font-semibold leading-6 my-4 text-gray-900 dark:text-white" id="modal-title">Create a New Blog</h3>
                      <div className="grid grid-cols-1">
                        <div className="col-span-2">
                          <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Title</label>
                          <input type="text" name="title" id="title" value={addBlog.title} onChange={handleBlogChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="brand" className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Description</label>
                          <input type="text" name="description" id="description" value={addBlog.description} onChange={handleBlogChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      {saveBlog ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                      </svg> : <svg className="w-[20px] h-[20px] mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                      </svg>}
                      {saveBlog ? 'Saving' : 'Create Blog'}
                    </button>
                    <button
                      type="reset"
                      onClick={closeModal}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
