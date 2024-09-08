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
  const isProfilePage = pathSegments.length === 3 && pathSegments[1] === 'profile';
  console.log(isLandingPage)
  const [navbar, setNavbar] = useState(true);
  const [profile, setProfile] = useState({});
  const [userProfile, setUserProfile] = useState(false);
  const [scrolling, setScrolling] = useState(false);

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

    if (isHomePage || isProfilePage) {
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
      <div className="md:hidden">
        <DarkModeToggle />
      </div>

      {/* Desktop Links */}
      <div className='hidden md:flex items-center ml-4'>
        {!isProfilePage &&
          <>
            <div className="p-4">Home</div>
            <div className="p-4">Blogs</div>
            <div className="p-4">Resources</div>
            <div className="p-4">Contacts</div>
            <div className="p-4">About</div>
          </>
        }
        <DarkModeToggle />

        {userProfile && (isHomePage || !isLandingPage && isProfilePage) && (
          <div className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-md m-2 flex justify-center items-center">
            <Link to={`/profile/${profile._id}`} className="flex items-center">
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

    </div>
  );
}
