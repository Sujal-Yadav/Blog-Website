import { renderMatches, useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile(props) {
    const [sidebar, setSidebar] = useState(false);
    const [profile, setProfile] = useState(false);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (!image) {
            fileInputRef.current.click();
        } else {
            handleUpload();
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        async function handleUpload() {
            if (!image) return;  // Prevent upload if no image is selected

            const htmlFormData = new FormData();
            htmlFormData.append('image', image);
            setUploading(true);

            try {
                const res = await axios.post('http://localhost:3000/uploadUserImage', htmlFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": localStorage.getItem('token'),
                    },
                });

                const uploadedUrl = res.data.user.profileImage;
                setUploadedImageUrl(uploadedUrl);  // Update the profile image URL immediately
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profileImage: uploadedUrl  // Update the profile state to trigger UI update
                }));
                // console.log(uploadedUrl);
            } catch (err) {
                console.error(err);
            } finally {
                setUploading(false);
            }
        }

        if (image) {
            handleUpload();  // Trigger upload only when image is selected
        }
    }, [image, setProfile]);

    useEffect(() => {
        async function renderProfile() {
            try {
                const response = await axios.get('http://localhost:3000/profile', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                })
                // const name = response.data.name;
                setUserDetails(response.data.user);
                setUploadedImageUrl(response.data.user.profileImage)
                setProfile(true);
            } catch (error) {
                alert(error.response.data.msg);
            }
        }
        renderProfile();
    }, []);

    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        city: '',
        country: '',
        zipCode: '',
        address: '',
        email: '',
        profileImage: ''
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        
        try {
            setTimeout(async () => {
                const res = await axios.post('http://localhost:3000/updateUserDetails', userDetails, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": localStorage.getItem('token'),
                    },
                });        
                setSaving(false);
            }, 3000);
        } catch (err) {
            console.error(err);
            setSaving(false);
        }
    };

    // useEffect(() => {
    //     async function getUserProfile(){
    //         try {
    //             const updatedRes = await axios.get('http://localhost:3000/profile', {
    //                 headers: {
    //                     "Authorization": localStorage.getItem('token'),
    //                 },
    //             });
    //             setUserDetails(updatedRes.data.user)
    //             // console.log(updatedRes.data.user)
    //         } catch (err) {
    //             console.error(err);
    //             setSaving(false);
    //         }
    //     }
    //     getUserProfile()
    // }, []);

    return (
        <>
            {/* <Navbar profile={true} /> */}
            <div>
                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <div className="p-4 md:ml-64 pt-20 h-full ">
                    <div className="py-4">
                        <ToastContainer />
                        <div className="flex justify-between">
                            <div className="text-black dark:text-white text-4xl py-5">User Setting</div>
                            
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-5">
                        <div className="col-span-2 grid grid-cols-3 rounded-lg bg-gray-100 p-6 dark:bg-gray-800">
                            {uploadedImageUrl ? (
                                <img className="col-span-1 flex justify-center items-center rounded-lg h-40 w-36" src={userDetails.profileImage} alt="Selected" />
                            ) : (
                                <div className="col-span-1 flex justify-center items-center rounded-lg h-40 w-36">
                                    <span>No Image</span>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                                ref={fileInputRef}
                            />

                            <div className="flex flex-col col-span-2 w-full">
                                <div className="text-black dark:text-white text-2xl font-semibold mx-4">{userDetails.name}</div>
                                <div className="text-black dark:text-gray-400 mx-4">Software Developer</div>
                                <button onClick={handleButtonClick} className="cursor-pointer mx-4 text-gray-700 inline-flex items-center mt-4 hover:text-white border border-gray-800 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900 w-fit">
                                    {uploading ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg> : <svg className="w-[20px] h-[20px] mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                                    </svg>}
                                    {uploading ? 'Uploading...' : image ? 'Upload Image' : 'Select Image'}
                                </button>
                                <span className="mx-4 my-2 text-sm dark:text-orange-200">
                                    * Please re-click the button to upload the profile photo.
                                </span>
                            </div>
                        </div>

                        <div className=" col-span-3 row-span-1 rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
                            <div className="flex mb-2 text-base text-gray-900 dark:text-slate-400">
                                Switch your subscription to a different type, such as a monthly plan, annual plan, or student plan. And see a list of subscription plans that Flowbite offers.
                            </div>
                            <div className="flex mb-4 text-base font-bold text-gray-900 dark:text-white">
                                Next payment of $36 (yearly) occurs on August 13, 2020.
                            </div>
                            <div className="flex mt-3 gap-4">
                                <div className="flex-row items-center space-x-4">
                                    <button type="button" className="text-gray-700 inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                                        <svg className="w-[20px] h-[20px] mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                                        </svg>
                                        Change Plan
                                    </button>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button type="button" className="text-gray-700 inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                                        <svg className="w-[20px] h-[20px] mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                                        </svg>
                                        CancelSubscription
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="p-8 col-span-3 row-span-3 items-center rounded-lg bg-gray-100 dark:bg-gray-800">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">General InhtmlFormation</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 grid-cols-4 sm:gap-6 sm:mb-5">
                                    <div className="col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" name="name" id="name" value={userDetails.name} disabled className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="brand" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Phone</label>
                                        <input type="number" name="phone" id="phone" value={userDetails.phone} disabled className="bg-gray-50 border cursor-not-allowed border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required="" />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="price" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">City</label>
                                        <input type="text" name="city" id="city" value={userDetails.city} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="item-weight" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Country</label>
                                        <input type="text" name="country" id="country" required value={userDetails.country} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>

                                    <div className="col-span-1">
                                        <label htmlFor="item-weight" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">ZIP/Postal Code</label>
                                        <input type="text" name="zipCode" id="zipCode" required value={userDetails.zipCode} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                        <input type="text" name="address" id="address" required value={userDetails.address} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </div>

                                </div>
                                <div className="flex items-center space-x-4">
                                    <button type="submit" className="text-gray-700 inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                                        {saving ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                        </svg> : <svg className="w-[20px] h-[20px] mr-1 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd" />
                                        </svg>}
                                        {saving ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-span-2 row-span-3">
                            <form className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
                                <div className="text-black dark:text-white text-2xl font-bold mb-4">Change Password</div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" id="email" value={userDetails.email} disabled className="cursor-not-allowed shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                    <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat New password</label>
                                    <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                                </div>

                                <button type="button" className="text-gray-700 mb-2 inline-flex items-center hover:text-white border border-gray-800 hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900">
                                    <svg className="w-[20px] h-[20px] mr-1 -ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                                    </svg>

                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
