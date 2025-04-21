import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

    const connections = useSelector((store)=>store.connection)
    console.log(connections)

    const dispatch = useDispatch();

    const fetchConnection = async()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections" , {withCredentials: true})
            console.log(res?.data?.data)

            dispatch(addConnections(res.data.data));
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchConnection()
    },[])

    if(!connections) return;

    if (connections.length === 0){
        return <h1 className='text-center my-10 text-bold text-2xl'>No Connections Found</h1>
    }
  return (
    <div className=' text-center my-10'>
        <h1 className='text-bold text-white text-3xl mb-5'> Connections </h1>
        {connections.map((connection)=>{
            const {_id ,firstName , lastName , photoUrl , age , gender , about} = connection
            return (
            <div key={_id} className='p-4 bg-base-300 rounded-lg flex gap-4 mx-auto w-1/3 items-center'>

                <div>
                    <img src={photoUrl} alt="photo" className='w-20 h-20 rounded-full' />
                </div>

                <div className='text-left'>
                    <h1 className='text-bold text-4xl text-white'>{firstName + " " + lastName} </h1>
                    {age && gender && (<p>{age + " " + gender}</p>)}
                    <p>{about}</p>
                    
                </div>

            </div>
    )})}
    </div>
  )
}

export default Connections