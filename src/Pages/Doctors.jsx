// import React,{useState,useEffect} from 'react'
// import Navbar from '../Components/Navbar/Navbar'
// import Footer from '../Components/Footer/Footer'
// import Categories from '../Components/Categories/Categories'
// import { Link } from 'react-router-dom'
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css/skyblue';
// import Button from '../Components/Button/Button'
// import LatestAds from '../Components/LatestAds/LatestAds'
// import ProductCard from '../Components/Cards/ProductCard'
// import axiosInstance from '../api/axiosInstance'


// const Doctors = () => {
//   const token = localStorage.getItem('token');
//   const [doctorsList, setDoctorsList] = useState([])
//   const [expertise, setExpertise] = useState('');
//   const [notFound, setNotFound] = useState(false)

//   useEffect(()=> {
//     axiosInstance.get('api/doctors/list')
//     .then(response => {
//       console.log(response);
//       setDoctorsList(response.data.data.advertisements);
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   },[]);

//   const filterHandler = () => {
//     axiosInstance.get(`api/doctors/filter?expertise=${expertise}`)
//     .then(response=> {
//       console.log(response);
//       setDoctorsList(response.data.data.advertisements)
//     })
//     .catch(err=> {
//       console.log(err)
//       if(err.response.http_status_code=404){
//         setNotFound(true);
//       }
//     })
//   }

//   return (
//     <> 
//         <Categories/>
//         <div className='md:px-12 sm:px-4 px-2 py-2'>
//             <div className='flex gap-2 sm:mb-6'>
//                 <Link to="/" className='font-semibold'>Home</Link>
//                 <p> {'>'} </p>
//                 <a href="" className='font-semibold'>Properties</a>
//             </div>
//             <div>
//                 <Splide aria-label="Banner" >
//                     <SplideSlide>
//                         <img src="/assets/Banner/properties_banner.png" className='w-[100%]'    alt="Image 1"/>
//                     </SplideSlide>
//                     <SplideSlide>
//                         <img src="/assets/Banner/properties_banner.png" className='w-[100%]'    alt="Image 1"/>
//                     </SplideSlide>
//                 </Splide>
//             </div>
//             <div className='py-8 flex gap-8'>
//               <div className='flex flex-col gap-2'> 
//                   <div className='w-[20vw] shadow border-gray-300 border-[1px] rounded-md p-4 bg-white'>
//                     <h3 className='font-bold text-lg mb-4'>Filter</h3>
//                     <p>Choose Expertise</p>
//                     <div className='my-2 flex flex-col gap-2'>
//                         <select name="expertise" onChange={(e)=> setExpertise(e.target.value)}>
//                             <option value="Diabetese">Diabetes</option>
//                             <option value="Gynacology">Gynaecology</option>
//                             <option value="general physician">General Physician</option>
//                         </select>
//                         <Button category={'primarybtn'} clickHandler={filterHandler}>Search</Button>
//                         {notFound && <p className='text-[red] text-sm'>*Property Not Found! Please select a valid range</p>}
//                     </div>  
//                   </div>
//               </div>
//               <div className=' w-[80%] grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 m-auto'>
//                 {doctorsList.map(item => (
//                   <ProductCard data={item} key={item.id} link={'/hospitalitydetails'}/>
//                 ))}
            
//               </div>
              
//             </div>
//         </div>  
        
//     </>
//   )
// }

// export default Doctors


import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import Categories from '../Components/Categories/Categories'
import { Link } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import Button from '../Components/Button/Button'
import LatestAds from '../Components/LatestAds/LatestAds'
import ProductCard from '../Components/Cards/ProductCard'
import axiosInstance from '../api/axiosInstance'
import { IoFilterOutline } from "react-icons/io5";


const Doctors = () => {
  const token = localStorage.getItem('token');
  const [doctorsList, setDoctorsList] = useState([])
  const [expertise, setExpertise] = useState('');
  const [notFound, setNotFound] = useState(false)
  const [showFilter, setShowFilter] = useState(false)


  useEffect(()=> {
    axiosInstance.get('api/doctors/list')
    .then(response => {
      console.log(response);
      setDoctorsList(response.data.data.advertisements);
    })
    .catch(error => {
      console.error(error);
    });
  },[]);

  const filterHandler = () => {
  
    axiosInstance.get(`api/doctors/filter?expertise=${expertise}`)
    .then(response=> {
      console.log(response);
      setDoctorsList(response.data.data.advertisements)
    })
    .catch(err=> {
      console.log(err)
      if(err.response.http_status_code=404){
        setNotFound(true);
      }
    })
  }

  return (
    <>
       
        <Categories/>
        <div className='md:px-12 sm:px-4 px-2 py-2 max-w-[1450px] m-auto '>
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
            <div className='py-4 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'> 
                  <div className='w-full max-w-[300px] bg-white'>
                    <div className='bg-[#3484A1] px-2 py-[3px] rounded text-white shadow flex flex-row items-center gap-2 cursor-pointer w-fit' onClick={()=> setShowFilter(!showFilter)}>
                      <h3 className='font-semibold'>Filter</h3>
                      <IoFilterOutline/>
                    </div>
                    {showFilter && <>
                      <p className='block text-sm text-gray-500 mt-2'>Choose Expertise</p>
                    <div className='my-2 flex flex-row items-center gap-2'>
                    <select name="expertise" className='border-gray-400 text-gray-600 py-[3px]' onChange={(e)=> setExpertise(e.target.value)}>
                        <option value="Diabetese">Diabetes</option>
                        <option value="Gynacology">Gynaecology</option>
                        <option value="general physician">General Physician</option>
                     </select>
                      <Button category={'primarybtn'} clickHandler={filterHandler}>Search</Button>
                  </div>
                  {notFound && <p className='text-[red] text-sm'>*Property Not Found! Please select a valid range</p>}

                    </>}
                    
                   
                  </div>
              </div>
              <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 md:gap-4 '>
                {doctorsList?.map(item => (
                  <ProductCard data={item} key={item.id} link={'/doctordetails'}/>
                ))}
            
              </div>
              
            </div>
        </div>  
        
    </>
  )
}

export default Doctors
