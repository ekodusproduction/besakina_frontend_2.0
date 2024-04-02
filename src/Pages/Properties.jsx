import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Categories from '../Components/Categories/Categories'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import Button from '../Components/Button/Button'
import LatestAds from '../Components/LatestAds/LatestAds'
import ProductCard from '../Components/Cards/ProductCard'

const Properties = () => {
  return (
    <>
       
        <Categories/>
        <div className='md:px-12 sm:px-4 px-2 py-2'>
            <div className='flex gap-2 sm:mb-6'>
                <Link to="/" className='font-semibold'>Home</Link>
                <p> {'>'} </p>
                <a href="" className='font-semibold'>Properties</a>
            </div>
            <div>
                <Splide aria-label="Banner" >
                    <SplideSlide>
                        <img src="/assets/Banner/properties_banner.png" className='w-[100%]'    alt="Image 1"/>
                    </SplideSlide>
                    <SplideSlide>
                        <img src="/assets/Banner/properties_banner.png" className='w-[100%]'    alt="Image 1"/>
                    </SplideSlide>
                </Splide>
            </div>
            <div className='py-8 flex gap-8'>
              <div className='flex flex-col gap-2'> 
                  <div className='w-[20vw] border-black border-[1px] rounded-md p-4'>
                    <h3 className='font-bold text-lg mb-4'>Properties</h3>
                    <ul className='text-sm text-slate-600 flex flex-col gap-2'>
                      <li>All Properties</li>
                      <li>For Sale: Houses & Apartments</li>
                      <li>For Rent: Houses & Apartments</li>
                      <li>Lands & Plots</li>
                      <li>For Sale: Shops & Offices</li>
                      <li>For Rent: Shops & Offices</li>
                      <li>PG & Guest House</li>
                    </ul>
                  </div>
                  <div className='w-[20vw] border-black border-[1px] rounded-md p-4'>
                    <h3 className='font-bold text-lg mb-4'>Locations</h3>
                    <ul className='text-sm text-slate-600 flex flex-col gap-2'>
                      <li>All</li>
                      <li>Guwahati</li>
                      <li>Dibrugarh</li>
                      <li>Jorhat</li>
                      <li>Bongaigaon</li>
                      <li>Nagaon</li>
                      <li>Lakhimpur</li>
                    </ul>
                  </div>
                  <div className='w-[20vw] border-black border-[1px] rounded-md p-4'>
                    <h3 className='font-bold text-lg mb-4'>Filter</h3>
                    <p>Choose Budget range</p>
                  </div>
              </div>
              <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 '>
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
              
            </div>
        </div>  
        
    </>
  )
}

export default Properties