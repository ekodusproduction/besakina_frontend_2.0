import React, { useState, useEffect } from 'react';
import ProductCard from '../Cards/ProductCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import axiosInstance from '../../api/axiosInstance';
import HospitalCard from '../Cards/HospitalCard';

const FeaturedAds = () => {
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`api/home/latest?limit=10&page=1`)
      .then((response) => {
        const data = response.data.data.advertisements;
        setFeaturedData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="lg:px-12 px-4 mb-8">
      <h2 className="sm:font-bold text-xl font-bold sm:text-2xl sm:mb-4 text-left mt-5 mb-5 text-gray-800">
        Featured Ads
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Splide
          options={{
            perPage: 4,
            gap: '1.5rem',
            breakpoints: {
              1100: {
                perPage: 3,
              },
              800: {
                perPage: 2,
              },
              576: {
                gap: '0.5rem',
              },
            },
            pagination: false,
          }}
          aria-label="Featured Ads"
        >
          {featuredData.map((item) => (
            <SplideSlide key={item._id}>
              {item.advType === 'Property' && (
                <ProductCard
                  data={item}
                  link={'/propertiesdetails'}
                  className="transition-transform duration-200 hover:scale-105 rounded-lg shadow-xl border border-gray-200"
                />
              )}
              {item.advType === 'Vehicle' && (
                <ProductCard
                  data={item}
                  link={'/vehicledetails'}
                  className="transition-transform duration-200 hover:scale-105 rounded-lg shadow-xl border border-gray-200"
                />
              )}
              {item.advType === 'Education' && (
                <ProductCard
                  data={item}
                  link={'/educationdetails'}
                  className="transition-transform duration-200 hover:scale-105 rounded-lg shadow-xl border border-gray-200"
                />
              )}
              {item.advType === 'Hospitality' && (
                <ProductCard
                  data={item}
                  link={'/hospitalitydetails'}
                  className="transition-transform duration-200 hover:scale-105 rounded-lg shadow-xl border border-gray-200"
                />
              )}
              {item.advType === 'Doctor' && (
                <ProductCard
                  data={item}
                  link={'/doctordetails'}
                  className="transition-transform duration-200 hover:scale-105 rounded-lg shadow-xl border border-gray-200"
                />
              )}
              {item.advType === 'Hospital' && (
                <HospitalCard
                  data={item}
                  link={'/hospitaldetails'}
                  className="transition-transform duration-200 hover:scale-105 rounded-lg shadow-xl border border-gray-200"
                />
              )}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default FeaturedAds;
