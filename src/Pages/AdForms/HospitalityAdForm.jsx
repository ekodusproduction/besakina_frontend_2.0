import React,{useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaCamera } from "react-icons/fa";
import '../../styles/style.css'
import Button from '../../Components/Button/Button';
import axiosInstance from '../../api/axiosInstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const HospitalityAdForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const token = localStorage.getItem('token')
    const [image, setImage] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

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
          
                  const newImages = [...image];
                  newImages[index] = canvas.toDataURL('image/jpeg', 0.5); // Use canvas.toDataURL to get the compressed image
                  setImage(newImages);

                  setSelectedImages(prev => {
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

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setSubmitting(true)
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        console.log({...value,images:selectedImages})
        axiosInstance.post('api/hospitality/add', {...value, images:selectedImages} , {
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
    const handleDeleteImage = (index) => {
        const newImages = [...image];
        const newSelectedImages = [...selectedImages]
        newImages.splice(index, 1);
        newSelectedImages.splice(index,1)
        setImage(newImages);
        setSelectedImages(newSelectedImages)
      };
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
                                <p className='mb-2 font-semibold text-gray-700'>Select Type*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="hotel" name="type" value="hotel" className='hidden'/>
                                        <label for="hotel" className='px-4 py-[2px] cursor-pointer'>Hotel</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="guest_house" name="type" value="guest_house" className='hidden'/>
                                        <label for="guest_house" className='px-4 py-[2px] cursor-pointer'>Guest House</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="homestay" name="type" value="homestay" className='hidden'/>
                                        <label for="homestay" className='px-4 py-[2px] cursor-pointer'>Homestay</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="resort" name="type" value="resort" className='hidden'/>
                                        <label for="resort" className='px-4 py-[2px] cursor-pointer'>Resort</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="paying_guest" name="type" value="paying_guest" className='hidden'/>
                                        <label for="paying_guest" className='px-4 py-[2px] cursor-pointer'>Paying Guest</label>
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
                                <p className='mb-2 font-semibold text-gray-700'>Ad Title*</p>
                                <div className='flex gap-2'>
                                    <input name='title' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Describe what you are selling*</p>
                                <div className='flex gap-2'>
                                    <input name='description' title='description' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
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
                                    <input type="text" name='pincode' className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price</p>
                                <div className='flex gap-2'>
                                    <input name='price' type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='border border-gray-400 rounded-md'>
                                        {selectedImages[index] ? (
                                            <div className='relative'>
                                                <img src={image[index]} alt={`Image ${index}`} className='h-24 w-24 rounded-md' />
                                                <button type='button' onClick={() => handleDeleteImage(index)} className='text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold'>X</button>
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
                        </form>
                    </div>
                </div>
            </section>
      
   </>
  )
}

export default HospitalityAdForm