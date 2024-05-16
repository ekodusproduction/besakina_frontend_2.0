import React,{useEffect, useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaCamera } from "react-icons/fa";
import Button from '../../Components/Button/Button';
import '../../styles/style.css'
import axiosInstance, { baseURL } from '../../api/axiosInstance'
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const PropertyEditForm = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [image, setImage] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState({});

    useEffect(() => {
        axiosInstance.get(`api/property/id/${id}`)
            .then((response) => {
                console.log(response);
                const data = response.data.data.advertisement;
                setPropertyData(data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id]);

    useEffect(() => {
        if (propertyData?.images?.length) {
          setSelectedImages((prev) => [
            ...prev, // Spread the previous images
            ...propertyData?.images, // Spread the new images fetched from vehicleData
          ]);
        }
      }, [propertyData?.images]);

    const imageHandler = (e) => {
        if (selectedImages?.length >= 20) {
          Swal.fire({
            title: 'Error',
            text: 'You can upload photos upto 20',
            icon: 'error',
          });
          return;
        }
        const file = e.target.files[0];
    
        if (!file) {
          console.error('No file selected');
          return;
        }
        const formData = new FormData();
        formData.append('image', file);
    
        axiosInstance
          .post(`api/property/images/id/${id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (Array.isArray(response.data)) {
              setSelectedImages((prev) => [
                ...prev, // Spread the previous images
                ...response.data[0], // Spread the new images fetched from vehicleData
              ]);
            } else {
              // Handle non-array response data
              setSelectedImages((prev) => [
                ...prev,
                response?.data?.data[0], // Assuming response data is a single image object
              ]);
            }
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      };
    const formSubmitHandler = (e) => {
        setSubmitting(true)
        e.preventDefault();
        const data = e.target;
        const value = {};

        for (let i = 0; i < data.length; i++) {
            const { name, value: val } = data[i];
            if (name !== "" && name !=="car_parking") {
                value[name] = val;
            }
        }
       
        const body = {
            ...value,
            car_parking: propertyData?.car_parking,
        }
        axiosInstance.put(`api/property/id/${id}`, body , {
            headers: {
                'Content-Type': 'application/json',
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

    const imageDeleteHandler = (image) => {
        const body = {
            images:image,
        }

        axiosInstance.delete(`api/property/images/delete/id/${id}`, {
            data: body,
            headers: {
                Authorization : `Bearer ${token}`,
            }
        })
        .then((response) => {
            console.log("delete", response);
        })
        .catch((error) => {
            console.error("Error: ",error)
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
    
    const handleEditForm = (e, fieldName) => {
        const value = e.target.value;
        setPropertyData((prevState) => ({
            ...prevState,
            [fieldName] : value,
        }))
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
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="apartments" checked={propertyData?.type ==="apartments"} onChange={(e)=>handleEditForm(e,"type")} name="type" value="apartments" className='hidden'/>
                                        <label for="apartments" className='px-4 py-[2px] cursor-pointer'>Apartments</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="builder_floor" checked={propertyData?.type ==="builder_floor"} onChange={(e)=>handleEditForm(e,"type")} name="type" value="builder_floor" className='hidden'/>
                                        <label for="builder_floor" className='px-4 py-[2px] cursor-pointer'>Builder Floors</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="farm_houses" name="type" checked={propertyData?.type ==="farm_houses"} onChange={(e)=>handleEditForm(e,"type")} value="farm_houses" className='hidden'/>
                                        <label for="farm_houses" className='px-4 py-[2px] cursor-pointer'>Farm Houses</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="houses_villas" name="type" checked={propertyData?.type ==="houses_villas"} onChange={(e)=>handleEditForm(e,"type")} value="houses_villas" className='hidden'/>
                                        <label for="houses_villas" className='px-4 py-[2px] cursor-pointer'>Houses & Villas</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Bedrooms*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_1" name="bedrooms" checked={propertyData?.bedrooms==1} onChange={(e)=>handleEditForm(e,"bedrooms")} value="1" className='hidden'/>
                                        <label for="bedroom_no_1" className='px-4 py-[2px] cursor-pointer'>1</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_2" name="bedrooms" checked={propertyData?.bedrooms==2} onChange={(e)=>handleEditForm(e,"bedrooms")} value="2" className='hidden'/>
                                        <label for="bedroom_no_2" className='px-4 py-[2px] cursor-pointer'>2</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_3" name="bedrooms" checked={propertyData?.bedrooms==3} onChange={(e)=>handleEditForm(e,"bedrooms")} value="3" className='hidden'/>
                                        <label for="bedroom_no_3" className='px-4 py-[2px] cursor-pointer'>3</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bedroom_no_4" name="bedrooms" checked={propertyData?.bedrooms==4} onChange={(e)=>handleEditForm(e,"bedrooms")} value="4" className='hidden'/>
                                        <label for="bedroom_no_4" className='px-4 py-[2px] cursor-pointer'>4</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Bathroom*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_1" name="bathrooms" checked={propertyData?.bathrooms==1} onChange={(e)=>handleEditForm(e,"bathrooms")} value="1" className='hidden'/>
                                        <label for="bathroom_no_1" className='px-4 py-[2px] cursor-pointer'>1</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_2" name="bathrooms" checked={propertyData?.bathrooms==2} onChange={(e)=>handleEditForm(e,"bathrooms")} value="2" className='hidden'/>
                                        <label for="bathroom_no_2" className='px-4 py-[2px] cursor-pointer'>2</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_3" name="bathrooms" checked={propertyData?.bathrooms==3} onChange={(e)=>handleEditForm(e,"bathrooms")} value="3" className='hidden'/>
                                        <label for="bathroom_no_3" className='px-4 py-[2px] cursor-pointer'>3</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="bathroom_no_4" name="bathrooms" checked={propertyData?.bathrooms==4} onChange={(e)=>handleEditForm(e,"bathrooms")} value="4" className='hidden'/>
                                        <label for="bathroom_no_4" className='px-4 py-[2px] cursor-pointer'>4</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Furnishing*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="furnished" name="furnishing" checked={propertyData?.furnishing =="furnished"} onChange={(e)=>handleEditForm(e,"furnishing")} value="furnished" className='hidden'/>
                                        <label for="furnished" className='px-4 py-[2px] cursor-pointer'>Furnished</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="semifurnished" name="furnishing" checked={propertyData?.furnishing=="semifurnished"} onChange={(e)=>handleEditForm(e,"furnishing")} value="semifurnished" className='hidden'/>
                                        <label for="semifurnished" className='px-4 py-[2px] cursor-pointer'>Semi-furnished</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="unfurnished" name="furnishing" checked={propertyData?.furnishing =="unfurnished"} onChange={(e)=>handleEditForm(e,"furnishing")} value="unfurnished" className='hidden'/>
                                        <label for="unfurnished" className='px-4 py-[2px] cursor-pointer'>Unfurnished</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Categories*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="1BHK" name="category" value="1BHK" checked={propertyData?.category =="1BHK"} onChange={(e)=>handleEditForm(e,"category")} className='hidden'/>
                                        <label for="1BHK" className='px-4 py-[2px] cursor-pointer'>1BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="2BHK" name="category" value="2BHK" checked={propertyData?.category =="2BHK"} onChange={(e)=>handleEditForm(e,"category")} className='hidden'/>
                                        <label for="2BHK" className='px-4 py-[2px] cursor-pointer'>2BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="3BHK" name="category" value="3BHK" checked={propertyData?.category =="3BHK"} onChange={(e)=>handleEditForm(e,"category")} className='hidden'/>
                                        <label for="3BHK" className='px-4 py-[2px] cursor-pointer'>3BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="4BHK" name="category" value="4BHK" checked={propertyData?.category =="4BHK"} onChange={(e)=>handleEditForm(e,"category")} className='hidden'/>
                                        <label for="4BHK" className='px-4 py-[2px] cursor-pointer'>4BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="5BHK" name="category" checked={propertyData?.category =="5BHK"} onChange={(e)=>handleEditForm(e,"category")} value="5BHK" className='hidden'/>
                                        <label for="5BHK" className='px-4 py-[2px] cursor-pointer'>5BHK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="1RK" name="category" checked={propertyData?.category =="1RK"} onChange={(e)=>handleEditForm(e,"category")} value="1RK" className='hidden'/>
                                        <label for="1RK" className='px-4 py-[2px] cursor-pointer'>1RK</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="HOUSE" name="category" checked={propertyData?.category =="HOUSE"} onChange={(e)=>handleEditForm(e,"category")} value="HOUSE" className='hidden'/>
                                        <label for="HOUSE" className='px-4 py-[2px] cursor-pointer'>HOUSE</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="VILLA" name="category" checked={propertyData?.category =="VILLA"} onChange={(e)=>handleEditForm(e,"category")} value="VILLA" className='hidden'/>
                                        <label for="VILLA" className='px-4 py-[2px] cursor-pointer'>VILLA</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Construction Status*</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="new_launch" name="construction_status" checked={propertyData?.construction_status =="new_launch"} onChange={(e)=>handleEditForm(e,"construction_status")} value="new_launch" className='hidden'/>
                                        <label for="new_launch" className='px-4 py-[2px] cursor-pointer'>New launch</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="under_construction" name="construction_status" hecked={propertyData?.construction_status =="under_construction"} onChange={(e)=>handleEditForm(e,"construction_status")} value="under_construction" className='hidden'/>
                                        <label for="under_construction" className='px-4 py-[2px] cursor-pointer'>Under construction</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="ready_to_move" name="construction_status" hecked={propertyData?.construction_status =="ready_to_move"} onChange={(e)=>handleEditForm(e,"construction_status")} value="ready_to_move" className='hidden'/>
                                        <label for="ready_to_move" className='px-4 py-[2px] cursor-pointer'>Ready to move</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Listed By</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="builder" name="listed_by" checked={propertyData?.listed_by =="builder"} onChange={(e)=>handleEditForm(e,"listed_by")} value="builder" className='hidden'/>
                                        <label for="builder" className='px-4 py-[2px] cursor-pointer'>Builder</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="dealer" name="listed_by" checked={propertyData?.listed_by =="dealer"} onChange={(e)=>handleEditForm(e,"listed_by")} value="dealer" className='hidden'/>
                                        <label for="dealer" className='px-4 py-[2px] cursor-pointer'>Dealer</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="owner" name="listed_by" checked={propertyData?.listed_by =="owner"} onChange={(e)=>handleEditForm(e,"listed_by")} value="owner" className='hidden'/>
                                        <label for="owner" className='px-4 py-[2px] cursor-pointer'>Owner</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Super Builtup Area*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='super_builtup_area' value={propertyData?.super_builtup_area} onChange={(e)=>handleEditForm(e,"super_builtup_area")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Carpet Area*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='carpet_area' value={propertyData?.carpet_area} onChange={(e)=>handleEditForm(e,"carpet_area")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
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
                                    <input type="text" name='total_floors' value={propertyData?.total_floors} onChange={(e)=>handleEditForm(e,"total_floors")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Floor No.</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='floor_no' value={propertyData?.floor_no} onChange={(e)=>handleEditForm(e,"floor_no")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Total Rooms*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='total_rooms' value={propertyData?.total_rooms} onChange={(e)=>handleEditForm(e,"total_rooms")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Car Parking</p>
                                <div className='flex flex-wrap gap-2 text-gray-700'>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_0" name="car_parking" checked={propertyData?.car_parking == "0"} onChange={(e)=>handleEditForm(e,"car_parking")} value="0" className='hidden'/>
                                        <label for="car_parking_no_0" className='px-4 py-[2px]'>0</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_1" name="car_parking" checked={propertyData?.car_parking == "1"} onChange={(e)=>handleEditForm(e,"car_parking")} value="1" className='hidden'/>
                                        <label for="car_parking_no_1" className='px-4 py-[2px]'>1</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_2" name="car_parking" checked={propertyData?.car_parking == "2"} onChange={(e)=>handleEditForm(e,"car_parking")} value="2" className='hidden'/>
                                        <label for="car_parking_no_2" className='px-4 py-[2px]'>2</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_3" name="car_parking" checked={propertyData?.car_parking == "3"} onChange={(e)=>handleEditForm(e,"car_parking")} value="3" className='hidden'/>
                                        <label for="car_parking_no_3" className='px-4 py-[2px]'>3</label>
                                    </div>
                                    <div className='border-[1px] border-gray-400 rounded-sm'>
                                        <input type="radio" id="car_parking_no_4" name="car_parking" checked={propertyData?.car_parking == "4"} onChange={(e)=>handleEditForm(e,"car_parking")} value="4" className='hidden'/>
                                        <label for="car_parking_no_4" className='px-4 py-[2px]'>4</label>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>House Number*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='house_no' value={propertyData?.house_no} onChange={(e)=>handleEditForm(e,"house_no")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Street*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='street' value={propertyData?.street} onChange={(e)=>handleEditForm(e,"street")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>City*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='city' value={propertyData?.city} onChange={(e)=>handleEditForm(e,"city")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Landmark*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='landmark' value={propertyData?.landmark} onChange={(e)=>handleEditForm(e,"landmark")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>State*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='state' value={propertyData?.state} onChange={(e)=>handleEditForm(e,"state")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <p className='mb-2 font-semibold text-gray-700'>Pincode*</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='pincode' value={propertyData?.pincode} onChange={(e)=>handleEditForm(e,"pincode")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-bold mt-4 mb-2 text-xl '>Set a price</h3>
                                <p className='mb-2 font-semibold text-gray-700'>Price</p>
                                <div className='flex gap-2'>
                                    <input type="text" name='price' value={propertyData?.price} onChange={(e)=>handleEditForm(e,"price")} className='w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md' />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700">
                      {selectedImages?.map((image, index) => (
                        <div
                          key={index}
                          className="border border-gray-400 rounded-md"
                        >
                          <div className="relative">
                            <img
                              src={`${image}`}
                              alt="photo"
                              className="h-24 rounded-md w-32"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                handleDeleteImage(index);
                                imageDeleteHandler(image);
                              }}
                              className="text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold"
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="border border-gray-400 rounded-md">
                        <label
                          htmlFor={`file-1`}
                          className="cursor-pointer h-24 w-32  flex justify-center items-center"
                        >
                          <FaCamera size={30} color="gray" />
                        </label>
                        <input
                          type="file"
                          id={`file-1`}
                          accept="image/*"
                          onChange={(e) => imageHandler(e)}
                          className="hidden"
                        />
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

export default PropertyEditForm