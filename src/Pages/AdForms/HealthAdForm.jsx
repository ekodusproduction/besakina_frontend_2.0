import React,{useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaCamera } from "react-icons/fa";
import '../../styles/style.css'
import axiosInstance from '../../api/axiosInstance'
import Button from '../../Components/Button/Button';


const HealthAdForm = () => {
    const [selectedForm, setSelectedForm] = useState('doctors');
    const openForm = (form) => {
        setSelectedForm(form);
      };
      const [selectedDoctorsImages, setSelectedDoctorsImages] = useState([]);
      const [selectedHospitalImages, setSelectedHospitalImages] = useState([]);
    const token = localStorage.getItem('token')

    const imageHandler = (e,index) => {
        const files = e.target.files;
       
        if (files.length>0) {
            setSelectedDoctorsImages(prev => {
                const newselectedDoctorsImages = [...prev];
                newselectedDoctorsImages[index] = files[0];
                return newselectedDoctorsImages;
            });
        }
       
    }
    const hospitalImageHandler  = (e,index) => {
        const files = e.target.files;  
        if (files.length>0) {
            setSelectedHospitalImages(prev => {
                const newselectedHospitalImages = [...prev];
                newselectedHospitalImages[index] = files[0];
                return newselectedHospitalImages;
            });
        }

    }

    const doctorFormSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        console.log({...value,images:selectedDoctorsImages})
        axiosInstance.post('api/doctors', {...value, images:selectedDoctorsImages} , {
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
    const hospitalFormSubmitHandler = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        console.log({...value,images:selectedHospitalImages})
        axiosInstance.post('api/hospitals', {...value, images:selectedHospitalImages} , {
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
                <div>
                    <p className='text-center py-4 font-semibold text-xl border-b-[1px] border-gray-300'>POST YOUR AD</p>
                </div>
                
                <div className='flex justify-center p-8 gap-16'>
                    {/* <div className='flex flex-col gap-4 '>
                        <h3 className='mb-2 font-semibold text-xl'>Category</h3>
                        <a href="">Doctors</a>
                        <a href="">Hospital or Cinic</a>
                       
                    </div> */}
                    <div className="tab flex flex-col items-start gap-4">
                        <button
                            className={`tablinks ${selectedForm === 'doctors' ? ` bg-[#1A5C96] text-white  rounded` : ''}  text-lg p-2`}
                            onClick={() => openForm('doctors')}
                            >
                            Doctors
                        </button>
                        <button
                            className={`tablinks ${selectedForm === 'hospitals' ? ` bg-[#1A5C96] text-white rounded` : ''}  text-lg p-2`}
                            onClick={() => openForm('hospitals')}
                            >
                            Hospital & Clinics
                        </button>
                    </div>
                    <div>
                        {selectedForm == 'doctors' && 
                        
                            <form action="" onSubmit={doctorFormSubmitHandler} className='flex flex-col gap-8'>
                            <h3 className='mb-2 font-semibold text-xl'>Add Some Details</h3>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Select Expertise*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="child" name="expertise" value="child" className='hidden'/>
                                        <label for="child" className='px-4 py-2'>Child</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="gastro_intestine" name="expertise" value="gastro intestine" className='hidden'/>
                                        <label for="gastro_intestine" className='px-4 py-2'>Gastro intestine</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="cadiology" name="expertise" value="cadiology" className='hidden'/>
                                        <label for="cadiology" className='px-4 py-2'>Cadiology</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="opthopaedic" name="expertise" value="opthopaedic" className='hidden'/>
                                        <label for="opthopaedic" className='px-4 py-2'>Opthopaedic</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="gynecology" name="expertise" value="gynecology" className='hidden'/>
                                        <label for="gynecology" className='px-4 py-2'>Gynecology</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="emergency_medicine" name="expertise" value="emergency medicine" className='hidden'/>
                                        <label for="emergency_medicine" className='px-4 py-2'>Emergency Medicine</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="physician" name="expertise" value="physician" className='hidden'/>
                                        <label for="physician" className='px-4 py-2'>Physician</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="others" name="expertise" value="others" className='hidden'/>
                                        <label for="others" className='px-4 py-2'>Others</label>
                                    </div>

                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Name*</p>
                                <div className='flex gap-2'>
                                    <input name='name' type="text" className='w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Total Experience (in years)*</p>
                                <div className='flex gap-2'>
                                    <input name='total_experience' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Title*</p>
                                <div className='flex gap-2'>
                                    <input name='title' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Describe about yourself*</p>
                                <div className='flex gap-2'>
                                    <input name='description' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                               
                                <p className='mb-2 font-semibold text-gray-700'>Registration Price</p>
                                <div className='flex gap-2'>
                                    <input name='price_registration' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price (per visit)</p>
                                <div className='flex gap-2'>
                                    <input name='price_per_visit' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
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
                            </form>}

                    {selectedForm=='hospitals' && 
                        <form action="" className='flex flex-col gap-8' onSubmit={hospitalFormSubmitHandler}>
                        <h3 className='mb-2 font-semibold text-xl'>Add Some Details</h3>
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Select Type*</p>
                            <div className='flex gap-2 text-gray-700'>
                                <div className='border-[1px] border-gray-400 rounded-sm'>
                                    <input type="radio" id="hospital" name="type" value="hospital" className='hidden'/>
                                    <label for="hospital" className='px-4 py-[2px] cursor-pointer'>Hospital</label>
                                </div>
                                <div className='border-[1px] border-gray-400 rounded-sm'>
                                    <input type="radio" id="clinic" name="type" value="clinic" className='hidden'/>
                                    <label for="clinic" className='px-4 py-[2px] cursor-pointer'>Clinic</label>
                                </div>
                                <div className='border-[1px] border-gray-400 rounded-sm'>
                                    <input type="radio" id="laboratory" name="type" value="laboratory" className='hidden'/>
                                    <label for="laboratory" className='px-4 py-[2px] cursor-pointer'>Laboratory</label>
                                </div>
                                <div className='border-[1px] border-gray-400 rounded-sm'>
                                    <input type="radio" id="nursing_home" name="type" value="nursing_home" className='hidden'/>
                                    <label for="nursing_home" className='px-4 py-[2px] cursor-pointer'>Nursing Home</label>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Name*</p>
                            <div className='flex gap-2'>
                                <input name='name' type="text" className='w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                       
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Title*</p>
                            <div className='flex gap-2'>
                                <input name='title' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Write some description</p>
                            <div className='flex gap-2'>
                                <input name='description' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Registration Price</p>
                            <div className='flex gap-2'>
                                <input name='price_registration' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                    
                        <div>
                            <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                            <p className='mb-2 font-semibold text-gray-700'>Price (per visit)</p>
                            <div className='flex gap-2'>
                                <input name='price_per_visit' type="text" className='w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
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
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='border border-gray-400 rounded-md'>
                                        <label htmlFor={`file-${index}`} className='cursor-pointer h-24 w-24 flex justify-center items-center'>
                                        <FaCamera size={30} color='gray'/>
                                        </label>
                                        <input type="file" id={`file-${index}`} onChange={(e)=>hospitalImageHandler(e,index)} className='hidden' />
                                    </div>
                                    ))} 
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <Button category={'primarybtn'} type={'submit'}>Submit</Button>
                            </div>
                        </form>}
                    
                    
                        
                    </div>
                </div>
            </section>
      
   </>
  )
}

export default HealthAdForm