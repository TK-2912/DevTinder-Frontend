import React, { useState } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

const EditProfile = ({user}) => {
    const [firstName , setFirstName] = useState(user.firstName)
    const [lastName , setLastName] = useState(user.lastName)
    const [age , setAge] = useState(user.age || "")
    const [gender , setGender] = useState(user.gender || "")
    const [about , setAbout] = useState(user.about)
    const [photoUrl , setPhotoUrl] = useState(user.photoUrl)

    const [error,setError] = useState("");
    console.log(user)
    const dispatch = useDispatch()
    const [showToast , setShowToast] = useState(false) 

    const saveProfile = async ()=>{
        // 
        setError("") // clear the error message when we click on save changes button
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit" , {firstName, lastName, photoUrl, age, gender, about } ,{withCredentials: true}) //we are passing the data - firstName , lastName , age ,gender etc which we are chaing and that we need to pass this data...and withCredentials:true is used to send the cookies with the request and without it we womnt be able to successfully make an api call to save profile
            dispatch(addUser(res?.data?.data))
            setShowToast(true)


            const i = setTimeout(()=>{
                setShowToast(false)
            },3000)
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong")
        }
    }

    


  return (
    <div>
        <div className='flex justify-center gap-6 my-10 mb-20 '>
            <div className='flex justify-center mx-10 '>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                        <div className=''>

                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                                    <input type="text" className="grow" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                                    <input type="text" className="grow" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                                    <input type="number" className="grow" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Age" />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                                    <input type="text" className="grow" value={gender} onChange={(e)=>setGender(e.target.value)} placeholder="Gender" />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                                    <input type="text" className="grow" value={about} onChange={(e)=>setAbout(e.target.value)} placeholder="About" />
                            </label>

                            <label className="input input-bordered flex items-center gap-2 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /> </svg>
                                    <input type="text" className="grow" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} placeholder="Photo Url" />
                            </label>

                        </div>

                    <p className='text-red-500'>{error}</p>

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary" onClick={saveProfile} >Edit Changes</button>
                    </div>

                </div>
            </div>
            </div>

            <div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            
        </div>

       
        {showToast && (<div className="toast toast-top toast-end">
            <div className="alert alert-success">
            <span>User Saved Successfully.</span>
            </div>
        </div>)}
        
    </div>

    
  )
}

export default EditProfile