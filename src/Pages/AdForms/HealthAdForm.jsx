import React,{useState, useEffect} from 'react'
import { FaCamera } from "react-icons/fa";
import '../../styles/style.css'
import axiosInstance from '../../api/axiosInstance'
import Button from '../../Components/Button/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';



const HealthAdForm = () => {
    const [selectedForm, setSelectedForm] = useState('doctors');
    const openForm = (form) => {
        setSelectedForm(form);
      };
      const [selectedDoctorsImages, setSelectedDoctorsImages] = useState([]);
      const [selectedHospitalImages, setSelectedHospitalImages] = useState([]);
      const [doctorsImage, setDoctorsImage] = useState([]);
      const [hospitalsImage, setHospitalsImage] = useState([]);
      const [submitting, setSubmitting] = useState(false);
      const navigate= useNavigate();


    const token = localStorage.getItem('token')

    const imageHandler = (e,index) => {
        const files = e.target.files;
    
          if (files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const img = new Image();
              img.src = reader.result;
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxWidth = 800; // Set your desired max width
                const maxHeight = 600; // Set your desired max height
                let width = img.width;
                let height = img.height;
          
                if (width > height) {
                  if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                  }
                } else {
                  if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                  }
                }
          
                canvas.width = width;
                canvas.height = height;
          
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
          
                canvas.toBlob((blob) => {
                  const compressedFile = new File([blob], files[0].name, { type: 'image/jpeg', lastModified: Date.now() });
          
                  const newImages = [...doctorsImage];
                  newImages[index] = canvas.toDataURL('image/jpeg', 0.5); // Use canvas.toDataURL to get the compressed image
                  setDoctorsImage(newImages);

                  setSelectedDoctorsImages(prev => {
                    const newSelectedImages = [...prev];
                    newSelectedImages[index] = compressedFile;
                    return newSelectedImages;
                  });
                }, 'image/jpeg', 0.5); 
              };
            };
            reader.readAsDataURL(files[0]);
          }
       
    }
    const hospitalImageHandler  = (e,index) => {
        const files = e.target.files;
    
        if (files.length > 0) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const maxWidth = 800; // Set your desired max width
              const maxHeight = 600; // Set your desired max height
              let width = img.width;
              let height = img.height;
        
              if (width > height) {
                if (width > maxWidth) {
                  height *= maxWidth / width;
                  width = maxWidth;
                }
              } else {
                if (height > maxHeight) {
                  width *= maxHeight / height;
                  height = maxHeight;
                }
              }
        
              canvas.width = width;
              canvas.height = height;
        
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
        
              canvas.toBlob((blob) => {
                const compressedFile = new File([blob], files[0].name, { type: 'image/jpeg', lastModified: Date.now() });
        
                const newImages = [...hospitalsImage];
                newImages[index] = canvas.toDataURL('image/jpeg', 0.5); // Use canvas.toDataURL to get the compressed image
                setHospitalsImage(newImages);

                setSelectedHospitalImages(prev => {
                  const newSelectedImages = [...prev];
                  newSelectedImages[index] = compressedFile;
                  return newSelectedImages;
                });
              }, 'image/jpeg', 0.5); 
            };
          };
          reader.readAsDataURL(files[0]);
        }

    }

    const doctorFormSubmitHandler = (e) => {
        setSubmitting(true)
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        console.log({...value,images:selectedDoctorsImages})
        axiosInstance.post('api/doctors/add', {...value, images:selectedDoctorsImages} , {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
          }).then((response)=> {
            console.log(response)
            Swal.fire({
                title: "Success",
                text: "The form was successfully submitted",
                icon: "success"
              });
            setSubmitting(false);
            navigate("/");
          }).catch(err=> {
            console.log(err)
            setSubmitting(false)
            Swal.fire({
                title: "Error",
                text: "Something went wrong",
                icon: "error"
              });
          })
       
    }
    const hospitalFormSubmitHandler = (e) => {
        setSubmitting(true)
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        console.log({...value,images:selectedHospitalImages})
        axiosInstance.post('api/hospitals/add', {...value, images:selectedHospitalImages} , {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
          }).then((response)=> {
            console.log(response)
            Swal.fire({
                title: "Success",
                text: "The form was successfully submitted",
                icon: "success"
              });
            setSubmitting(false);
            navigate("/");
          }).catch(err=> {
            console.log(err)
            setSubmitting(false)
            Swal.fire({
                title: err?.response?.data?.message,
                // text: err?.response?.data?.message,
                icon: 'warning',
              });
              if (err?.response?.data?.message === "User Profile Incomplete") {
                navigate("/setup-profile");
            }
            });
       
    }

    const handleDeleteDoctorsImage = (index) => {
        const newImages = [...doctorsImage];
        const newSelectedImages = [...selectedDoctorsImages]
        newImages.splice(index, 1);
        newSelectedImages.splice(index,1)
        setDoctorsImage(newImages);
        setSelectedDoctorsImages(newSelectedImages)
      };
      const handleDeleteHopitalsImage = (index) => {
        const newImages = [...hospitalsImage];
        const newSelectedImages = [...selectedHospitalImages]
        newImages.splice(index, 1);
        newSelectedImages.splice(index,1)
        setHospitalsImage(newImages);
        setSelectedHospitalImages(newSelectedImages)
      };
   
  return (
   <>  
            <section className='bg-white'>
                <div>
                <BackButton path={(-1)} style={"absolute pt-3 pl-12"}/>
                    <p className='text-center py-4 font-semibold text-xl border-b-[1px] border-gray-300'>POST YOUR AD</p>
                </div>
                
                <div className='flex flex-col md:flex-row justify-center p-8 gap-8 md:gap-16'>
                   
                    <div className="tab flex justify-center md:justify-normal md:flex-col items-start gap-4 whitespace-nowrap">
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
                                    <input name='name' type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Total Experience (in years)*</p>
                                <div className='flex gap-2'>
                                    <input name='total_experience' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Title*</p>
                                <div className='flex gap-2'>
                                    <input name='title' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Describe about yourself*</p>
                                <div className='flex gap-2'>
                                    <input name='description' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            {/* <div>
                               
                                <p className='mb-2 font-semibold text-gray-700'>Registration Price</p>
                                <div className='flex gap-2'>
                                    <input name='price_registration' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div> */}
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price (per visit)</p>
                                <div className='flex gap-2'>
                                    <input name='price_per_visit' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Locality*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='locality' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>State*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='state' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Pincode*</p>
                                <div className='flex gap-2'>
                                    <input type="number" name='pincode' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='flex items-center justify-center border border-gray-400 rounded-md'>
                                        {selectedDoctorsImages[index] ? (
                                            <div className='relative'>
                                                <img src={doctorsImage[index]} alt={`Image ${index}`} className='h-24 w-full rounded-md object-cover' />
                                                <button type='button' onClick={() => handleDeleteDoctorsImage(index)} className='text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold'>X</button>
                                            </div>
                                        ) : (
                                            <label htmlFor={`file-${index}`} className='cursor-pointer h-24 w-24 flex justify-center items-center'>
                                            <FaCamera size={30} color='gray'/>
                                            </label>
                                        )}
                                        <input type="file" id={`file-${index}`} accept="image/*" onChange={(e) => imageHandler(e, index)} className='hidden' />
                                    </div>
                                    ))}  
                                </div>
                            </div>
                            <div className='flex justify-end'>
                            <Button category={'primarybtn'} type={'submit'} disabled={submitting}>{submitting? 'Submitting':'Submit'}</Button>
                            </div>
                            </form>}

                    {selectedForm=='hospitals' && 
                        <form action="" className='flex flex-col gap-8' onSubmit={hospitalFormSubmitHandler}>
                        <h3 className='mb-2 font-semibold text-xl'>Add Some Details</h3>
                        <div className='w-[62rem]'>
                            <p className='mb-2 font-semibold text-gray-700'>Select Type*</p>
                            <div className='flex flex-wrap gap-2 text-gray-700'>
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
                                <div className='border-[1px] border-gray-400 rounded-sm'>
                                    <input type="radio" id='care_giving_service' name='type' value="care_giving_home" className='hidden' />
                                    <label htmlFor="care_giving_service" className='px-4 py-[2px] cursor-pointer'>Care Giving Service</label>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Name*</p>
                            <div className='flex gap-2'>
                                <input name='name' type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                       
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Title*</p>
                            <div className='flex gap-2'>
                                <input name='title' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Write some description</p>
                            <div className='flex gap-2'>
                                <input name='description' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                        <div>
                            <p className='mb-2 font-semibold text-gray-700'>Registration Fee*</p>
                            <div className='flex gap-2'>
                                <input name='price_registration' required type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                    
                        <div>
                            <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                            <p className='mb-2 font-semibold text-gray-700'>Price (per visit)</p>
                            <div className='flex gap-2'>
                                <input name='price_per_visit' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                            </div>
                        </div>
                        <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Locality*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='locality' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>State*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='state' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Pincode*</p>
                                <div className='flex gap-2'>
                                    <input type="number" name='pincode' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='flex items-center justify-center border border-gray-400 rounded-md'>
                                        {selectedHospitalImages[index] ? (
                                            <div className='relative'>
                                                <img src={hospitalsImage[index]} alt={`Image ${index}`} className='h-24 w-24 rounded-md' />
                                                <button type='button' onClick={() => handleDeleteHopitalsImage(index)} className='text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold'>X</button>
                                            </div>
                                        ) : (
                                            <label htmlFor={`file-${index}`} className='cursor-pointer h-24 w-24 flex justify-center items-center'>
                                            <FaCamera size={30} color='gray'/>
                                            </label>
                                        )}
                                        <input type="file" id={`file-${index}`} accept="image/*" onChange={(e) => hospitalImageHandler(e, index)} className='hidden' />
                                    </div>
                                    ))}  
                                </div>
                            </div>
                            <div className='flex justify-end'>
                            <Button category={'primarybtn'} type={'submit'} disabled={submitting}>{submitting? 'Submitting':'Submit'}</Button>
                            </div>
                        </form>}
                    
                    
                        
                    </div>
                </div>
            </section>
      
   </>
  )
}

export default HealthAdForm