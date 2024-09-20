import React, { useState, useEffect } from 'react';
import Button from '../Components/Button/Button';
import { FaAngleRight } from 'react-icons/fa6';
import axiosInstance from '../api/axiosInstance';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('api/plans', {
        header: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPlans(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {plans?.length ? (
        <>
          <div className="text-center pt-16">
            <h2 className="text-2xl font-bold">Choose your package</h2>
          </div>
          <div className="p-4 grid grid-cols-3 gap-12 px-20 py-12">
            {plans?.map((item, index) => {
              console.log('pricing---', item);
              return (
                <div
                  key={index}
                  className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
                >
                  <div className="flex flex-col items-center justify-center">
                    <h4 className="text-2xl font-bold">
                      {item.type == 'Featured Advertisement' ? '' : '₹ '}
                      {item?.price && item.type == 'Featured Advertisement'
                        ? 'Contact us for pricing'
                        : item.price}
                    </h4>
                    {/* ${item?.type === "Silver" ? "bg-[#C0C0C0]" : (item?.type==="Gold" ? "bg-[#FFD700]":(item?.type==="Platinum" && "bg-[#F41B3B]")) } } */}

                    <p
                      className={`w-fit text-black font-bold rounded px-2 py-[2px] mt-2`}
                    >
                      {item?.type}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                      <div>
                        <IoIosCheckmarkCircle color="#43f746" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Number of Ads can be posted: {item?.no_of_ads}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <IoIosCheckmarkCircle color="#43f746" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Post Duration: {item?.validity}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div>
                        <IoIosCheckmarkCircle color="#43f746" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Membership Badge: {item?.type}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <IoIosCheckmarkCircle color="#43f746" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Contact buyers on our website: {item?.contact_limit}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <IoIosCheckmarkCircle color="#43f746" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Search Priority: {item?.search_priority}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button classItems={'w-full'} category={'primarybtn'}>
                      Purchase
                    </Button>
                  </div>
                </div>
              );
            })}

            {/* <div className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4">
          <div>
            <p className="text-4xl font-bold">₹ {plans[1]?.price}</p>
            <p className="bg-[#FFD700] w-fit text-white rounded px-2 py-[2px] mt-2">
              Gold
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">3 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
          </div>
          <div>
            <Button classItems={"w-full"} category={"primarybtn"}>
              Purchase
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4">
          <div>
            <p className="text-4xl font-bold">₹ {plans[2]?.price}</p>
            <p className="bg-[#F41B3B] w-fit text-white rounded px-2 py-[2px] mt-2">
              Platinum
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <FaAngleRight color="#F41B3B" />
              </div>
              <p className="text-sm text-gray-700">1 post</p>
            </div>
          </div>
          <div>
            <Button classItems={"w-full"} category={"primarybtn"}>
              Purchase
            </Button>
          </div>
        </div> */}
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <p className="text-xl font-bold">
            Sorry there is no plans right now..
          </p>
          <p className="text-xl font-bold text-blue-600">
            Please visit after some time
          </p>
          <button
            onClick={() => navigate('/')}
            className="border-2 py-1 px-4 mt-2 font-medium border-blue-400 rounded-md"
          >
            Go back to Home
          </button>
        </div>
      )}
    </>
  );
};

export default Plans;
