import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { FaCamera } from 'react-icons/fa';
import '../../styles/style.css';
import Button from '../../Components/Button/Button';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../Components/BackButton/BackButton';
import {
  Select_Course_Type,
  Select_Domain,
  formFields,
} from '../../data/formConstains';
import { DataContext } from '../../contexts/DataContext';

const EducationAdForm = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [image, setImage] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { storeData, updateData } = useContext(DataContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fillData, setFillData] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state?.state;


  const imageHandler = (e, index) => {
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

          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], files[0].name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              const newImages = [...image];
              newImages[index] = canvas.toDataURL('image/jpeg', 0.5); // Use canvas.toDataURL to get the compressed image
              setImage(newImages);

              setSelectedImages((prev) => {
                const newSelectedImages = [...prev];
                newSelectedImages[index] = compressedFile;
                return newSelectedImages;
              });
            },
            'image/jpeg',
            0.5
          );
        };
      };
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    if (state) {
      setFillData(storeData);
      setSelectedImages(storeData?.images ? storeData?.images : []);
    }
  }, []);

  console.log(storeData);

  // const handleCheckChange = (event) => {
  //     const value = event.target.value;
  //     if (value) {
  //         setSelectedOptions([...selectedOptions, value]);
  //     } else {
  //         setSelectedOptions(selectedOptions.filter(option => option !== value));
  //     }
  // }

  const handleCheckChange = (event) => {
    const selectedValue = event.target.getAttribute('value');
    if (selectedOptions.includes(selectedValue)) {
      // If already selected, remove it
      setSelectedOptions(
        selectedOptions.filter((option) => option !== selectedValue)
      );
    } else {
      // If not selected, add it
      setSelectedOptions([...selectedOptions, selectedValue]);
    }
  };


  const formSubmitHandler = (e) => {
    setSubmitting(true);
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    const formData = { ...value, images: selectedImages };
    axiosInstance
      .post(
        'api/education/add',
        { ...value, images: selectedImages },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: 'Success',
          text: 'The form was successfully submitted',
          icon: 'success',
        });
        setSubmitting(false);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setSubmitting(false);
        Swal.fire({
          title: err?.response?.data?.message,
          // text: err?.response?.data?.message,
          icon: 'warning',
        });
        if (err?.response?.data?.message === 'User Profile Incomplete') {
          updateData(formData);
          navigate('/setup-profile', {
            state: {
              form: '/educationadform',
            },
          });
        }
      });
  };
  const handleDeleteImage = (index) => {
    const newImages = [...image];
    const newSelectedImages = [...selectedImages];
    newImages.splice(index, 1);
    newSelectedImages.splice(index, 1);
    setImage(newImages);
    setSelectedImages(newSelectedImages);
  };

  const handleEditForm = (e, fieldName) => {
    const value = e.target.value;
    setFillData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  

  return (
    <>
      <section className="bg-white">
        <div>
          <BackButton path={-1} style={'absolute pt-3 pl-12'} />
          <p className="text-center py-4 font-semibold text-xl border-b-[1px] border-gray-300">
            POST YOUR AD
          </p>
        </div>
        <div className="flex justify-center p-8 gap-16">
          <div>
            <form
              action=""
              className="flex flex-col gap-8"
              onSubmit={formSubmitHandler}
            >
              <h3 className="mb-2 font-semibold text-xl">Add Some Details</h3>
              <div>
                <p className="mb-2 font-semibold text-gray-700">
                  Select Course Type*
                </p>
                <div className="flex flex-wrap gap-2 text-gray-700">
                  {Select_Course_Type?.map((item, index) => (
                    <div
                      key={index}
                      className="border-[1px] border-gray-400 rounded-sm"
                    >
                      <input
                        type={item.type}
                        id={item.id}
                        name={item.name}
                        value={item.value}
                        checked={fillData && fillData[item.name] === item.value}
                        onChange={(e)=>handleEditForm(e,item.name)}
                        className="hidden"
                      />
                      <label
                        for={item.label}
                        className="px-4 py-[2px] cursor-pointer capitalize"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">
                  Select Domain*
                </p>
                <div className="flex flex-wrap gap-2 text-gray-700">
                  {Select_Domain?.map((item, index) => (
                    <div
                      key={index}
                      className="border-[1px] border-gray-400 rounded-sm cursor-pointer"
                    >
                      {/* <div id="science" onClick={handleCheckChange} value="science" className={`${selectedOptions.includes('science') ? "bg-blue-500 text-white":""} w-20 h-7 flex items-center justify-center select-none`}>Science</div> */}
                      <input
                        type={item.type}
                        id={item.id}
                        name={item.name}
                        value={item.value}
                        checked={fillData && fillData[item.name] === item.value}
                        onChange={(e)=>handleEditForm(e,item.name)}
                        className="hidden"
                      />

                      <label
                        for={item.value}
                        className="px-4 py-[2px] cursor-pointer capitalize"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {formFields?.map((item, index) => (
                <div key={index}>
                {item.secondaryTitle && <h3 className="font-bold mt-4 mb-2 text-xl ">{item.secondaryTitle}</h3>}

                  <p className="mb-2 font-semibold text-gray-700">
                  {item.title} {item.required && '*'}
                  </p>
                  <div className="flex gap-2">
                    <input
                      name={item.name}
                      required={item.required}
                      type={item.type ? item.type : "text"}
                      value={fillData[item.name]}
                      onChange={(e)=>handleEditForm(e,item.name)}
                      className="w-[90vw] sm:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md"
                    />
                  </div>
                </div>
              ))}
              <div>
                <h3 className="font-bold mt-4  mb-4 text-xl text-gray-700">
                  Upload upto 20 photos
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 text-gray-700">
                  {[...Array(20)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center border border-gray-400 rounded-md"
                    >
                      {selectedImages[index] ? (
                        <div className="relative">
                          <img
                            src={image[index]}
                            alt={`Image ${index}`}
                            className="h-24 w-24 rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="text-[#f58181] p-[2px] shadow-md rounded absolute top-[2px] right-[2px] text-sm font-bold"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor={`file-${index}`}
                          className="cursor-pointer h-24 w-24 flex justify-center items-center"
                        >
                          <FaCamera size={30} color="gray" />
                        </label>
                      )}
                      <input
                        type="file"
                        id={`file-${index}`}
                        accept="image/*"
                        onChange={(e) => imageHandler(e, index)}
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  category={'primarybtn'}
                  type={'submit'}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting' : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationAdForm;