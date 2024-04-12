import React,{useState,useEffect} from 'react'
import ProductCard from '../Cards/ProductCard'
import Button from '../Button/Button'
import axiosInstance from '../../api/axiosInstance'
import { baseURL } from '../../api/axiosInstance';

const LatestAds = () => {
  const [latestData, setLatestData] = useState([])

    useEffect(()=> {
        axiosInstance.get(`api/home/latest`)
        .then(response => {
            console.log(response)
            const data = response.data.data.advertisements;
            console.log(data)
            setLatestData(data);
        
        })
        .catch(error => {
          console.error(error);
        });
      },[]);

  return (
    <section className='lg:px-12 px-4 mb-8'>
        <h2 className='sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4'>Latest Ads</h2>
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4 '>
        {latestData.map(item => (
            <>
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
               
            </>
              ))}
            {/* // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/>
            // <ProductCard/> */}
            
        </div>
        <div className='flex justify-center mt-6'>
            <Button category={'primarybtn'}>Load More</Button>
        </div>
    </section>
  )
}

export default LatestAds