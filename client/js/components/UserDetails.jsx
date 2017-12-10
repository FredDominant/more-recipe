import React from 'react';
// import { Switch, Route } from 'react-router-dom';

import Profile from './Profile';
import UserProfile from './UserProfile';

const UserDetails = () => (
  <div>
    <Profile>
      <UserProfile />
    </Profile>
  </div>
);
export default UserDetails;

