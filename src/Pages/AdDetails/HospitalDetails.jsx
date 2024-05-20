import React,{useState,useEffect} from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from '../../Components/Button/Button';
import { MdVerified } from "react-icons/md";
import { Link, useLocation, useParams } from 'react-router-dom';
import { MdLocationPin } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import axiosInstance from '../../api/axiosInstance'
import { baseURL } from '../../api/axiosInstance';
import dayjs from 'dayjs';
import Contactseller from '../../Components/ContactSeller/Contactseller';


const HospitalDetails = () => {
    const {id} = useParams();
    const [educationData, setEducationData] = useState({});
    const location = useLocation();

    useEffect(()=> {
        axiosInstance.get(`api/hospitals/id/${id}`)
        .then(response => {
            console.log(response)
            const data = response.data.data;
            console.log(data)
            const updatedData = {
                ...data,
                images: data.images.map(image => ({
                    original: image,
                    thumbnail: image,
                }))
            };
            setEducationData(updatedData);
        
        })
        .catch(error => {
          console.error(error);
        });
      },[id])

     console.log(educationData)

     const postedDate = dayjs(educationData?.created_at);
     const today = dayjs();
     let displayDate;
     if(postedDate.isSame(today,"day")){
        displayDate ="Today";
     } else{
        displayDate = postedDate.format("DD MMM YY")
     }


  return (
    <>
    {Object.keys(educationData).length>0 && 
    <div className='max-w-[1500px] m-auto'>
      
        <div className='md:px-12 sm:px-4 px-2 py-8'>
            <div className='flex gap-2 sm:mb-6 mb-4'>
                <Link to="/" className='font-semibold'>Home</Link>
                <p> {'>'}</p>
                <a href="" className='font-semibold'>Hospital</a>
            </div>
            <section className='flex xl:flex-row flex-col gap-4 '>
                    <div className='xl:w-3/5'>
                        <ImageGallery items={educationData?.images} lazyLoad={true}/>
                    </div>
                    <div className='xl:w-2/5 border-[1px] border-slate-400 sm:px-6 py-6 px-2 h-[100%] rounded-md '>
                            <div className='pb-4 border-b-[1px] border-slate-300 '>
                                    <div className='flex justify-between '>
                                        <h3 className='font-bold sm:text-3xl text-2xl mb-2'>{educationData?.name}</h3>
                                        {/* <button className='mt-[-20px] bg-red'>
                                            <FaRegHeart size={25}                                    />
                                        </button> */}
                                    </div>
                                    <p className='text-sm sm:text-base text-slate-700'>{educationData?.title}</p>
                                    <div className='mt-4 mb-4 flex  flex-col justify-between'>
                                        <span className='text-sm sm:text-base flex items-center text-slate-700'><MdLocationPin size={25}/>{`${educationData?.street}, ${educationData?.street}, ${educationData?.city}, ${educationData?.state}, ${educationData?.pincode}  `}</span>
                                    </div>
                                    <div className='flex justify-between items-cnter'>
                                        <a href="" className='text-[#179CF0]'>Get Directions</a>
                                        <p className='font-bold text-sm'><span className='font-semibold text-slate-600'>Posted: </span>{displayDate}</p>
                                    </div>
                            </div>
                            <Contactseller data={educationData} route={location?.pathname}/>
                    </div>
            </section>
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll'>
                <h2 className='font-bold mb-4'>Details</h2>
                <div className='flex flex-col gap-2 min-w-[600px]'>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-slate-500 text-sm'>Name</p>
                        <p className='w-1/4 text-sm text-slate-700'>{educationData?.name}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Type</p>
                        <p className='w-1/4 text-sm text-slate-700'>{educationData?.type}</p>
                    </div>
                    <div className='flex justify-between'>
                        {educationData?.price_registration &&
                        <>
                        <p className='w-1/4 text-sm text-slate-500'>Price per registration</p>
                        <p className='w-1/4 text-sm text-slate-700'>₹ {educationData?.price_registration} </p>
                        </>
}
                        {educationData?.price_per_visit &&
                        <>
                        <p className='w-1/4 text-sm text-slate-500'>Price per visit</p>
                        <p className='w-1/4 text-sm text-slate-700'>₹ {educationData?.price_per_visit} </p>
                        </>
}
                    </div>
                  
                </div>
            </section>
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md'>
            <h2 className='font-bold mb-4'>Overview</h2>
            <p className='text-sm'>{educationData?.description}</p>
         
           
            </section>
        </div>
        
    </div>
    }
    </>

  )
}

export default HospitalDetails