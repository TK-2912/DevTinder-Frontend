import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {_id , firstName, lastName, photoUrl ,age , gender , about} = user;
    console.log(user)

    const dispatch = useDispatch()

    const handleSendRequest = async(status , _id)=>{
      try{
        
        const res = await axios.post(BASE_URL+"/request/send/" + status +"/" + _id , {} , {withCredentials:true})

        dispatch(removeUserFromFeed(_id))
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    
    <>  
      <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                src={photoUrl || "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" }
                alt="photo"
                className='p-4'
                 />
            </figure>
            <div className="card-body gap-3">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " , " + gender }</p>}
                <p>{about}</p>
                <div className="card-actions justify-center">
                <button className="btn btn-error  " onClick={()=>handleSendRequest("ignored" ,_id)}>Reject</button>
                <button className="btn btn-success  " onClick={()=>handleSendRequest("interested" ,_id)}>Interested</button>
                </div>
            </div>
     </div>
    </>
  )
}

export default UserCard