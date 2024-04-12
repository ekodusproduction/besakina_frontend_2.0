import React, { useState,useEffect } from 'react'
import Button from '../Button/Button'
import { FaCamera } from "react-icons/fa";
import axiosInstance from '../../api/axiosInstance'
import Swal from 'sweetalert2';


const AddProfile = () => {
    const [plans,setPlans] = useState([]);
    const token = localStorage.getItem('token');
    const [submitting, setSubmitting] = useState(false);
    const [isAadhar, setIsAadhar] = useState(false);

    useEffect(()=> {
        axiosInstance.get('api/plans', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            setPlans(response.data.data.plans)
        })
        .catch(error => {
            console.error(error);
        });
    },[]);

    const docTypehandler = (e) => {
        if(e.target.value=='aadhar'){
            setIsAadhar(true)
        }
        
        else{
            setIsAadhar(false)
        }
    }

    const profileSubmitHandler = (e) => {
        setSubmitting(true)
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
       
        axiosInstance.post('api/users/details', value , {
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
                text: err.response.data.message,
                icon: "error"
              });
          })

    }
  return (
    <form className='w-full bg-white rounded shadow p-6' onSubmit={profileSubmitHandler}>
            <h2 className='font-bold mb-6 text-xl'>My Profile</h2>
            <div className='grid sm:grid-cols-2 gap-8'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="firstname" className='text-gray-500 text-sm'>Full Name</label>
                    <input id='firstname' type="text" placeholder='Full Name' name='fullname' className='border border-gray-200 rounded' />
                </div>
                
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-gray-500 text-sm'>Email ID</label>
                    <input id='email' type="text" placeholder='Email ID' name='email' className='border border-gray-200 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="mobile" className='text-gray-500 text-sm'>Mobile</label>
                    <input id='mobile' type="text" placeholder='Mobile' name='mobile' className='border border-gray-200 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="state" className='text-gray-500 text-sm'>State</label>
                    <input id='state' type="text" placeholder='State' name='state' className='border border-gray-200 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="city" className='text-gray-500 text-sm'>City</label>
                    <input id='city' type="text" placeholder='City' name='city' className='border border-gray-200 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="address" className='text-gray-500 text-sm'>Locality</label>
                    <input id='address' type="text" placeholder='Address' name='locality' className='border border-gray-200 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="pincode" className='text-gray-500 text-sm'>Pincode</label>
                    <input id='pincode' type="text" placeholder='Pincode' name='pincode' className='border border-gray-200 rounded' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="plans" className='text-gray-500 text-sm'>Select Plan</label>
                    <select name="plan_id" id="plans" className='border border-gray-200 rounded text-gray-500'>
                            <option value="" disabled>Select Plan</option>
                            {plans.length>0 && plans.map((item)=> (
                                <option value={item.id} key={item.id}>{item.type}</option>
                            ))}
                    </select>
                </div>
                
                <div>
                    <p className='text-gray-500 text-sm mb-2'>Upload Profile Picture*</p>
                    <div className='border border-gray-400 rounded-md'>
                        <label htmlFor='profile' className='cursor-pointer py-8 flex justify-center items-center'>
                            <FaCamera size={30} color='gray'/>
                        </label>
                        <input id='profile' type="file" accept="image/*" name='profile_pic'  className='hidden' />
                    </div>
                </div>
           
               
            </div>
            
            <div className='grid sm:grid-cols-2 gap-6 my-8'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    <label htmlFor="doc_type" className='text-gray-500 text-sm'>Select Document Type</label>
                        <select name="doc_type" id="doc_type" className='border border-gray-200 rounded text-gray-500' onChange={docTypehandler}>
                            <option value="" disabled>Select Document Type</option>
                            <option value="pan">PAN Card</option>
                            <option value="aadhar" >Aadhar Card</option>
                            <option value="gst">GST Document</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="doc_no" className='text-gray-500 text-sm'>PAN/GST/Aadhar No</label>
                        <input id='doc_no' type="text" placeholder='PAN/GST/Aadhar No' name='doc_number' className='border border-gray-200 rounded' />
                    </div>
                </div>
                <div>
                    <p className='text-gray-500 text-sm mb-2'>Upload Document*</p>
                    <div className='border border-gray-400 rounded-md'>
                        <label htmlFor='document'  className='cursor-pointer py-8 flex justify-center items-center'>
                            <FaCamera size={30} color='gray'/>
                        </label>
                        <input id='document' type="file" accept="image/*" name='doc_file'  className='hidden' />
                    </div>
                </div>
                {isAadhar && <div>
                    <p className='text-gray-500 text-sm mb-2'>Upload Document*</p>
                    <div className='border border-gray-400 rounded-md'>
                        <label htmlFor='document'  className='cursor-pointer py-8 flex justify-center items-center'>
                            <FaCamera size={30} color='gray'/>
                        </label>
                        <input id='document' type="file" accept="image/*" name='doc_file_back'  className='hidden' />
                    </div>
                </div>}
            </div>
            
            <div className='flex flex-col gap-2 my-8'>
                <label htmlFor="about" className='text-gray-500 text-sm'>About</label>
                <textarea placeholder='Describe about yourself/company' name="about" id="about" cols="20" rows="5" className=' p-2 border border-gray-200 rounded'></textarea>
            </div>
            <div className='flex justify-end pt-4'>
            <Button category={'primarybtn'} type={'submit'} disabled={submitting}>{submitting? 'Submitting':'Submit'}</Button>
            </div>
        </form>
  )
}

export default AddProfile