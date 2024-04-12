import React,{useState,useEffect} from 'react'
import Button from '../Components/Button/Button'
import { FaAngleRight } from "react-icons/fa6";



const Plans = () => {
  
  return (
    <>
        <div className='text-center pt-16'>
            <p className='text-[#1A5C96]'>Our Pricing</p>
            <h2 className='text-2xl font-bold'>Choose your package</h2>
        </div>
        <div className='p-4 grid grid-cols-3 gap-12 px-24 py-12'>
            <div className='bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4'>
                <div>
                    <p className='text-4xl font-bold'>$ 999</p>
                    <p className='bg-[#C0C0C0] w-fit text-white rounded px-2 py-[2px] mt-2'>Silver</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>Maximum 5 images</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>Search ranking - Low</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>Silver membership badge</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>Contact buyers - 50 / week</p>
                    </div>
                </div>
                <div>
                    <Button classItems={'w-full'} category={'primarybtn'}>Purchase</Button>
                </div>
            </div>

            <div className='bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4'>
                <div>
                    <p className='text-4xl font-bold'>$ 999</p>
                    <p className='bg-[#FFD700] w-fit text-white rounded px-2 py-[2px] mt-2'>Gold</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>3 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                </div>
                <div>
                    <Button classItems={'w-full'} category={'primarybtn'}>Purchase</Button>
                </div>
            </div>

            <div className='bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4'>
                <div>
                    <p className='text-4xl font-bold'>$ 999</p>
                    <p className='bg-[#F41B3B] w-fit text-white rounded px-2 py-[2px] mt-2'>Platinum</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div><FaAngleRight color='#F41B3B'/></div>
                        <p className='text-sm text-gray-700'>1 post</p>
                    </div>
                </div>
                <div>
                    <Button classItems={'w-full'} category={'primarybtn'}>Purchase</Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Plans