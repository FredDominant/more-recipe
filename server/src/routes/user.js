import User from '../controllers/userControl';
import authorize from '../middlewares/authorization';
import Favourite from '../controllers/favouriteControl';
import Validate from '../functions/validate';

/**
 *
 * @returns {null} null
 * @export
 * @param {server} app server
 */
export default function userRoutes(app) {
  app.get('/api/v1/users/profile', authorize, User.userProfile);
  app.post('/api/v1/users/signup', Validate.userSignup, User.createUser); // user signup route
  app.post('/api/v1/users/signin', Validate.userLogin, User.userLogin); // user login route
  app.put('/api/v1/users/update', authorize, Validate.updateUser, User.updateUser); // user update profile
  app.get('/api/v1/users/favourites', authorize, Favourite.getAll); // User can get all favourites
  app.post('/api/v1/users/recover-email', Validate.recoverEmail, User.verifyEmail); // User can recover password
  app.put('/api/users/reset-password', authorize, Validate.resetPassword, User.ResetPassword); // User can reset password
}
