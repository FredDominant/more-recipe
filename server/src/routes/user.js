import User from '../controllers/userControl';
import authorize from '../middlewares/authorization';
import Favourite from '../controllers/favouriteControl';
// const user = new User.default();

/**
 * 
 * 
 * @export
 * @param {any} app 
 */
export default function userRoutes(app) {
  app.post('/api/v1/users/signup', User.createUser); // user signup route
  app.post('/api/v1/users/signin', User.userLogin);
  app.put('/api/v1/users/update', authorize, User.updateUser); // user update profile
  app.get('/api/v1/users/:userId/recipes', authorize, Favourite.getAll); // User can get all favourites
}
