import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from 'react-router-dom';
import { baseURL } from '../../api/axiosInstance';
import dayjs from 'dayjs';


const ProductCard = ({data,link}) => {
   
  return (
    <Link to={`${link}/${data?.id}`} >
        <div className='border-[1px] border-slate-400 rounded-md overflow-hidden bg-white'>
            <div className='h-[150px] sm:h-[200px]  '>
                <img  src={`${data?.images[0]}`} alt='image' className='sm:h-[200px] h-full w-full object-cover'/>
            </div>
            <div className='w-[100%] p-2 flex flex-col gap-2'>
                <div>
                    <h2 className='font-bold xl:text-lg capitalize'> {'expertise' in data ? data?.name:'₹'+ data?.price}</h2>
                    <p className='text-xs xl:text-sm capitalize'>{data?.title?.slice(0,40)}...</p>
                </div>
                <div>
                    <div className='flex items-center gap-[3px]'>
                        <div>
                            <FaLocationDot/>
                        </div>
                        <p className='font-semibold text-xs xl:text-sm capitalize'>{`${data?.city} ${data?.state}`}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-[3px] text-[#179CF0]'>
                        <MdVerified/>
                        <p className='text-sm font-bold'>Verified</p>
                    </div>
                    <p className='text-xs font-bold'>{dayjs(data?.created_at).format("DD/MM/YYYY")}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard