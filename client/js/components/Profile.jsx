import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import UserProfile from './UserProfile';
/**
 *
 *
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {
/**
 * Creates an instance of Profile.
 * @param {any} props
 * @memberof Profile
 */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   *
   *
   * @returns {jsx} react component
   * @memberof Profile
   */
  render() {
    console.log('This.props.children is', this.props.children);
    return (
      <div>
        <Navbar />
        <div className="container">
          <div id="profile-box">
            <div className="row" id="profile-body">
              <div className="col-xs-2" id="navigation-part">
                <div id="profile-navigation">
                  <div id="profile-navigation-links">
                    <h6> Edit Profile </h6> <br />
                    <h6> My Recipes </h6> <br />
                    <h6> Favourite Recipes </h6> <br />
                  </div>
                </div>
              </div>
              <div className="col-xs-10" id="changing-part">
                <div id="changing-component">
                  <h6> some stuff here also </h6>
                  {this.props.children}
                  {/* <UserProfile /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
