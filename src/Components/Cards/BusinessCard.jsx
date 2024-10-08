import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { baseURL } from '../../api/axiosInstance';
import dayjs from 'dayjs';
import { formatDate } from '../../utils/fornatter';
import { FaEye } from 'react-icons/fa';

const BusinessCard = ({ data, link }) => {
  console.log('data---', data);
  function convertString(str) {
    // Replace underscores with spaces
    return str.replace(/_/g, ' ');
  }

  return (
    <Link to={`${link}/${data?._id}`}>
      <div className="border-[1px] border-slate-300 rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-105 max-h-80">
        {/* Image section */}
        <div className="h-[150px] sm:h-[200px] bg-gray-100">
          <img
            src={`${data?.images[0]}`}
            alt="image"
            className="h-full w-full object-cover rounded-t-lg transition-transform duration-500 ease-out hover:scale-105"
          />
        </div>

        {/* Content section */}
        <div className="p-1 flex flex-col gap-3">
          {/* Title and Type */}
          <div>
            <div>
              <p className="xl:text-base capitalize font-bold text-gray-800 line-clamp-1 transition-all duration-500 ease-out">
                {data?.name ? data?.name : data?.title}
              </p>

              <div className="flex flex-row justify-between">
                <h2 className="text-sm capitalize font-medium text-gray-600 transition-all duration-500 ease-out">
                  {data?.category ? convertString(data?.category) : data?.category}
                </h2>
                <p className="flex flex-row ">
                  <FaEye className="mt-1 mr-1" />
                  {data.views}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-[3px] text-gray-600 transition-all duration-500 ease-out">
            <FaLocationDot className="text-gray-800" />
            <p className="font-semibold text-xs xl:text-sm transition-all duration-500 ease-out">
              {`${data?.street}, ${data?.state}`.length > 25
                ? `${data?.street}, ${data?.state}`.slice(0, 25) + '...'
                : `${data?.street}, ${data?.state}`}
            </p>
          </div>

          {/* Footer with verification and date */}
          <div className="flex justify-between items-center transition-all duration-500 ease-out">
            <div className="flex items-center gap-[3px] text-[#179CF0]">
              <MdVerified className="text-green-500" />
              <p className="text-sm font-bold">Verified</p>
            </div>
            <p className="text-xs font-bold text-gray-500">
              {formatDate(data?.created_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
