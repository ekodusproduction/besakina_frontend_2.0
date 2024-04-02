import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Categories from '../Components/Categories/Categories'
import Footer from '../Components/Footer/Footer'
import { Link } from 'react-router-dom'


const PostAd = () => {
    
  return (
    <>
     
        <section>
            <div className=''>
                <p className='text-center py-4 font-semibold text-xl border-b-[1px] border-gray-300'>POST YOUR AD</p>
            </div>
            <div className='grid grid-cols-4 py-16 px-56 gap-6'>
                <Link to={'/propertiesadform'} className='flex flex-col gap-2 justify-center items-center border-[1px] border-gray-400 p-4 rounded-lg bg-white'>
                    <img src="/assets/icons/properties.png" className='w-[60px]' alt="" />
                    <p className='font-semibold'>Properties</p>
                </Link>

                <Link to={'/vehicleadform'} className='flex flex-col gap-2 justify-center items-center border-[1px] border-gray-400 p-4 rounded-lg bg-white'>
                    <img src="/assets/icons/vehical-07.svg" className='w-[60px]' alt="" />
                    <p className='font-semibold'>Vehicles</p>
                </Link>
        
                <Link to={'/hospitalityadform'} className='flex flex-col gap-2 justify-center items-center border-[1px] border-gray-400 p-4 rounded-lg bg-white'>
                    <img src="/assets/icons/travel-07.svg" className='w-[60px]' alt="" />
                    <p className='font-semibold'>Hospitalitiy</p>
                </Link>
                
                <Link to={'/healthadform'} className='flex flex-col gap-2 justify-center items-center border-[1px] border-gray-400 p-4 rounded-lg bg-white'>
                    <img src="/assets/icons/health-07.svg" className='w-[60px]' alt="" />
                    <p className='font-semibold'>Health</p>
                </Link>
            
                <Link to={'/educationadform'} className='flex flex-col gap-2 justify-center items-center border-[1px] border-gray-400 p-4 rounded-lg bg-white'>
                    <img src="/assets/icons/learinng-07.svg" className='w-[60px]' alt="" />
                    <p className='font-semibold'>Education</p>
                </Link>
    
            </div>
        </section>
      
    
    </>
  )
}

export default PostAd