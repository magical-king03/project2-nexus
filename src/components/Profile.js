import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { auth } from '../config';
import '../css/Profile.css'

function Profile() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [deleteCheck, setDeleteCheck] = useState(false);
    const [qrcode, setQRCode] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        console.log(users)
        fetchUsers();
    }, [username]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/api-users');
            const data = await response.json();
            let email = username + '@gmail.com';
            let tempUser = [];
            for (const key in data) {
                if (email === data[key].email) {
                    let user = {
                        id: key,
                        ...data[key],
                    };
                    tempUser.push(user);
                }
            }
            setUsers(tempUser);
            console.log(users)
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('email');
            navigate('/signup');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const handleDelete = () => {
        setDeleteCheck(true);
    };

    const handleCancel = () => {
        setDeleteCheck(false);
    };

    const handleSureDelete = async () => {
        try {
            let result = await fetch('http://localhost:4000/delete', {
                method: 'post',
                body: JSON.stringify({ email: localStorage.getItem('email') }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setDeleteCheck(false);
            if (result.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = () => {
        users.forEach((user) => {
            let profileDetails = {
                name: user.name,
                email: user.email,
                number: user.number,
                profilePic: user.profilePic,
                coverPic: user.coverPic,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                hobby: user.hobby,
            };
            navigate('/edit', { state: profileDetails });
        });
    };

    const handleQRCode = () => {
        setQRCode(true);
    };

    const handleClose = () => {
        setQRCode(false);
    };

    return (
        <div className="flex items-center justify-center w-screen md:w-[750px] bg-white rounded-[15px] p-3">
            <div>
                <div className="w-screen md:w-[750px] p-[20px] flex items-center justify-between ">
                    <p className="text-[#000] md:text-[2.3em] flex justify-center font-bold cursor-pointer">Profile Details</p>
                    <button onClick={handleLogout} className="border border-1 bg-[#ff0000] text-white px-3 py-2 md:text-[18px] rounded-lg">
                        Log out
                    </button>
                </div>
                {users.length == 0 && (
                    <div className='flex items-center justify-center'>
                        <div class="Loader ">
                            <span class="dot"></span>
                            <div class="dots">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                {users.map((user) => (
                    <div className='flex items-center justify-center'>
                        <div key={user.id}>
                            <div className='flex items-center justify-center'>
                                <img
                                    src={user.coverPic}
                                    alt="Cover Pic"
                                    className="md:w-[700px] md:h-[200px] w-[350px] h-[100px] rounded-[10px]"
                                />
                            </div>
                            <div className='flex pl-[20px] gap-[20px] md:pl-0'>
                                <div>
                                    <img
                                        src={user.profilePic}
                                        alt="Profile Pic"
                                        className="rounded-full m-4 border border-2 border-black w-[70px] h-[70px] md:w-[100px] md:h-[100px]"
                                    />
                                </div>
                                <div className='mt-[30px]'>
                                    <p className='text-3xl font-bold'>{user.name}</p>
                                    <p className='text-xl'>{user.email}</p>

                                </div>
                            </div>
                            <div className='flex items-center md:gap-[50px]'>
                                <table class="">
                                    <tr>
                                        <td class="p-3">Phone number:</td>
                                        <td class="p-3">{user.number}</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3">Date of Birth:</td>
                                        <td class="p-3">{user.dateOfBirth}</td>
                                    </tr>
                                </table>
                                <table class="">
                                    <tr>
                                        <td class="p-3">Gender:</td>
                                        <td class="p-3">{user.gender}</td>
                                    </tr>
                                    <tr>
                                        <td class="p-3">Hobby:</td>
                                        <td class="p-3">{user.hobby}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className='flex items-center'>
                            <div className='mx-auto'>
                                <button
                                    className="mr-4 p-4 rounded-xl bg-[#008000] text-white text-[10px]"
                                    onClick={handleEdit}
                                >
                                    Edit profile
                                </button>
                                <button
                                    className="m-4 p-4 rounded-xl bg-[#ff0000] text-white text-[10px]"
                                    onClick={handleDelete}
                                >
                                    Delete profile
                                </button>
                                <button
                                    className="m-4 p-4 rounded-xl bg-[#000000] text-white text-[10px]"
                                    onClick={handleQRCode}
                                >
                                    Generate QR Code
                                </button>
                            </div>
                            </div>

                            {qrcode && (
                                <div className="fixed inset-0 flex items-center justify-center z-10">
                                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                                    <div className="relative bg-white rounded-lg p-8 border border-gray-300">
                                        <div className='font-bold text-right'>
                                            <button
                                                className=" top-2 right-2 pb-4 rounded-full focus:outline-none"
                                                onClick={handleClose}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <QRCode
                                            size={200}
                                            bgColor="white"
                                            fgColor="black"
                                            value={window.location.href}
                                            className="mb-4"
                                        />
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                ))}
                {/* {deleteCheck && (
                    <div>
                        <p>Are you sure want to delete your profile?</p>
                        <div>
                            <button
                                className="border border-1 border-black mr-4 p-4 rounded-xl bg-black text-white"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="border border-1 border-black m-4 p-4 rounded-xl bg-[#ff0000] text-white"
                                onClick={handleSureDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )} */}

                {deleteCheck && (
                    <div className="fixed inset-0 flex items-center justify-center z-10">
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                        <div className="relative bg-white rounded-lg p-8 border border-gray-300">
                            <p className="text-gray-800 text-lg mb-4">Are you sure you want to delete your profile?</p>
                            <div className="flex justify-end">
                                <button
                                    className="border border-gray-300 px-4 py-2 rounded text-gray-700 mr-4 hover:bg-gray-200"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="border border-red-500 bg-[#ff0000] text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={handleSureDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Profile;
