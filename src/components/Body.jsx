import React, { useEffect } from 'react'
import Header from './Header.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector((store)=>store.user)

    const fetchUser = async () => {
        try{
            const res = await axios.get(BASE_URL+"/profile/view" ,{withCredentials:true})
            // update the store
            // for updating we need to dispatch an action
            dispatch(addUser(res.data))
        }
        catch(err){

            if(err.status === 401) {  // if user is not logged in then we need to navigate to login page
                navigate("/login") // if user is not logged in then we need to navigate to login page
            }
            else{
                console.log(err)
            }
            
        }
    }

    useEffect(()=>{

        if(!userData){
            // if no userData then only make a api call ..else dont need to make api call again and again
            // that is make api call only when there is no data in the store (that is when user is not logged in)
            
            // when component loads ..this useEffect will be called
            fetchUser()

        }
    },[])
  return (
    <div>
        <Header/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default Body
