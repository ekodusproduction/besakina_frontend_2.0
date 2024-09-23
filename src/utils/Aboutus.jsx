import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AboutUs = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section className="about-us-section px-4 py-8 max-w-7xl mx-auto">
      <div className="about-header text-center mb-8">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          We are an innovative online marketplace committed to connecting buyers
          and sellers worldwide.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mission-section my-12">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-7">
          Welcome to BesaKina.com, your prime destination for all classified
          listings and online market Place available in the vibrant city of
          Guwahati, Assam. At BesaKina.com, we take pride in offering a seamless
          platform that connects buyers and sellers, providing a dynamic
          marketplace where individuals and businesses can thrive. Founded with
          a vision to simplify the process of buying and selling, BesaKina.com
          stands as a local powerhouse in the classifieds industry. Our platform
          is designed to cater to the unique needs of the people, offering a
          user-friendly interface that ensures a hassle-free experience for all
          our users. Whether you're looking to sell a product, find a service,
          or simply explore local opportunities, BesaKina.com is your go-to
          destination{' '}
        </p>
      </div>

      {/* Vision Section */}
      <div className="vision-section my-12">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-7">
          To become the world’s most trusted online marketplace where
          innovation, quality, and user satisfaction are prioritized.
        </p>
      </div>

      {/* Services Section */}
      <div className="services-section my-12">
        <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li>Seamless buying and selling experience</li>
          <li>Secure transactions and payment methods</li>
          <li>Wide range of product categories</li>
          <li>Global reach for your business</li>
          <li>Customer support for buyers and sellers</li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="contact-section my-12">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-4">
          Have any questions or need support? Feel free to contact us at:
        </p>
        {/* <p className="text-lg font-semibold">
          Email: support@onlinemarketplace.com
        </p> */}
        <p className="text-lg font-semibold">Phone: +91 69139 17916</p>
        <p className="text-lg font-semibold">
          Address : Kahilipara Main Rd, Mula Gabharu Path, Kahilipara, Guwahati,
          Assam 781006
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
