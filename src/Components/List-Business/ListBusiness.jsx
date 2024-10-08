import React, { useState, useEffect } from 'react';
import ProductCard from '../Cards/ProductCard';
import Button from '../Button/Button';
import axiosInstance from '../../api/axiosInstance';
import HospitalCard from '../Cards/HospitalCard';
import BusinessCard from '../Cards/BusinessCard';
import Categories from '../Categories/Categories';

const ListBusiness = () => {
  const [latestData, setLatestData] = useState([]);
  console.log('latestData---', latestData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLatestAds();
  }, [page]);

  const fetchLatestAds = () => {
    setLoading(true);
    axiosInstance
      .get(`api/business/list?limit=12&page=${page}`)
      .then((response) => {
        const data = response.data.data.business;
        if (data.length > 0) {
          setLatestData((prevData) => [...prevData, ...data]);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Categories />
      <section className="lg:px-12 px-4 mb-8">
        {/* <h2 className="sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4">
        Business Listed Ads
      </h2> */}

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4">
          {latestData.map((item, index) => (
            <div key={index}>
              <BusinessCard
                data={item}
                key={item.id}
                link={'/BusinessDetails'}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {!loading && hasMore && (
            <button
              onClick={handleLoadMore}
              className="px-32 py-4 font-bold bg-blue-500 text-white rounded-md bg-gradient-to-r from-violet-900 to-blue-500 transition-colors duration-300"
            >
              Load More
            </button>
          )}
          {!hasMore && (
            <button className="px-32 py-4 font-bold bg-blue-500 text-white rounded-md bg-gradient-to-r from-violet-900 to-blue-500 transition-colors duration-300">
              No more ads to load.
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default ListBusiness;
