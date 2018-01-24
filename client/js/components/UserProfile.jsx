import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';
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
      selectedImage: false,
      uploading: false,
      fetching: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
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
   * @description selects image
   * @memberof UserProfile
   * @returns {null} null
   */
  onSelectImage() {
    $('input[type=file]').click();
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
      this.setState({ uploading: true });
      return uploadImage(picture)
        .then((response) => {
          const url = response.data.secure_url;
          this.setState({ picture: url });
          this.setState({ uploading: false });
          this.props.updateProfile(this.state);
        })
        .catch((error) => {
          this.setState({ uploading: false });
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
    const {
      firstname,
      lastname,
      email,
      password,
      picture,
      disabled,
      uploading
    } = this.state;
    return (
      <div className="profile-body">
        <div className="container" id="update-profile-form">
          <div id="update-profile-body">
            <form onSubmit={this.handleSubmit}>
              <div className="">
                <div id="user-image-container">
                  <div
                    className="profile-image"
                    id="user-profile-image-container"
                    onClick={this.onSelectImage}
                    role="presentation"
                  >
                    <img
                      className="img-thumbnail"
                      id="update-profile-picture"
                      src={picture}
                      alt={firstname}
                      srcSet=""
                    />
                  </div>
                  <br />
                  <input
                    type="file"
                    name="file"
                    id="profile-upload"
                    style={{ display: 'none' }}
                    onChange={this.onUpload}
                    disabled={disabled}
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
                    value={firstname}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profile-lastname">Last Name</label>
                  <input
                    type="text"
                    id="profile-lastname"
                    className="form-control"
                    name="lastname"
                    value={lastname}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profile-email">Email</label>
                  <input
                    type="email"
                    id="profile-email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profile-password">Password</label>
                  <input
                    type="text"
                    id="profile-password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                </div>

                <div className="form-group">
                  <div className="container row">
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                      <button
                        className="btn btn-success"
                        disabled={disabled}
                      >
                        {
                          uploading ? 'uploading image...' : 'update'
                        }
                      </button></div>
                    <div className="col-sm-2 col-md-2 col-lg-2" />
                    <div className="col-sm-5 col-md-5 col-lg-5">
                      <button className="btn btn-primary" onClick={this.onEdit}>Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
        <Footer />
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
  updateSuccess: state.currentUserProfile.UpdateSuccess,
});

UserProfile.propTypes = {
  viewProfile: PropTypes.func.isRequired,
  userDetails: PropTypes.shape(),
  updateProfile: PropTypes.func.isRequired,
};
UserProfile.defaultProps = {
  userDetails: {},
  updateSuccess: false,
  fetching: false
};

export default connect(mapStateToProps, mapDispatchToprops)(UserProfile);
