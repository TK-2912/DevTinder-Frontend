import React, { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'
import axios from 'axios'

const Header = () => {
  // to show profile photo - we need to subscribe to the store
  const user = useSelector((store)=>store.user) 
  // console.log(user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+"/logout" , {} , {withCredentials:true})
      // clear redux store - removeUser slice
      dispatch(removeUser())

      return navigate("/login")
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Tinder</Link>
  </div>

  <div className="flex-none px-5">
    { user && <div className="dropdown dropdown-end">
      <div className='flex items-center gap-5'>
        <p>Welcome, {user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="user-photo"
              src={user.photoUrl} />
          </div>
      </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
  )
}

export default Header