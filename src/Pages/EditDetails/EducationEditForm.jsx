import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { FaCamera } from 'react-icons/fa';
import '../../styles/style.css';
import Button from '../../Components/Button/Button';
import axiosInstance, { baseURL } from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EducationEditForm = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [image, setImage] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();
  const [educationData, setEducationData] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`api/education/id/${id}`)
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setEducationData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    if (educationData?.images?.length) {
      setSelectedImages((prev) => [
        ...prev, // Spread the previous images
        ...educationData?.images, // Spread the new images fetched from vehicleData
      ]);
    }
  }, [educationData?.images]);

  const handleEditForm = (e, fieldName) => {
    const value = e.target.value;
    setEducationData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

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
      .post(`api/education/images/id/${id}`, formData, {
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
    setSubmitting(true);
    e.preventDefault();
    const data = e.target;
    const value = {};

    for (let i = 0; i < data.length; i++) {
      const { name, value: val } = data[i];
      if (name !== '' && name !== 'car_parking') {
        value[name] = val;
      }
    }

    const body = {
      ...value,
    };
    axiosInstance
      .put(`api/education/id/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
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
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
        });
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
  const imageDeleteHandler = (image) => {
    const body = {
      images: image,
    };
    axiosInstance
      .delete(`api/education/image/delete/id/${id}`, {
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('delete', response);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  return (
    <>
      <section className="bg-white">
        <div>
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
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="graduation"
                      name="type"
                      checked={educationData?.type == 'graduation'}
                      onChange={(e) => handleEditForm(e, 'type')}
                      value="graduation"
                      className="hidden"
                    />
                    <label
                      for="graduation"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Graduation
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="diploma"
                      name="type"
                      checked={educationData?.type == 'diploma'}
                      onChange={(e) => handleEditForm(e, 'type')}
                      value="diploma"
                      className="hidden"
                    />
                    <label
                      for="diploma"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Diploma
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="certification"
                      name="type"
                      checked={educationData?.type == 'certification'}
                      onChange={(e) => handleEditForm(e, 'type')}
                      value="certification"
                      className="hidden"
                    />
                    <label
                      for="certification"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Certification
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="tuition/coaching"
                      name="type"
                      checked={educationData?.type == 'tuition/coaching'}
                      onChange={(e) => handleEditForm(e, 'type')}
                      value="tuition/coaching"
                      className="hidden"
                    />
                    <label
                      for="tuition/coaching"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Tuition/Coaching
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="sports-center"
                      name="type"
                      checked={educationData?.type == 'sports-center'}
                      onChange={(e) => handleEditForm(e, 'type')}
                      value="sports-center"
                      className="hidden"
                    />
                    <label
                      for="sports-center"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Sports Center
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">
                  Select Domain*
                </p>
                <div className="flex flex-wrap gap-2 text-gray-700">
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="science"
                      name="domain"
                      checked={educationData?.domain == 'science'}
                      onChange={(e) => handleEditForm(e, 'domain')}
                      value="science"
                      className="hidden"
                    />
                    <label
                      for="science"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Science
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="arts"
                      name="domain"
                      checked={educationData?.domain == 'arts'}
                      onChange={(e) => handleEditForm(e, 'domain')}
                      value="arts"
                      className="hidden"
                    />
                    <label for="arts" className="px-4 py-[2px] cursor-pointer">
                      Arts
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="commerce"
                      name="domain"
                      checked={educationData?.domain == 'commerce'}
                      onChange={(e) => handleEditForm(e, 'domain')}
                      value="commerce"
                      className="hidden"
                    />
                    <label
                      for="commerce"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Commerce
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="computer_science"
                      name="domain"
                      checked={educationData?.domain == 'computer_science'}
                      onChange={(e) => handleEditForm(e, 'domain')}
                      value="computer_science"
                      className="hidden"
                    />
                    <label
                      for="computer_science"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Computer Science
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="cooking"
                      name="domain"
                      value="cooking"
                      checked={educationData?.domain == 'cooking'}
                      onChange={(e) => handleEditForm(e, 'domain')}
                      className="hidden"
                    />
                    <label
                      for="cooking"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Cooking
                    </label>
                  </div>
                  <div className="border-[1px] border-gray-400 rounded-sm">
                    <input
                      type="radio"
                      id="electronics"
                      name="domain"
                      checked={educationData?.domain == 'electronics'}
                      onChange={(e) => handleEditForm(e, 'domain')}
                      value="electronics"
                      className="hidden"
                    />
                    <label
                      for="electronics"
                      className="px-4 py-[2px] cursor-pointer"
                    >
                      Electronics
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 font-semibold text-gray-700">
                  Name of Institution*
                </p>
                <div className="flex gap-2">
                  <input
                    name="institution_name"
                    required
                    type="text"
                    value={educationData?.institution_name}
                    onChange={(e) => handleEditForm(e, 'institution_name')}
                    className="w-[90vw] sm:w-[50vw] border-[1px] pl-2 border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">
                  Course Duration (In months)*
                </p>
                <div className="flex gap-2">
                  <input
                    name="course_duration"
                    required
                    type="number"
                    value={educationData?.course_duration}
                    onChange={(e) => handleEditForm(e, 'course_duration')}
                    className="w-[90vw] sm:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">Ad Title*</p>
                <div className="flex gap-2">
                  <input
                    name="title"
                    type="text"
                    value={educationData?.title}
                    onChange={(e) => handleEditForm(e, 'title')}
                    required
                    className="w-[90vw] sm:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">
                  Describe about the course*
                </p>
                <div className="flex gap-2">
                  <input
                    name="description"
                    type="text"
                    value={educationData?.description}
                    onChange={(e) => handleEditForm(e, 'description')}
                    required
                    className="w-[90vw] sm:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">Street*</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="street"
                    value={educationData?.street}
                    onChange={(e) => handleEditForm(e, 'street')}
                    required
                    className="w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">Locality*</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="locality"
                    value={educationData?.locality}
                    onChange={(e) => handleEditForm(e, 'locality')}
                    required
                    className="w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">City*</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="city"
                    value={educationData?.city}
                    onChange={(e) => handleEditForm(e, 'city')}
                    required
                    className="w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 font-semibold text-gray-700">State*</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="state"
                    value={educationData?.state}
                    onChange={(e) => handleEditForm(e, 'state')}
                    required
                    className="w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 font-semibold text-gray-700">Pincode*</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="pincode"
                    value={educationData?.pincode}
                    onChange={(e) => handleEditForm(e, 'pincode')}
                    required
                    className="w-[90vw] sm:w-[50vw] border-[1px] border-gray-400 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold mt-4 mb-2 text-xl ">Set a price</h3>
                <p className="mb-2 font-semibold text-gray-700">Price</p>
                <div className="flex gap-2">
                  <input
                    name="price"
                    type="text"
                    value={educationData?.price}
                    onChange={(e) => handleEditForm(e, 'state')}
                    required
                    className="w-[90vw] sm:w-[50vw] pl-2 border-[1px] border-gray-400 py-2 rounded-md"
                    onkeypress="return event.charCode != 45"
                  />
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

export default EducationEditForm;
