import React,{useState,useEffect} from 'react'
import axiosInstance from '../../api/axiosInstance'
import AdCard from '../Cards/AdCard';



const MyListing = () => {
  const [userAds, setUserAds] = useState([]);
  const token = localStorage.getItem('token')
  useEffect(()=> {
    axiosInstance.get('api/users/myads', {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
  .then(response => {
      console.log(response);
      setUserAds(response.data.data)
  });
  },[])
  return (
    <div className='w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 '>
                {userAds?.map(item => (
                  <AdCard data={item} key={item.id} link={'/propertiesdetails'}/>
                ))}
            
              </div>
  )
}

export default MyListing