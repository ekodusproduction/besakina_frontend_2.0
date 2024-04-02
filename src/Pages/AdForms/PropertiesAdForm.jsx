import React,{useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaCamera } from "react-icons/fa";
import Button from '../../Components/Button/Button';
import '../../styles/style.css'
import axiosInstance from '../../api/axiosInstance'

const PropertiesAdForm = () => {
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
        axiosInstance.post('api/property', {...value, images:selectedImages} , {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
          }).then((response)=> {
            console.log(response)
            console.log("PARSE",JSON.parse(response.data.data.result))  
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
                    <div>
                        <form action="" className='flex flex-col gap-8' onSubmit={formSubmitHandler}>
                            <h3 className='mb-2 font-semibold text-xl'>Add Some Details</h3>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Type*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="apartments" name="type" value="apartments" className='hidden'/>
                                        <label for="apartments" className='px-4 py-[2px] cursor-pointer'>Apartments</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="builder_floor" name="type" value="builder_floor" className='hidden'/>
                                        <label for="builder_floor" className='px-4 py-[2px] cursor-pointer'>Builder Floors</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="farm_houses" name="type" value="farm_houses" className='hidden'/>
                                        <label for="farm_houses" className='px-4 py-[2px] cursor-pointer'>Farm Houses</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="houses_villas" name="type" value="houses_villas" className='hidden'/>
                                        <label for="houses_villas" className='px-4 py-[2px] cursor-pointer'>Houses & Villas</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Bedrooms*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_1" name="bedrooms" value="1" className='hidden'/>
                                        <label for="bedroom_no_1" className='px-4 py-[2px] cursor-pointer'>1</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_2" name="bedrooms" value="2" className='hidden'/>
                                        <label for="bedroom_no_2" className='px-4 py-[2px] cursor-pointer'>2</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_3" name="bedrooms" value="3" className='hidden'/>
                                        <label for="bedroom_no_3" className='px-4 py-[2px] cursor-pointer'>3</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_4" name="bedrooms" value="4" className='hidden'/>
                                        <label for="bedroom_no_4" className='px-4 py-[2px] cursor-pointer'>4</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Bathroom*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_1" name="bathrooms" value="1" className='hidden'/>
                                        <label for="bathroom_no_1" className='px-4 py-[2px] cursor-pointer'>1</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_2" name="bathrooms" value="2" className='hidden'/>
                                        <label for="bathroom_no_2" className='px-4 py-[2px] cursor-pointer'>2</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_3" name="bathrooms" value="3" className='hidden'/>
                                        <label for="bathroom_no_3" className='px-4 py-[2px] cursor-pointer'>3</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_4" name="bathrooms" value="4" className='hidden'/>
                                        <label for="bathroom_no_4" className='px-4 py-[2px] cursor-pointer'>4</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Furnishing*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="furnished" name="furnishing" value="furnished" className='hidden'/>
                                        <label for="furnished" className='px-4 py-[2px] cursor-pointer'>Furnished</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="semifurnished" name="furnishing" value="semifurnished" className='hidden'/>
                                        <label for="semifurnished" className='px-4 py-[2px] cursor-pointer'>Semi-furnished</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="unfurnished" name="furnishing" value="unfurnished" className='hidden'/>
                                        <label for="unfurnished" className='px-4 py-[2px] cursor-pointer'>Unfurnished</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Categories*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="1BHK" name="category" value="1BHK" className='hidden'/>
                                        <label for="1BHK" className='px-4 py-[2px] cursor-pointer'>1BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="2BHK" name="category" value="2BHK" className='hidden'/>
                                        <label for="2BHK" className='px-4 py-[2px] cursor-pointer'>2BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="3BHK" name="category" value="3BHK" className='hidden'/>
                                        <label for="3BHK" className='px-4 py-[2px] cursor-pointer'>3BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="4BHK" name="category" value="4BHK" className='hidden'/>
                                        <label for="4BHK" className='px-4 py-[2px] cursor-pointer'>4BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="unfurnished" name="category" value="unfurnished" className='hidden'/>
                                        <label for="unfurnished" className='px-4 py-[2px] cursor-pointer'>5BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="1RK" name="category" value="1RK" className='hidden'/>
                                        <label for="1RK" className='px-4 py-[2px] cursor-pointer'>1RK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="HOUSE" name="category" value="HOUSE" className='hidden'/>
                                        <label for="HOUSE" className='px-4 py-[2px] cursor-pointer'>HOUSE</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="VILLA" name="category" value="VILLA" className='hidden'/>
                                        <label for="VILLA" className='px-4 py-[2px] cursor-pointer'>VILLA</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Construction Status*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="new_launch" name="construction_status" value="new_launch" className='hidden'/>
                                        <label for="new_launch" className='px-4 py-[2px] cursor-pointer'>New launch</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="under_construction" name="construction_status" value="under_construction" className='hidden'/>
                                        <label for="under_construction" className='px-4 py-[2px] cursor-pointer'>Under construction</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="ready_to_move" name="construction_status" value="ready_to_move" className='hidden'/>
                                        <label for="ready_to_move" className='px-4 py-[2px] cursor-pointer'>Ready to move</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Listed By</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="builder" name="listed_by" value="builder" className='hidden'/>
                                        <label for="builder" className='px-4 py-[2px] cursor-pointer'>Builder</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="dealer" name="listed_by" value="dealer" className='hidden'/>
                                        <label for="dealer" className='px-4 py-[2px] cursor-pointer'>Dealer</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="owner" name="listed_by" value="owner" className='hidden'/>
                                        <label for="owner" className='px-4 py-[2px] cursor-pointer'>Owner</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Super Builtup Area*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='super_builtup_area' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Carpet Area*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='carpet_area' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            {/* <div>
                                <p className='mb-2 font-semibold text-gray-700'>Maintainance*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='maintainance' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div> */}
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Total Floors*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='total_floors' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Floor No.</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='floor_no' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Total Rooms*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='total_rooms' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Car Parking</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_0" name="car_parking" value="0" className='hidden'/>
                                        <label for="car_parking_no_0" className='px-4 py-[2px]'>0</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_1" name="car_parking" value="1" className='hidden'/>
                                        <label for="car_parking_no_1" className='px-4 py-[2px]'>1</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_2" name="car_parking" value="2" className='hidden'/>
                                        <label for="car_parking_no_2" className='px-4 py-[2px]'>2</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_3" name="car_parking" value="3" className='hidden'/>
                                        <label for="car_parking_no_3" className='px-4 py-[2px]'>3</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_3_plus" name="car_parking" value="3+" className='hidden'/>
                                        <label for="car_parking_no_3_plus" className='px-4 py-[2px]'>3+</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>House Number*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='house_no' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Landmark*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='landmark' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
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
                                    <input type="text" name='price' className='w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
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

export default PropertiesAdForm