import React from 'react';

import Navbar from './Navbar';

const Profile = () => (
  <div>
    <Navbar user="registered" />
    <div className="container-fluid">
      <h3>Profile Page</h3>
    </div>
  </div>
);
export default Profile;
