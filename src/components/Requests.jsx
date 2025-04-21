import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { removeRequest } from '../utils/requestSlice'

const Requests = () => {

    const dispatch = useDispatch()

    const requests = useSelector((store)=>store.requests)

    const reviewRequest=async(status,_id)=>{
        try{
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/" + _id,{}, {withCredentials:true}) // the second paramater is empty as there is no data we are passing...even if you dont want to send any data you should use a empty parameter...as post call takes a pass data parameter

            dispatch(removeRequest(_id))
        }catch(err){
            console.log(err)
        }
    }


    const fetchRequest = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received" , {withCredentials:true})
            console.log(res?.data?.data)

            dispatch(addRequest(res?.data?.data))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        fetchRequest()
    },[])

    if(!requests || requests.length === 0){
        return <h1 className='text-center my-10 text-bold text-2xl'>No Requests Found</h1>
    }
  return (
    <div className=' text-center my-10'>
        <h1 className='text-bold text-white text-3xl mb-5'> Requests </h1>
        {requests.map((request)=>{
            const {_id ,firstName , lastName , photoUrl , age , gender , about} = request.fromUserId
            return (
            <div key={_id} className=' p-4 bg-base-300 rounded-lg flex gap-4 w-5/6 mx-auto justify-between items-center'>

                <div>
                    <img src={photoUrl || "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} alt="photo" className='w-20 h-20 rounded-full' />
                </div>

                <div className='text-left'>
                    <h1 className='text-bold text-3xl text-white'>{firstName + " " + lastName} </h1>
                    {age && gender && (<p>{age + " " + gender}</p>)}
                    <p>{about}</p>
                    
                </div>

                {<div className="card-actions">
                    <button className="btn btn-success " onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
                    <button className="btn btn-error " onClick={()=>reviewRequest("rejected" , request._id)}>Reject</button>
                </div>}

            </div>
    )})}
    </div>
  )
}

export default Requests