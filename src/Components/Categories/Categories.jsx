import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
        <section className='lg:px-12 px-2 xsm:px-4 py-4 flex gap-8 items-center max-w-[1450px] m-auto'>
                <button className='flex items-center justify-between bg-[#1A5C96] text-white rounded-md px-4 py-[12px] w-[200px] sm:w-[250px]'>
                      <span className='flex items-center gap-2 text-sm sm:text-base'><RxHamburgerMenu size={20}/> All Categories</span>
                      <MdNavigateNext size={25}/>
                </button>
                <nav className='hidden lg:block'>
                    <ul className='flex gap-4'>
                        <li><Link to="/properties" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Properties</Link></li>
                        <li><Link to="/education" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Education</Link></li>
                        <li><Link to="/vehicles" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Vehicles</Link></li>
                        <li><Link to="/hospitality" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Hospitality</Link></li>
                        <li><Link to="/healthcare" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Healthcare</Link></li>
                        {/* <li><Link to="/hospitals" className='border-[1px] border-slate-400 px-2 py-[2px] rounded-md'>Hospitals</Link></li> */}
                    </ul>
                </nav>
        </section>
  )
}

export default Categories