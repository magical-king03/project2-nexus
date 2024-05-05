import React, { useState, useEffect } from 'react';
import '../css/App.css'
import { useNavigate } from 'react-router-dom';
const ProfileForm = () => {
    const [slide, setSlide] = useState(1);
    const [userName, setUserName] = useState('')
    const [phNo, setPhNo] = useState('')
    const [gender, setGender] = useState('')
    const email = localStorage.getItem('email')
    const [profilePic, setProfilePic] = useState('')
    const [coverPic, setCoverPic] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [hobby, setHobby] = useState("");
    const navigate = useNavigate()

    const convertToBase64ProfilePic = (e) => {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setProfilePic(reader.result)
        }
        reader.onerror = (error) => {
            console.log(error)
        }
    }

    const convertToBase64CoverPic = (e) => {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setCoverPic(reader.result)
        }
        reader.onerror = (error) => {
            console.log(error)
        }
    }

    const hobbies = [
        "Reading",
        "Drawing",
        "Painting",
        "Playing musical instruments",
        "Cooking",
        "Photography",
        "Gardening",
        "Writing",
        "Hiking",
        "Traveling",
        "Fishing",
        "Cycling",
        "Yoga",]

    const handleNext = () => {
        setSlide(slide + 1);
    };

    const handlePrev = () => {
        setSlide(slide - 1);
    };

    const handleSave = async (e) => {
        e.preventDefault()
        if (userName === "" || phNo === "" || gender === "" || dateOfBirth === "" || profilePic === "" || coverPic === "" || hobby === "") {
            alert("Fill all the details...")
        } else if (phNo.length !== 10) {
            alert("Enter the phone number correctly...")
        } else {
            let result = await fetch('https://social-app-backend-woad.vercel.app/save', {
                method: 'post',
                body: JSON.stringify({ userName, phNo, email, profilePic, coverPic, gender, dateOfBirth, hobby }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            console.log(email);
            if (result.status === 200) {
                let name = email.substring(0, email.indexOf('@'))
                navigate(`/profile/${name}`)
            }
        }
    };
    useEffect(() => {
        if (localStorage.getItem('email')) {
        } else {
            navigate('/signup')
        }
    });

    return (
        <div className="flex items-center justify-center w-[350px] h-[500px] rounded-[10px] main">
            <div className="p-8 rounded-lg shadow-lg">
                {slide === 1 && (
                    <div className='w-[300px]'>
                        <p className="font-bold text-white text-center text-3xl mb-4">Basic Information</p>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="userName">Enter your name</label>
                            <input type="text" id="userName" required className="input-field" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="phNo">Enter your phone number</label>
                            <input type="text" id="phNo" required className="input-field" value={phNo} onChange={(e) => setPhNo(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="phNo">Select your date of birth</label>
                            <input type="date" id="phNo" required className="input-field" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        </div>
                        <div className="">
                            <label className="block text-gray-400 text-sm" htmlFor="phNo">Specify your gender</label>
                            <input type="radio" className='m-4 p-3' name="gender" value='Male' onChange={() => setGender('Male')} /><span className='text-white'>Male</span>
                            <input type="radio" className='m-4 p-3' name="gender" value='Female' onChange={() => setGender('Female')} /><span className='text-white'>Female</span>
                        </div>
                    </div>
                )}
                {slide === 2 && (
                    <>
                        <p className="font-bold text-white text-2xl mb-4">Add your Profile photo, cover photo and Hobby</p>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="profilePic">Select your profile photo</label>
                            <div className='flex border-1 border rounded-[5px] items-center p-2 justify-between'>
                                <input accept="image/*" type="file" id="profilePic" onChange={convertToBase64ProfilePic} className="w-[60%] pl-2 border-0 text-white" />
                                <div className='pr-3 m-0 '>
                                    {profilePic && <img width={100} height={100} src={profilePic} className="w-[50px] h-[50px] mt-2 border border-gray-300 rounded-full " alt="Profile Pic" />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="coverPic">Select your cover photo</label>
                            <div className='flex border-1 border rounded-[5px] items-center p-2 justify-between'>
                                <input accept="image/*" type="file" id="coverPic" onChange={convertToBase64CoverPic} className="w-[60%] pl-2 border-0 text-white" />
                                <div className='m-0 '>
                                    {coverPic && <img width={100} height={100} src={coverPic} className="w-[100px] h-[50px] mt-2 border border-gray-300 rounded " alt="Profile Pic" />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2">Select your hobby</label>
                            <select value={hobby} onChange={(e) => setHobby(e.target.value)} className="input-field">
                                <option value="">Select an option</option>
                                {hobbies.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <div className="flex justify-between gap-3">
                    {slide !== 1 && <button onClick={handlePrev} className="btn-secondary">Previous</button>}
                    {slide !== 2 && <button onClick={handleNext} className="btn-primary">Next</button>}
                    {slide === 2 && <button onClick={handleSave} className="btn-primary">Save</button>}
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
