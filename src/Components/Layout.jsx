import React from 'react'
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

const Layout = () => {
    return (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      );
}

export default Layout