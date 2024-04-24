import React from 'react';
import Head from '../common/Head.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';

function DefaultLayout({ children }) {
  return (
    <>
      <Head />
        <Header />
          <main>{children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
