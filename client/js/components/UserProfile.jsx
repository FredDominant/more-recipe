import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './Navbar';
import userProfile from '../actions/userProfile';
/**
 *
 *
 * @class UserProfile
 * @extends {React.Component}
 */
class UserProfile extends React.Component {
/**
 * Creates an instance of UserProfile.
 * @param {any} props
 * @memberof UserProfile
 */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      picture: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }
  /**
   *
   * @returns {null} null
   * @memberof UserProfile
   */
  componentDidMount() {
    this.props.viewProfile();
  }
  /**
   *
   * @returns {null} null
   * @param {any} nextProps
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    const { firstname, lastname, email, picture } = nextProps.userDetails;
    this.setState({ firstname, lastname, email, picture });
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof UserProfile
   */
  onUpload(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ picture: e.target.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof UserProfile
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof UserProfile
   */
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  /**
   *
   * @returns {null} null
   * @memberof UserProfile
   */
  render() {
    return (
      <div >
        <NavBar user={'registered'} />
        <div className="container" id="update-profile-form">
          <div id="update-profile-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="container">
                  <div id="user-image-container">
                    <div className="profile-image">
                      <img className="img-thumbnail" id="update-profile-picture" src={this.state.picture} alt={this.state.firstname} srcSet="" />
                    </div>
                    <br />
                    {/* <label htmlFor="upload" className="file-upload__label">upload image</label> */}
                    <input
                      type="file"
                      name="file"
                      id="profile-upload"
                      onChange={this.onUpload}
                    />
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="profile-firstname">First Name</label>
                    <input
                      type="text"
                      id="profile-firstname"
                      className="form-control"
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="profile-lastname">Last Name</label>
                    <input
                      type="text"
                      id="profile-lastname"
                      className="form-control"
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="profile-email">Email</label>
                    <input
                      type="email"
                      id="profile-email"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="profile-password">Password</label>
                    <input
                      type="text"
                      id="profile-password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <button className="btn btn-primary">Update Profile</button>
                  </div>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>

    );
  }
}
const mapDispatchToprops = dispatch => ({
  viewProfile: () => dispatch(userProfile())
});

const mapStateToProps = state => ({
  userDetails: state.currentUserProfile.User
});

UserProfile.propTypes = {
  viewProfile: PropTypes.func.isRequired,
  userDetails: PropTypes.shape()
};
UserProfile.defaultProps = {
  userDetails: {}
};

export default connect(mapStateToProps, mapDispatchToprops)(UserProfile);

