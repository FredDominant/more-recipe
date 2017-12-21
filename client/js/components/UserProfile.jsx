import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from './Navbar';
import userProfile from '../actions/userProfile';
import updateProfile from '../actions/editProfile';
import uploadImage from '../utils/uploadImage';
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
      picture: '',
      disabled: true,
      uploadImageError: '',
      selectedImage: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onEdit = this.onEdit.bind(this);
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
    console.log('next Props is', nextProps);
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
    this.setState({ selectedImage: true });
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
  onEdit(event) {
    event.preventDefault();
    this.setState({ disabled: !this.state.disabled });
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof UserProfile
   */
  handleSubmit(event) {
    const { firstname, lastname, email, picture } = this.state;
    event.preventDefault();
    if (this.state.selectedImage) {
      return uploadImage(picture)
        .then((response) => {
          const url = response.data.secure_url;
          this.setState({ picture: url });
          this.props.updateProfile(this.state);
        })
        .catch((error) => {
          this.setState({ uploadImageError: error.error.message });
        });
    }
    this.props.updateProfile({ firstname, lastname, email, picture });
  }

  /**
   *
   * @returns {null} null
   * @memberof UserProfile
   */
  render() {
    return (
      <div >
        <NavBar />
        {this.props.updateSuccess && <div className="container">
          <div className="alert alert-success alert-dismissible" role="alert">Profile updated</div>
        </div>}
        <div className="container" id="update-profile-form">
          <div id="update-profile-body">
            <form onSubmit={this.handleSubmit}>
              {/* <div className="row"> */}
              <div className="">
                <div id="user-image-container">
                  <div className="profile-image">
                    <img className="img-thumbnail" id="update-profile-picture" src={this.state.picture} alt={this.state.firstname} srcSet="" />
                  </div>
                  <br />
                  <input
                    type="file"
                    name="file"
                    id="profile-upload"
                    onChange={this.onUpload}
                    disabled={this.state.disabled}
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
                    disabled={this.state.disabled}
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
                    disabled={this.state.disabled}
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
                    disabled={this.state.disabled}
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
                    disabled={this.state.disabled}
                  />
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-2">
                      <button className="btn btn-success" disabled={this.state.disabled}>Update</button></div>
                    <div className="col-sm-1" />
                    <div className="col-sm-2">
                      <button className="btn btn-primary" onClick={this.onEdit}>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToprops = dispatch => ({
  viewProfile: () => dispatch(userProfile()),
  updateProfile: updateDetails => dispatch(updateProfile(updateDetails))
});

const mapStateToProps = state => ({
  userDetails: state.currentUserProfile.User,
  updateSuccess: state.currentUserProfile.UpdateSuccess
});

UserProfile.propTypes = {
  viewProfile: PropTypes.func.isRequired,
  userDetails: PropTypes.shape(),
  updateProfile: PropTypes.func.isRequired,
  updateSuccess: PropTypes.bool
};
UserProfile.defaultProps = {
  userDetails: {},
  updateSuccess: false
};

export default connect(mapStateToProps, mapDispatchToprops)(UserProfile);

