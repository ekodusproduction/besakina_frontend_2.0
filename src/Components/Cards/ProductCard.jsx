import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from 'react-router-dom';

const ProductCard = () => {
  return (
    <Link to={'/featuredads'}>
        <div className='border-[1px] border-slate-400 rounded-md overflow-hidden bg-white h-max'>
            <div>
                <img src="/assets/dummy_photo.jpg" className='h-[140px] sm:h-[auto] w-[100%] object-cover'  alt="" />
            </div>
            <div className='w-[100%] p-2 flex flex-col gap-2'>
                <div>
                    <h2 className='font-bold xl:text-lg'>₹ 36,90,000</h2>
                    <p className='text-xs xl:text-sm'>1 Bds - 1 Ba - 1010 ft2 luxurious apartment for sale</p>
                </div>
                <div>
                    <div className='flex items-center gap-[3px]'>
                        <div>
                            <FaLocationDot/>
                        </div>
                        <p className='font-semibold text-xs xl:text-sm'>{"Bharalumukh, AT Road, Guwahati - 781009, Assam".slice(0,30)}...</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-[3px] text-[#179CF0]'>
                        <MdVerified/>
                        <p className='text-sm font-bold'>Verified</p>
                    </div>
                    <p className='text-xs font-bold'>1/1/2024</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard