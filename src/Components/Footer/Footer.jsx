import React from 'react'

const Footer = () => {
  return (
   <footer>
        <section className='bg-[#1A5C96] px-4 md:px-12 py-12 flex lg:flex-row flex-col justify-start gap-6 lg:gap-20 text-white'>
            <div className='w-[220px]'>
                <img src="/logo.png" alt="" className='w-[150px] filter grayscale' />
                <p className='mt-4'>BesaKina.com is a Direct Mail Advertising Division of Ekodus Technologies Private Limited. </p>
                <div className=''>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>
            </div>
            <div className='lg:w-[140px]' >
                <h3 className='font-bold text-lg mb-4'>About us</h3>
                <ul className='flex flex-col md:flex-row lg:flex-col md:gap-4 gap-2'>
                    <li><a href="">About Us</a></li>
                    <li><a href="">Listing Categories</a></li>
                    <li><a href="">FAQ</a></li>
                    <li><a href="">How it works</a></li>
                </ul>
            </div>
            <div className='lg:w-[140px]'>
                <h3 className='font-bold text-lg mb-4'>Quick Links</h3>
                <ul className='flex flex-col md:flex-row lg:flex-col md:gap-4 gap-2'>
                    <li><a href="">Advertise with us</a></li>
                    <li><a href="">Pricing</a></li>
                    <li><a href="">Customer Care</a></li>
                    <li><a href="">Blog List</a></li>
                </ul>
            </div>
            <div className='lg:w-[140px]' >
                <h3 className='font-bold text-lg mb-4'>Top Cities</h3>
                <ul className='flex flex-col md:flex-row lg:flex-col md:gap-4 gap-2'>
                    <li><a href="">Guwahati</a></li>
                    <li><a href="">Jorhat</a></li>
                    <li><a href="">Bongaigaon</a></li>
                    <li><a href="">Nagaon</a></li>
                </ul>
            </div>
            <div className='lg:w-[140px]'>
                <h3 className='font-bold text-lg mb-4'>Communication</h3>
                <ul className='flex flex-col md:flex-row lg:flex-col md:gap-4 gap-2'>
                    <li><a href="">About Us</a></li>
                    <li><a href="">About Us</a></li>
                    <li><a href="">About Us</a></li>
                    <li><a href="">About Us</a></li>
                </ul>
            </div>
        </section>
   </footer>
  )
}

export default Footer