import React, { useState, useEffect } from 'react';
import ProductCard from '../Cards/ProductCard';
import Button from '../Button/Button';
import axiosInstance from '../../api/axiosInstance';
import HospitalCard from '../Cards/HospitalCard';

const LatestAds = () => {
  const [latestData, setLatestData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchLatestAds();
  }, [page]);

  const fetchLatestAds = () => {
    setLoading(true);
    axiosInstance
      .get(`api/home/latest?limit=12&page=${page}`)
      .then((response) => {
        const data = response.data.data.advertisements;
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
    <section className="lg:px-12 px-4 mb-8">
      <h2 className="sm:font-bold text-xl font-semibold sm:text-2xl mb-2 sm:mb-4">
        Latest Ads
      </h2>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 md:gap-4">
        {latestData.map((item, index) => (
          <div key={index}>
            {item.advType === 'Property' && (
              <ProductCard
                data={item}
                key={item.id}
                link={'/propertiesdetails'}
              />
            )}
            {item.advType === 'Vehicle' && (
              <ProductCard data={item} key={item.id} link={'/vehicledetails'} />
            )}
            {item.advType === 'Education' && (
              <ProductCard
                data={item}
                key={item.id}
                link={'/educationdetails'}
              />
            )}
            {item.advType === 'Hospitality' && (
              <ProductCard
                data={item}
                key={item.id}
                link={'/hospitalitydetails'}
              />
            )}
            {item?.advType === 'Doctor' && (
              <ProductCard data={item} key={item.id} link={'/doctordetails'} />
            )}
            {item?.advType === 'Hospital' && (
              <HospitalCard
                data={item}
                key={item.id}
                link={'/hospitaldetails'}
              />
            )}
          </div>
        ))}
      </div>

      {loading && <div className="text-center mt-6">Loading...</div>}

      <div className="flex justify-center mt-6">
        {!loading && hasMore && (
          <Button clickHandler={handleLoadMore} category={'primarybtn'}>
            Load More
          </Button>
        )}
        {!hasMore && <p className="text-gray-500">No more ads to load.</p>}
      </div>
    </section>
  );
};

export default LatestAds;
