import authorize from '../middlewares/authorization';
import allowUser from '../middlewares/allowUser';
import * as User from '../controllers/userControl';
import * as Recipe from '../controllers/recipeControl';
import * as Review from '../controllers/reviewControl';
import * as Vote from '../controllers/voteControl';
import * as Favourite from '../controllers/favouriteControl';

const user = new User.default();
const recipe = new Recipe.default();
const review = new Review.default();
const vote = new Vote.default();
const favourite = new Favourite.default();

const router = (app) => {
  app.get('/', (req, res) => {
    res.status(200)
      .send('Welcome to my api');
  });
  app.post('/api/v1/users/signup', user.createUser); // user signup route
  app.post('/api/v1/users/signin', user.userLogin); // user sign in route
  app.post('/api/v1/recipes', authorize, recipe.addRecipe); // auth user adds recipe
  app.put('/api/v1/recipes/:recipeId', authorize, recipe.updateRecipe); // auth user updates recipe
  app.delete('/api/v1/recipes/:recipeId', authorize, recipe.deleteRecipe); // auth user deletes recipe
  app.get('/api/v1/recipes/:recipeId', allowUser, recipe.viewOne); // user can view a recipe
  app.get('/api/v1/recipes', recipe.getAll); // user can get all recipes
  app.get('/api/v1/recipes?sort=up&order=des', recipe.getAll); // user can get recipe with most upvotes
  app.get('/api/v1/recipes/user/all', authorize, recipe.getAllUser); // user can get all recipes by them
  app.post('/api/v1/recipes/:recipeId/review', authorize, review.addReview); // auth user can add review to recipe
  app.put('/api/v1/recipes/:recipeId/favourite', authorize, favourite.addFavourite); // User can add recipe as favourite
  app.get('/api/v1/users/:userId/recipes', authorize, favourite.getAll); // User can get all favourites
  app.delete('/api/v1/users/delete', authorize, user.delete); // user delete account
  app.put('/api/v1/users/update', authorize, user.updateUser); // user update profile
  app.put('/api/v1/recipes/upvote/:recipeId', authorize, vote.upvote); // user can upvote recipe
  // app.put('/api/v1/recipes/downvote/:recipeId', authorize, vote.downvote); // user can downvote recipe
};

export default router;
