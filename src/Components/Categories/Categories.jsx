import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BsBuildingsFill } from 'react-icons/bs';
import { FaHome } from "react-icons/fa";
import { ImBooks } from 'react-icons/im';
import { FaCar } from 'react-icons/fa';
import { FaHospital } from 'react-icons/fa';
import { RiHealthBookFill } from 'react-icons/ri';
import { MdOutlineAddBusiness } from 'react-icons/md';

const Categories = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth <= 1024) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);
  return (
    <section
      className={`${
        isMenuOpen ? 'flex-col' : 'items-center gap-8 max-w-[1450px] m-auto'
      } lg:px-12 px-2 xsm:px-4 py-4 flex`}
    >
      <button
        onClick={toggleMenu}
        className="items-center justify-between bg-gradient-to-r from-violet-900 to-blue-500 text-white rounded-md px-4 py-[12px] w-[50px] block sm:hidden"
      >
        <RxHamburgerMenu size={20} color="white" />
      </button>

      <nav
        className={`${
          isMenuOpen ? 'block animate-slideDown' : 'hidden'
        } lg:block w-full`}
      >
        <ul className={`${isMenuOpen ? 'flex-col gap-4 pt-5' : 'gap-4'} flex`}>
          <li>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white border-slate-400 p-3 rounded-md"
            >
             <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/properties"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white border-slate-400 p-3 rounded-md"
            >
              <BsBuildingsFill />
              Properties
            </Link>
          </li>
          <li>
            <Link
              to="/education"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white  border-slate-400 p-3 rounded-md"
            >
              <ImBooks />
              Education
            </Link>
          </li>
          <li>
            <Link
              to="/vehicles"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white  border-slate-400 p-3 rounded-md"
            >
              <FaCar />
              Vehicles
            </Link>
          </li>
          <li>
            <Link
              to="/hospitality"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white  border-slate-400 p-3 rounded-md"
            >
              <FaHospital />
              Hospitality
            </Link>
          </li>
          <li>
            <Link
              to="/healthcare"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white  border-slate-400 p-3 rounded-md"
            >
              <RiHealthBookFill />
              Healthcare
            </Link>
          </li>
          <li>
            <Link
              to="/ListBusiness"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-900 to-blue-500  font-semibold text-white  border-slate-400 p-3 rounded-md"
            >
              <MdOutlineAddBusiness />
              List-Business
            </Link>
          </li>
          {/* <li><Link to="/hospitals" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Hospitals</Link></li> */}
        </ul>
      </nav>
    </section>
  );
};

export default Categories;
