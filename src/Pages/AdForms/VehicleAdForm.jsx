import React, {useState, useEffect} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaCamera } from "react-icons/fa";
import '../../styles/style.css'
import Button from '../../Components/Button/Button';
import axiosInstance from '../../api/axiosInstance'
import Swal from 'sweetalert2';


const VehicleAdForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [image, setImage] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const token = localStorage.getItem('token');
    const [second_hand, setSecondHand] = useState(0);

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
        axiosInstance.post('api/vehicles/add', {...value, images:selectedImages, second_hand} , {
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
            setSubmitting(false)
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
                <div className='flex flex-col md:flex-row justify-center p-8 gap-8 md:gap-16'>
                <div className="tab flex justify-center md:justify-normal md:flex-col items-start gap-4 whitespace-nowrap">
                        <button
                            className={`tablinks ${second_hand === 0 ? ` bg-[#1A5C96] text-white  rounded` : ''}  text-lg p-2`}
                            onClick={() => setSecondHand(0)}
                            >
                            New Vehicle
                        </button>
                        <button
                            className={`tablinks ${second_hand === 1 ? ` bg-[#1A5C96] text-white rounded` : ''}  text-lg p-2`}
                            onClick={() => setSecondHand(1)}
                            >
                            Used Vehicle
                        </button>
                    </div>
                    <div>
                        {second_hand == 0 && 
                            <form action="" className='flex flex-col gap-8' onSubmit={formSubmitHandler}>
                            <h3 className='mb-2 text-center md:text-left font-semibold text-xl'>Add Some Details</h3>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700 '>Vehicle Type*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car"  name="type" value="car" className='hidden'/>
                                        <label for="car" className='px-4 py-[2px] cursor-pointer'>Car</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="motorcycle"  name="type" value="motorcycle" className='hidden'/>
                                        <label for="motorcycle" className='px-4 py-[2px] cursor-pointer'>Motorcycle</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="scooter"  name="type" value="scooter" className='hidden'/>
                                        <label for="scooter" className='px-4 py-[2px] cursor-pointer'>Scooter</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bicycle"  name="type" value="bicycle" className='hidden'/>
                                        <label for="bicycle" className='px-4 py-[2px] cursor-pointer'>Bicycle</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Select Brand*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <select name="brand" id="" required className='border-[1px]  border-gray-400 rounded-sm w-[150px]'>
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
                                <p className='mb-2 font-semibold text-gray-700'>Model</p>
                                <div className=''>
                                    <input name='model' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Variant</p>
                                <div className='flex gap-2'>
                                    <input name='variant' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Transmission (auto/manual)</p>
                                <div className='flex gap-2'>
                                    <input name='transmission' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Fuel</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <select name="fuel" id="" required className='border-[1px]  border-gray-400 rounded-sm w-[150px]'>
                                        <option value="petrol">Petrol</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electric">Electric</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="cng">CNG</option>
                                        <option value="lpg">LPG</option>
                                    </select>
                                </div>
                            </div>
                          
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Manufacture  Year*</p>
                                <div className='flex gap-2'>
                                    <input name='registration_year' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            
                            
                            
                           
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Ad Title*</p>
                                <div className='flex gap-2'>
                                    <input name='title' type="text" required className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Describe what you are selling*</p>
                                <div className='flex gap-2'> 
                                    <input name='description' type="text" required className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                           
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Locality*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='locality' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>State*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='state' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Pincode*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='pincode' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price</p>
                                <div className='flex gap-2'>
                                    <input name='price' type="text" required className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='border border-gray-400 rounded-md'>
                                        {selectedImages[index] ? (
                                            <div className='relative'>
                                                <img src={image[index]} alt={`Image ${index}`} className='h-24 rounded-md w-32' />
                                                <button type='button' onClick={() => handleDeleteImage(index)} className='text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold'>X</button>
                                            </div>
                                        ) : (
                                            <label htmlFor={`file-${index}`} className='cursor-pointer h-24 w-32  flex justify-center items-center'>
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
                        }
                        {second_hand == 1 && 
                            <form action="" className='flex flex-col gap-8' onSubmit={formSubmitHandler}>
                            <h3 className='mb-2 text-center md:text-left font-semibold text-xl'>Add Some Details</h3>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Vehicle Type*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car"  name="type" value="car" className='hidden'/>
                                        <label for="car" className='px-4 py-[2px] cursor-pointer'>Car</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="motorcycle"  name="type" value="motorcycle" className='hidden'/>
                                        <label for="motorcycle" className='px-4 py-[2px] cursor-pointer'>Motorcycle</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="scooter"  name="type" value="scooter" className='hidden'/>
                                        <label for="scooter" className='px-4 py-[2px] cursor-pointer'>Scooter</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bicycle"  name="type" value="bicycle" className='hidden'/>
                                        <label for="bicycle" className='px-4 py-[2px] cursor-pointer'>Bicycle</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Select Brand*</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <select name="brand" id="" required className='border-[1px]  border-gray-400 rounded-sm w-[150px]'>
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
                                <p className='mb-2 font-semibold text-gray-700'>Model</p>
                                <div className='flex gap-2'>
                                    <input name='model' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Variant</p>
                                <div className='flex gap-2'>
                                    <input name='variant' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Transmission (auto/manual)</p>
                                <div className='flex gap-2'>
                                    <input name='transmission' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Fuel</p>
                                <div className='flex gap-2 text-gray-700'>
                                    <select name="fuel" id="" required className='border-[1px]  border-gray-400 rounded-sm w-[150px]'>
                                        <option value="petrol">Petrol</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electric">Electric</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="cng">CNG</option>
                                        <option value="lpg">LPG</option>
                                    </select>
                                </div>
                            </div>
                            
                          
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Registration Year*</p>
                                <div className='flex gap-2'>
                                    <input name='registration_year' required type="text" className='w-[85vw] md:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Kilometer Driven*</p>
                                <div className='flex gap-2'>
                                    <input name='kilometer_driven' required type="text" className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                           
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Ad Title*</p>
                                <div className='flex gap-2'>
                                    <input name='title' type="text" required className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Describe what you are selling*</p>
                                <div className='flex gap-2'> 
                                    <input name='description' type="text" required className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                           
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Locality*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='locality' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>State*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='state' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Pincode*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='pincode' required className='w-[85vw] md:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price</p>
                                <div className='flex gap-2'>
                                    <input name='price' type="text" required className='w-[85vw] md:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4  mb-4 text-xl text-gray-700'>Upload upto 20 photos</h3>
                                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700'>
                                {[...Array(20)].map((_, index) => (
                                    <div key={index} className='border border-gray-400 rounded-md'>
                                        {selectedImages[index] ? (
                                            <div className='relative'>
                                                <img src={image[index]} alt={`Image ${index}`} className='h-24 w-32 rounded-md' />
                                                <button type='button' onClick={() => handleDeleteImage(index)} className='text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold'>X</button>
                                            </div>
                                        ) : (
                                            <label htmlFor={`file-${index}`} className='cursor-pointer h-24 w-32 flex justify-center items-center'>
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
                        }
                        
                    </div>
                </div>
            </section>

   </>
  )
}

export default VehicleAdForm