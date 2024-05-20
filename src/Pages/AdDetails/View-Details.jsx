import React,{useState,useEffect} from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Button from '../../Components/Button/Button';
import { MdVerified } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdLocationPin } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import axiosInstance from '../../api/axiosInstance'
import { baseURL } from '../../api/axiosInstance';
import dayjs from 'dayjs';
import { useLogin } from '../../hooks/useLogin';
import Contactseller from '../../Components/ContactSeller/Contactseller';




const ViewDetails = ({data,route,category}) => {
    const {id} = useParams();
    const token = localStorage.getItem("token");
    const { isLoggedIn, setIsLoggedIn } = useLogin();
    const [showContactDetails,setShowContactDetails] = useState(false);
    const [ contactDetails,setContactDetails]= useState([]);
    const navigate = useNavigate();
    // useEffect(()=> {
    //     axiosInstance.get(`api/property/id/${id}`)
    //     .then(response => {
    //         console.log(response)
    //         const data = response.data.data;
    //         const updatedData = {
    //             ...data,
    //             images: data.images.map(image => ({
                    
    //                 original: image,
    //                 thumbnail: image,
    //             }))
    //         };
    //         setPropertyData(updatedData);
        
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    //   },[id])

    function convertString(str) {
        // Replace underscores with spaces
        return str.replace(/_/g, ' ');
      }

     const postedDate = dayjs(data?.created_at);
     const today = dayjs();
     let displayDate;
     if(postedDate.isSame(today,"day")){
        displayDate ="Today";
     } else{
        displayDate = postedDate.format("DD MMM YY")
     }

    //  const handleContactSeller =(id)=>{
    //     if(isLoggedIn){
    //         axiosInstance.get(`api/users/id/${id}`,{
    //             headers:{
    //                 Authorization:`Bearer ${token}`
    //             },
    //         })
    //         .then(response=>{
    //             setContactDetails(response?.data?.data);
    //             setShowContactDetails(true);
    //         })
    //         .catch(error=>{
    //             console.error(error)
    //         })
    //     }else{
    //         navigate("/login");
    //     }
    //  }

  return (
    <>
    {Object.keys(data).length>0 && 
    <div className='max-w-[1500px] m-auto'>
      
        <div className='md:px-12 sm:px-4 px-2 py-8'>
            <div className='flex gap-2 sm:mb-6 mb-4'>
                <Link to="/" className='font-semibold'>Home</Link>
                <p> {'>'}</p>
                <a href="" className='font-semibold capitalize'>{category}</a>
            </div>
            <section className='flex xl:flex-row flex-col gap-4 '>
                    <div className='xl:w-3/5'>
                        <ImageGallery items={data?.images} lazyLoad={true}/>
                    </div>
                    <div className='xl:w-2/5 border-[1px] border-slate-400 sm:px-6 py-6 px-2 h-[100%] rounded-md '>
                            <div className='pb-4 border-b-[1px] border-slate-300 '>
                                    <div className='flex justify-between '>
                                        <h3 className='font-bold sm:text-3xl text-2xl mb-2'>₹ {data?.price}</h3>
                                        {/* <button className='mt-[-20px] bg-red'>
                                            <FaRegHeart size={25} />
                                        </button> */}
                                    </div>
                                    <p className='text-sm sm:text-base text-slate-700'>{data?.title}</p>
                                    <div className='mt-4 mb-4 flex  flex-col justify-between'>
                                        <span className='text-sm sm:text-base flex items-center text-slate-700'><MdLocationPin size={25}/>{`${data?.house_no ? `House No: ${data?.house_no},` : ""} ${data?.street}, ${data?.city} - ${data?.pincode}, ${data?.state}`}</span>
                                    </div>
                                    <div className='flex justify-between items-cnter'>
                                        <a href="" className='text-[#179CF0]'>Get Directions</a>
                                        <p className='font-bold text-sm'><span className='font-semibold text-slate-600'>Posted: </span>{displayDate}</p>
                                    </div>
                            </div>
                            <Contactseller data={data} route={route}/>
                    </div>
            </section>

            {/* property */}
            {category == "property" &&
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll capitalize'>
                <h2 className='font-bold mb-4'>Details</h2>
                <div className='flex flex-col gap-2 min-w-[600px]'>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-slate-500 text-sm'>Type:</p>
                        <p className='w-1/4 text-sm text-slate-700'>{convertString(data?.type)}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Bedrooms:</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.bedrooms}</p>
                    </div>
                    <div className='flex justify-between'>
                        {/* <p className='w-1/4 text-sm text-slate-500'>Bathrooms</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.bathrooms}</p> */}
                        <p className='w-1/4 text-sm text-slate-500'>Total Rooms</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.total_rooms}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Furnishing</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.furnishing}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-sm text-slate-500'>Construction Status</p>
                        <p className='w-1/4 text-sm text-slate-700'>{convertString(data?.construction_status)}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Listed by</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.listed_by}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-sm text-slate-500'>Super buildup area</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.super_builtup_area}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Carpet area</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.carpet_area}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-sm text-slate-500'>Total floors</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.total_floors}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Floor No.</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.floor_no}</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <p className='w-[23%] text-sm text-slate-500'>Car parking</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.car_parking}</p>
                    </div>
                </div>
            </section>
}

            {/* vehicle */}
            {category=="vehicle" &&
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll capitalize'>
                <h2 className='font-bold mb-4'>Details</h2>
                <div className='flex flex-col gap-2 min-w-[600px]'>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-slate-500 text-sm'>Type</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.type}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Brand</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.brand}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-sm text-slate-500'>Kilometer Driven</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.kilometer_driven}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Registration Year</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.registration_year}</p>
                    </div>
                  
                </div>
            </section>
}

            {/* education */}
            {category == "education" &&
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll capitalize'>
                <h2 className='font-bold mb-4'>Details</h2>
                <div className='flex flex-col gap-2 min-w-[600px]'>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-slate-500 text-sm'>Type</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.type}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Domain</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.domain}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-sm text-slate-500'>Institution Name</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.institution_name}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Course Duration</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.course_duration}</p>
                    </div>
                  
                </div>
            </section>
}
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll capitalize'>
                <h2 className='font-bold mb-4'>Details</h2>
                <div className='flex flex-col gap-2 min-w-[600px]'>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-slate-500 text-sm'>Type</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.type}</p>
                        <p className='w-1/4 text-sm text-slate-500'>City</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.city}</p>
                    </div>
                </div>
            </section>
            {/* doctor */}
            {category == "doctor" &&
            <section className="xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll capitalize">
              <h2 className="font-bold mb-4">Details</h2>
              <div className="flex flex-col gap-2 min-w-[600px]">
                <div className="flex justify-between">
                  <p className="w-1/4 text-slate-500 text-sm">Expertise</p>
                  <p className="w-1/4 text-sm text-slate-700">
                    {data?.expertise}
                  </p>
                  {data?.price_per_visit && (
                    <>
                      <p className="w-1/4 text-sm text-slate-500">
                        Fees per visit
                      </p>
                      <p className="w-1/4 text-sm text-slate-700">
                        {data?.price_per_visit}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex justify-between">
                  <p className="w-1/4 text-sm text-slate-500">
                    Total Experience
                  </p>
                  <p className="w-1/4 text-sm text-slate-700">
                    {data?.total_experience} years
                  </p>
                </div>
              </div>
            </section>
}

            {/* hospital */}
            {category == "hospital" &&
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md overflow-x-scroll capitalize'>
                <h2 className='font-bold mb-4'>Details</h2>
                <div className='flex flex-col gap-2 min-w-[600px]'>
                    <div className='flex justify-between'>
                        <p className='w-1/4 text-slate-500 text-sm'>Name</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.name}</p>
                        <p className='w-1/4 text-sm text-slate-500'>Type</p>
                        <p className='w-1/4 text-sm text-slate-700'>{data?.type}</p>
                    </div>
                    <div className='flex justify-between'>
                        {data?.price_registration &&
                        <>
                        <p className='w-1/4 text-sm text-slate-500'>Price per registration</p>
                        <p className='w-1/4 text-sm text-slate-700'>₹ {data?.price_registration} </p>
                        </>
}
                        {data?.price_per_visit &&
                        <>
                        <p className='w-1/4 text-sm text-slate-500'>Price per visit</p>
                        <p className='w-1/4 text-sm text-slate-700'>₹ {data?.price_per_visit} </p>
                        </>
}
                    </div>
                  
                </div>
            </section>
}
            <section className='xl:w-3/5 border-[1px] border-slate-400 sm:mt-8 mt-4 p-4 rounded-md capitalize'>
            <h2 className='font-bold mb-4'>Overview</h2>
            <p className='text-sm'>{data?.description}</p>
            </section>
        </div>
        
    </div>
    }
    </>

  )
}

export default ViewDetails