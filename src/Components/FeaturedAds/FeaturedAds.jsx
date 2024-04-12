import React,{useState,useEffect} from 'react'
import ProductCard from '../Cards/ProductCard'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import axiosInstance from '../../api/axiosInstance'
import { baseURL } from '../../api/axiosInstance';

const FeaturedAds = () => {
    const [featuredData, setFeaturedData] = useState([])
   

    useEffect(()=> {
        axiosInstance.get(`api/home/latest`)
        .then(response => {
            console.log(response)
            const data = response.data.data.advertisements;
            console.log(data)
            setFeaturedData(data);
        
        })
        .catch(error => {
          console.error(error);
        });
      },[])
  return (
    <section className='lg:px-12 px-4 mb-8'>
    <h2 className='sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4'>Featured Ads</h2>
    <div className=''>
    <Splide 
    options={{perPage:4, 
            gap:'1.5rem',
            breakpoints: {
                1100: {
                    perPage: 3,
                },
                800: {
                    perPage: 2,
                },
                576:{
                    gap: '0.5rem'
                },
                

            },
            pagination: false
        }} 
    aria-label="Featured Ads">
       {featuredData.map(item => (
            <SplideSlide>
                {item.category == 'property' && 
                    <ProductCard data={item} key={item.id} link={'/propertiesdetails'}/>
                }
                {item.category == 'vehicles' && 
                    <ProductCard data={item} key={item.id} link={'/vehicledetails'}/>
                }
                {item.category == 'education' && 
                    <ProductCard data={item} key={item.id} link={'/educationdetails'}/>
                }
                {item.category == '"hospitality"' && 
                    <ProductCard data={item} key={item.id} link={'/hospitalitydetails'}/>
                }
               
            </SplideSlide>
        ))}
       
            
        
    </Splide>
        
    </div>
</section>
  )
}

export default FeaturedAds