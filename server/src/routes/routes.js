import authorize from '../middlewares/authorization';
import * as User from '../controllers/userControl';
import * as Recipe from '../controllers/recipeControl';
import * as Review from '../controllers/reviewControl';

const user = new User.default();
const recipe = new Recipe.default();
const review = new Review.default();
/* const review = new Review.default();
const upvote = new Upvote.default(); */

const router = (app) => {
  app.get('/', authorize, (req, res) => {
    res.status(200)
      .send('Welcome to my api');
  });
  app.post('/api/v1/users/signup', user.createUser); // user signup
  app.post('/api/v1/users/signin', user.userLogin); // user sign in
  app.post('/api/v1/recipes', authorize, recipe.addRecipe); // auth user adds recipe
  app.put('/api/v1/recipes/:recipeId', authorize, recipe.updateRecipe); // auth user updates recipe
  app.delete('/api/v1/recipes/:recipeId', authorize, recipe.deleteRecipe); // auth user deletes recipe
  app.get('/api/v1/recipes/:recipeId', recipe.viewOne); // user can view a recipe
  app.get('/api/v1/recipes', recipe.getAll); // user can get all recipes
  app.post('/api/v1/recipes/:recipeId/review', authorize, review.addReview); // auth user can add review to recipe
  app.get('/api/v1/recipes?sort=up&order=des', recipe.getAll); // user can get recipe with most upvotes
  // route for user to get his favourite
  // route for user to add recipe to favourites
  // route for user to upvote
  // route for user to downvote
  // route for user to update profile
  // route for user to delete account
};

export default router;
