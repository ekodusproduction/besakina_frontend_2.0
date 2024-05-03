import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import AdCard from "../Cards/AdCard";
import Lottie from "lottie-react";
import notFoundAnimation from "../../../public/assets/no-found.json";
import { useNavigate } from "react-router-dom";

const MyListing = () => {
  const [userAds, setUserAds] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get("api/users/myads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserAds(response?.data?.data);
      });
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center shadow rounded">
      {userAds?.length===0 ? (
        <div className="w-56 flex flex-col items-center justify-center pb-2">
          <Lottie animationData={notFoundAnimation} loop={true} />
          <p onClick={()=>navigate("/postad")} className="text-base text-gray-800 font-bold p-2 border-2 cursor-pointer">Post an Advertisement</p>
        </div>
      ) : (
        <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4">
          {userAds?.map((item) => (
            <AdCard data={item} key={item.id} link={"/propertiesdetails"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListing;
