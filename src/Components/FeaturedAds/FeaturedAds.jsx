import React from 'react'
import ProductCard from '../Cards/ProductCard'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';

const FeaturedAds = () => {
  return (
    <section className='sm:px-12 px-4 mb-8'>
    <h2 className='sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4'>Featured Ads</h2>
    <div className=''>
    <Splide 
    options={{perPage:4, 
            gap:'1.5rem',
            breakpoints: {
                991: {
                    perPage: 3,
                },
                640: {
                    perPage: 2,
                },
                576:{
                    gap: '0.5rem'
                }

            },
            pagination: false
        }} 
    aria-label="Featured Ads">
        <SplideSlide>
            <ProductCard/>
        </SplideSlide>
        <SplideSlide>
            <ProductCard/>
        </SplideSlide>
        <SplideSlide>
            <ProductCard/>
        </SplideSlide>
        <SplideSlide>
            <ProductCard/>
        </SplideSlide>
        <SplideSlide>
            <ProductCard/>
        </SplideSlide>
        <SplideSlide>
            <ProductCard/>
        </SplideSlide>
        
    </Splide>
        
    </div>
</section>
  )
}

export default FeaturedAds