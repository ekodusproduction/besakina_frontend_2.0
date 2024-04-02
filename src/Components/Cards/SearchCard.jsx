import React from 'react'
import Button from '../Button/Button'

const SearchCard = () => {
  return (
    <div className='rounded-lg overflow-hidden '>
        <div>
            <img src="/assets/dummy_photo.jpg" alt="" className='md:h-[200px] sm:w-[auto] w-[100%] object-cover' />
        </div>
        <div className='bg-[#0F77D6] pb-4 pt-2 px-2'>
            <h3 className='mb-4 text-white font-bold text-base sm:text-lg'>Package & Movers</h3>
            <Button category={'thirdbtn'} >Explore</Button>
        </div>
    </div>
  )
}

export default SearchCard