import React,{useState} from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from 'react-router-dom';
import { baseURL } from '../../api/axiosInstance';
import Switch from '@mui/material/Switch';
import axiosInstance from '../../api/axiosInstance'



const AdCard = ({data,link}) => {
   const token = localStorage.getItem('token')
   const [isActive, setisActive] = useState(data?.is_active)
   
    const disableHandler = (id,category) => {

        if(isActive){
            if(confirm("Are you sure you want to disable the ad?")==true){
                axiosInstance.delete(`api/${category}/deactivate/id/${id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then(response => {
                    console.log(response)
                    setisActive(!isActive)
                  })
                  .catch(err => {
                    setisActive(!isActive)
                    console.log(err)
                });
            }
            
        }
        else{
            if(confirm("Are you sure you want to enable the ad?")==true){
                axiosInstance.put(`api/${category}/activate/id/${id}`, {}, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then(response => {
                    setisActive(!isActive)
                    console.log(response)
                })
                  .catch(err => {
                    setisActive(!isActive)
                    console.log(err)
                }); 
            }
            
        }
        
    }
  return (
  
        <div className='border-[1px] border-slate-400 rounded-md overflow-hidden bg-white'>
            <div className='h-[150px] sm:h-[200px]'>
                <img  src={`${baseURL}${data?.images[0]}`} alt='image' className='sm:h-[200px] h-full w-full object-cover'/>
            </div>
            <div className='w-[100%] p-2 flex flex-col gap-2'>
                <div>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold xl:text-lg'> {'expertise' in data ? data?.name:'₹'+ data?.price}</h2>
                        <Switch checked={isActive} size="small" onChange={()=>disableHandler(data?.id,data?.category)} />
                    </div>
                    <p className='text-xs xl:text-sm'>{data?.title.slice(0,40)}...</p>
                </div>
                <div>
                    <div className='flex items-center gap-[3px]'>
                        <div>
                            <FaLocationDot/>
                        </div>
                        <p className='font-semibold text-xs xl:text-sm'>{`${data?.city} ${data?.state}`}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-[3px]'>
                        <Link to={'/'} className='text-sm font-bold'>View Details</Link>
                    </div>
                    <p className='text-xs font-bold'>1/1/2024</p>
                </div>
            </div>
        </div>
     

  )
}

export default AdCard