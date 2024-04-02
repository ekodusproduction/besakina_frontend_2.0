import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaCamera } from "react-icons/fa";
import '../../styles/style.css'
import Button from '../../Components/Button/Button';
import axiosInstance from '../../api/axiosInstance'


const VehicleAdForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const token = localStorage.getItem('token')

    const imageHandler = (e,index) => {
        const files = e.target.files;
       
        if (files.length>0) {
            setSelectedImages(prev => {
                const newSelectedImages = [...prev];
                newSelectedImages[index] = files[0];
                return newSelectedImages;
            });
        }
       
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        console.log({...value,images:selectedImages})
        axiosInstance.post('api/vehicles', {...value, images:selectedImages} , {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
          }).then((response)=> {
            console.log(response)
          }).catch(err=> {
            console.log(err)
          })
       
    }
  return (
   <>
      
            <section className='bg-white'>
                <div >
                    <p className='text-center py-4 font-semibold text-xl border-b-[1px] border-gray-300'>POST YOUR AD</p>
                </div>
                <div className='flex justify-center p-8 gap-16'>
                    {/* <div className='flex flex-col gap-4 '>
                        <h3 className='mb-2 font-semibold text-xl'>Properties</h3>
                        <a href="">For Sale: Houses and Apartments</a>
                        <a href="">For Rent: Houses and Apartments</a>
                        <a href="">Lands & Plots</a>
                        <a href="">For Rent: Shops & Offices</a>
                        <a href="">For Sale: Shops & Offices</a>
                        <a href="">PG & Guest House</a>
                    </div> */}
                    <div>
                        <form action="" className='flex flex-col gap-8' onSubmit={formSubmitHandler}>
                            <h3 className='mb-2 font-semibold text-xl'>Add Some Details</h3>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Vehicle Type*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car" name="type" value="car" className='hidden'/>
                                        <label for="car" className='px-4 py-[2px] cursor-pointer'>Car</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="motorcycle" name="vehicle_type" value="motorcycle" className='hidden'/>
                                        <label for="motorcycle" className='px-4 py-[2px] cursor-pointer'>Motorcycle</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="scooter" name="vehicle_type" value="scooter" className='hidden'/>
                                        <label for="scooter" className='px-4 py-[2px] cursor-pointer'>Scooter</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bicycle" name="vehicle_type" value="bicycle" className='hidden'/>
                                        <label for="bicycle" className='px-4 py-[2px] cursor-pointer'>Bicycle</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Select Brand*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <select name="brand" id="" className='border-[1px] border-gray-400 rounded-sm w-[150px]'>
                                        <option value="BMW">BMW</option>
                                        <option value="Ford">Ford</option>
                                        <option value="Fiat">Fiat</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Jeep">Jeep</option>
                                        <option value="Mercedes">Mercedes</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Other">Other</option>
                                    </select>

                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Registration Year*</p>
                                <div className='flex gap-2'>
                                    <input name='registration_year' type="text" className='w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Kilometer Driven*</p>
                                <div className='flex gap-2'>
                                    <input name='kilometer_driven' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Ad Title*</p>
                                <div className='flex gap-2'>
                                    <input name='title' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Describe what you are selling*</p>
                                <div className='flex gap-2'>
                                    <input name='description' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                           
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Locality*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='locality' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>State*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='state' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Pincode*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='pincode' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price</p>
                                <div className='flex gap-2'>
                                    <input name='price' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='border border-gray-400 rounded-md'>
                                        <label htmlFor={`file-${index}`} className='cursor-pointer h-24 w-24 flex justify-center items-center'>
                                        <FaCamera size={30} color='gray'/>
                                        </label>
                                        <input type="file" id={`file-${index}`} onChange={(e)=>imageHandler(e,index)} className='hidden' />
                                    </div>
                                    ))} 
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <Button category={'primarybtn'} type={'submit'}>Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

   </>
  )
}

export default VehicleAdForm