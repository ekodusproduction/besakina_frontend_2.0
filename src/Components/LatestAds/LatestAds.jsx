import React from 'react'
import ProductCard from '../Cards/ProductCard'
import Button from '../Button/Button'

const LatestAds = () => {
  return (
    <section className='sm:px-12 px-4 mb-8'>
        <h2 className='sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4'>Latest Ads</h2>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4 '>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            
        </div>
        <div className='flex justify-center mt-6'>
            <Button category={'primarybtn'}>Load More</Button>
        </div>
    </section>
  )
}

export default LatestAds