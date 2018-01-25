import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';
import userProfile from '../actions/userProfile';
import updateProfile from '../actions/editProfile';
import updatePasswordValidator from '../validation/updatePasswordValidator';

/**
 *
 * @class UserProfile
 *
 * @extends {React.Component}
 */
class UserProfile extends React.Component {
/**
 * @description Creates an instance of UserProfile.
 *
 * @param {any} props
 *
 * @memberof UserProfile
 */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      picture: '',
      errors: {},
      disabled: true,
      uploadImageError: '',
      selectedImage: false,
      uploading: false,
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
   *
   * @memberof UserProfile
   */
  componentDidMount() {
    this.props.viewProfile();
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} nextProps
   *
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    const { firstname, lastname, email, picture } = nextProps.userDetails;
    this.setState({ firstname, lastname, email, picture });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} event
   *
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
   * @param {any} event
   *
   * @memberof UserProfile
   *
   * @returns {null} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} event
   *
   * @memberof UserProfile
   */
  onEdit(event) {
    event.preventDefault();
    this.setState({ disabled: !this.state.disabled });
  }
  /**
   * @description selects image
   *
   * @memberof UserProfile
   *
   * @returns {null} null
   */
  onSelectImage() {
    $('input[type=file]').click();
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} event
   *
   * @memberof UserProfile
   */
  handleSubmit(event) {
    const { password } = this.state;
    event.preventDefault();
    if (password.length) {
      if (this.isValid()) {
        return this.handleUpdate();
      }
    } else {
      return this.handleUpdate();
    }
  }
  /**
*
* @returns {boolean} boolean

* @memberof AddRecipe
*/
  isValid() {
    const { password, confirmPassword } = this.state;
    const { errors, isValid } = updatePasswordValidator(password, confirmPassword);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @description This functions handles profile updates
   *
   * @returns {null} null
   *
   * @memberof UserProfile
   */
  handleUpdate() {
    const {
      firstname,
      lastname,
      email,
      picture,
      password,
      confirmPassword,
      selectedImage
    } = this.state;
    this.props.updateProfile({
      firstname, lastname, email, picture, password, confirmPassword, selectedImage
    });
  }
  /**
   *
   * @returns {node} JSX
   *
   * @memberof UserProfile
   */
  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      picture,
      disabled,
      errors,
      fetching
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
                <br />
                <h6 className="text-left">Account setting</h6>
                <hr />
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
                    type="password"
                    id="profile-confirmPassword"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                  {errors.password && <small className="form-text text-muted">
                    <span className="error-text"> {errors.password} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <label htmlFor="profile-password">Confirm Password</label>
                  <input
                    type="password"
                    id="profile-password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onChange}
                    disabled={disabled}
                  />
                  {errors.confirmPassword && <small className="form-text text-muted">
                    <span className="error-text"> {errors.confirmPassword} </span>
                  </small>}
                </div>

                <div className="form-group">
                  <div className="container row">
                    <div className="col-sm-2 col-md-2 col-lg-2">
                      <button className="btn btn-primary" onClick={this.onEdit}>
                        {
                          !this.state.disabled && <span><i className="fas fa-lock" /></span>
                        }
                        {
                          this.state.disabled && <span><i className="fas fa-unlock" /></span>
                        }
                      </button>
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-10">
                      <button
                        className="btn btn-success"
                        disabled={disabled}
                      >
                       update profile
                      </button></div>
                    <div className="col-sm-2 col-md-2 col-lg-2" />

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
};

export default connect(mapStateToProps, mapDispatchToprops)(UserProfile);
