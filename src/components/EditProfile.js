import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import '../css/SaveProfile.css'

function EditCard() {
    const location = useLocation()
    const [slide, setSlide] = useState(1);
    const data = location.state
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    const [nameValue, setNameValue] = useState(data.name);
    const [emailValue, setEmailValue] = useState(data.email)
    const [numberValue, setNumberValue] = useState(data.number)
    const [profilePic, setProfilePic] = useState(data.profilePic)
    const [coverPic, setCoverPic] = useState(data.coverPic)
    const [gender, setGender] = useState(data.gender)
    let dateOfBirth = data.dateOfBirth
    const [hobby, setHobby] = useState(data.hobby);


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
        "Yoga",
    ]

    const handleNext = () => {
        setSlide(slide + 1);
    };

    const handlePrev = () => {
        setSlide(slide - 1);
    };

    const handleUpdate = async () => {
        let result = await fetch('https://social-app-backend-woad.vercel.app/update', {
            method: 'post',
            body: JSON.stringify({ nameValue, numberValue, emailValue, profilePic, coverPic, gender, dateOfBirth, hobby }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log(result)
        if (result.status === 200) {
            let name = email.substring(0, email.indexOf('@'))
            navigate(`/profile/${name}`)
        }
    }

    const convertToBase64PP = (e) => {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setProfilePic(reader.result)
        }
        reader.onerror = (error) => {
            console.log(error)
        }
    }

    const convertToBase64CP = (e) => {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            setCoverPic(reader.result)
        }
        reader.onerror = (error) => {
            console.log(error)
        }
    }

    return (
        <div className="flex items-center justify-center w-[350px] h-[500px] rounded-[10px] main">
            <div className="p-8 rounded-lg shadow-lg">
                {slide === 1 && (
                    <div className='w-[300px]'>
                        <p className="font-bold text-white text-center text-3xl mb-4">Update your basic Information</p>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="userName">Enter your name</label>
                            <input type="text" id="userName" required className="input-field" value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="phNo">Enter your phone number</label>
                            <input type="text" id="phNo" required className="input-field" value={numberValue} onChange={(e) => setNumberValue(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm mb-2" htmlFor="phNo">Select your date of birth</label>
                            <input type="fixed" id="phNo" required className="input-field" value={dateOfBirth} />
                        </div>
                        <div className="">
                            <label className="block text-gray-400 text-sm" htmlFor="phNo">Specify your gender</label>
                            {
                                gender == 'Male' ?
                                    <>
                                        <input type="radio" className='m-4 p-3' name="gender" value='Male' onChange={() => setGender('Male')} checked /><span className='text-white'>Male</span>
                                        <input type="radio" className='m-4 p-3' name="gender" value='Female' onChange={() => setGender('Female')} /><span className='text-white'>Female</span>
                                    </>
                                    :
                                    <>
                                        <input type="radio" className='m-4 p-3' name="gender" value='Male' onChange={() => setGender('Male')} /><span className='text-white'>Male</span>
                                        <input type="radio" className='m-4 p-3' name="gender" value='Female' onChange={() => setGender('Female')} checked /><span className='text-white'>Female</span>
                                    </>
                            }

                        </div>
                    </div>
                )}
                {slide === 2 && (
                    <>
                        <p className="font-bold text-white text-2xl mb-4">Update your Profile photo, cover photo and Hobby</p>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="profilePic">Select your profile photo</label>
                            <div className='flex border-1 border rounded-[5px] items-center p-2 justify-between'>
                                <input accept="image/*" type="file" id="profilePic" onChange={convertToBase64PP} className="w-[60%] pl-2 border-0 text-white" />
                                <div className='pr-3 m-0 '>
                                    {profilePic && <img width={100} height={100} src={profilePic} className="w-[50px] h-[50px] mt-2 border border-gray-300 rounded-full " alt="Profile Pic" />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="coverPic">Select your cover photo</label>
                            <div className='flex border-1 border rounded-[5px] items-center p-2 justify-between'>
                                <input accept="image/*" type="file" id="coverPic" onChange={convertToBase64CP} className="w-[60%] pl-2 border-0 text-white" />
                                <div className='m-0 '>
                                    {coverPic && <img width={100} height={100} src={coverPic} className="w-[100px] h-[50px] mt-2 border border-gray-300 rounded " alt="Profile Pic" />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2">Select your hobby</label>
                            <select value={hobby} onChange={(e) => setHobby(e.target.value)} className="input-field">
                                <option value="">Update hobby</option>
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
                    {slide === 2 && <button onClick={handleUpdate} className="btn-primary">Update</button>}
                </div>
            </div>
        </div>
    )
}

export default EditCard