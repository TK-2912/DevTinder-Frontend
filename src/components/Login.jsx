import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

    const [emailId , setEmailId] = useState("")

    const [firstName , setFirstName] = useState("")

    const [lastName , setLastName] = useState("")

    const [password , setPassword] = useState("")

    const [isLoginForm, setIsLoginForm] = useState(true);

    // we need to stre res.data in the redux store....dor storing we will be using - DISPATCH
    // we will be using useDispatch from react-redux
    // for storing data into the redux store - we need to DISPATCH AN ACTION
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [error,setError] = useState("");

    const handleSignup =async()=>{
        try{
            const res = await axios.post(BASE_URL + "/signUp" , {firstName , lastName , emailId , password} , {withCredentials:true})
           

            dispatch(addUser(res.data.data));

            return navigate("/profile")

        }catch(err){
            setError(err?.response?.data || "Something went wrong"); // this will give us the error message from the server
        }
    }

    const handleLogin = async()=>{
        // promise - this will make api call to login ...so we need to make it await
        // api call
        try{

            // const res = await axios.post("http://localhost:3000/login" , {emailId , password},{withCredentials:true}) // we need to pass emailId and password
            const res = await axios.post(BASE_URL + "/login" , {emailId , password},{ withCredentials: true }) // we need to pass emailId and password
            // console.log(res.data)  // res.data contains all the data which we need ...this res.data contains all the info about the user
            dispatch(addUser(res.data)); // for storing data into the redux store - we need to DISPATCH AN ACTION ...and we need to call - addUser - action (this is a slice)
            // and in addUser ...we need to store - res.data ..so we need to do pass data - addUser(res.data)

            // after loginin we need to navigate to the feed page - feed api
            return navigate("/");
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong"); // this will give us the error message from the server
        }

    }

  return (
    <div className='flex justify-center my-20'>
        <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    <div className=''>

                        { !isLoginForm && (
                            <>
                            <label className="input input-bordered flex items-center gap-2 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /> 
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="grow" placeholder="First Name" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /> 
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="grow" placeholder="Last Name" />
                        </label>

                        </>
                        )}

                        <label className="input input-bordered flex items-center gap-2 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /> 
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="grow" placeholder="Email" />
                        </label>

                        <label className="input input-bordered flex items-center gap-2 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                            </svg>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"  className="grow"  />
                        </label>

                        <p onClick={()=>setIsLoginForm((value) => !value)} className='mt-4 cursor-pointer' >{isLoginForm ?  "New User ? Sign Up now !!!" : "Existing user ? Login Now !!!"}</p>
                    </div>

                <p className='text-red-500'>{error}</p>

                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Sign Up" }</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login



/*

    const handleLogin = async () => {
    try {
        const res = await axios.post(BASE_URL + "/login", { emailId, password }, { withCredentials: true });

        // Check if the response indicates a successful login
        if (res.data && res.data.success) {
            dispatch(addUser(res.data));
            navigate("/");
        } else {
            setError(res.data.message || "Invalid credentials");
        }
    } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong");
    }
};


*/