import React from 'react'
import SearchCard from '../Cards/SearchCard'

const PopularSearches = () => {
  return (
    <section className='sm:px-12 px-4 mb-8'>
        <h2 className='sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4'>Popular Searches</h2>
        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2  md:gap-4'>
            <SearchCard/>
            <SearchCard/>
            <SearchCard/>
            <SearchCard/>
            <SearchCard/>
            
        </div>
    </section>
  )
}

export default PopularSearches