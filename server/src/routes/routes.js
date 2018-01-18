import authorize from '../middlewares/authorization';
import allowUser from '../middlewares/allowUser';
import Recipe from '../controllers/recipeControl';
import Review from '../controllers/reviewControl';
import Vote from '../controllers/voteControl';
import Favourite from '../controllers/favouriteControl';
import userRoutes from './user';
import Validate from '../functions/validate';

const router = (app) => {
  app.get('/api', (req, res) => {
    res.status(200)
      .json({ message: 'Welcome to my api' });
  });

  userRoutes(app);

  app.post('/api/v1/recipes', authorize, Validate.recipe, Recipe.addRecipe); // auth user adds recipe
  app.post('/api/v1/search', Recipe.search); // Search recipe
  app.put('/api/v1/recipes/:recipeId', authorize, Validate.Id, Validate.updateRecipe, Recipe.updateRecipe); // auth user updates recipe
  app.delete('/api/v1/recipes/:recipeId', authorize, Validate.Id, Recipe.deleteRecipe); // auth user deletes recipe
  app.get('/api/v1/recipes/:recipeId', allowUser, Validate.Id, Recipe.viewOne); // user can view a recipe
  app.get('/api/v1/recipes', Recipe.getAll); // user can get all recipes
  app.post('/api/v1/recipes/:recipeId/review', authorize, Validate.Id, Validate.review, Review.addReview); // auth user can add review to recipe
  app.get('/api/v1/recipes/:recipeId/review', Validate.Id, Review.getReviews); // auth user can view all reviews
  app.get('/api/v1/recipes/user/all', authorize, Recipe.getAllUser); // user can get all recipes by them
  app.post('/api/v1/recipes/:recipeId/favourite', authorize, Validate.Id, Favourite.addFavourite); // User can add recipe as favourite
  app.delete('/api/v1/favourites/:recipeId/delete', authorize, Validate.Id, Favourite.delete); // User can delete recipe from favourites
  app.get('/api/v1/recipes?sort=up&order=des', Recipe.getAll); // user can get recipe with most upvotes
  app.post('/api/v1/recipes/:recipeId/upvote', authorize, Validate.Id, Vote.upvote); // user can upvote recipe
  app.post('/api/v1/recipes/:recipeId/downvote', authorize, Validate.Id, Vote.downVote); // user can downvote recipe
};

export default router;
