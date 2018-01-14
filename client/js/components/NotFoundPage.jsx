import React from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';

const NotFoundPage = () => (
  <div >
    <Navbar />
    <div className="container notFound-body">
      <br />
      <h1 className="text-center">
        <strong> 404 </strong>
      </h1>
      <br />
      <h3 className="text-center mb-10">
        The resource you are looking for does not exist, or has been taken off the catalogue
      </h3>
    </div>
    <br />
    <Footer />
  </div>
);
export default NotFoundPage;
