import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard';

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // console.log(feed)

    const getFeed =async()=>{

        if(feed) return; // if feed is already present then dont need to make api call again and again
        // else - when the feed is null(not present) - make api call (use the below code)
        try{
            
          const res = await axios.get(BASE_URL+"/feed" ,{withCredentials:true} );
          dispatch(addFeed(res.data))

        }
        catch(err){
            console.log(err)
        }
    };

    useEffect(()=>{
      getFeed();
    },[])
    
    if(! feed) return;

    if(feed.length <= 0){
        return <h1 className=' flex justify-center my-20 text-bold text-2xl'>No Users Found</h1>
    }

  return (feed &&  (
    <div className='flex justify-center my-20'>
      <UserCard user={feed[0]} />
    </div>
  ))

}

export default Feed