import path from 'path';

import authorize from '../middlewares/authorization';
import allowUser from '../middlewares/allowUser';
import Recipe from '../controllers/recipeControl';
import Review from '../controllers/reviewControl';
import Vote from '../controllers/voteControl';
import Favourite from '../controllers/favouriteControl';
import userRoutes from './user';

const router = (app) => {
  app.get('/api', (req, res) => {
    res.status(200)
      .json({ message: 'Welcome to my api' });
  });
  userRoutes(app);

  app.post('/api/v1/recipes', authorize, Recipe.addRecipe); // auth user adds recipe
  app.post('/api/v1/search', Recipe.search); // Search recipe
  app.put('/api/v1/recipes/:recipeId', authorize, Recipe.updateRecipe); // auth user updates recipe
  app.delete('/api/v1/recipes/:recipeId', authorize, Recipe.deleteRecipe); // auth user deletes recipe
  app.get('/api/v1/recipes/:recipeId', allowUser, Recipe.viewOne); // user can view a recipe
  app.get('/api/v1/recipes', Recipe.getAll); // user can get all recipes
  app.post('/api/v1/recipes/:recipeId/review', authorize, Review.addReview); // auth user can add review to recipe
  app.get('/api/v1/recipes/user/all', authorize, Recipe.getAllUser); // user can get all recipes by them
  app.put('/api/v1/recipes/:recipeId/favourite', authorize, Favourite.addFavourite); // User can add recipe as favourite
  app.get('/api/v1/recipes?sort=up&order=des', Recipe.getAll); // user can get recipe with most upvotes
  app.post('/api/v1/recipes/:recipeId/upvote', authorize, Vote.upvote); // user can upvote recipe
  app.post('/api/v1/recipes/:recipeId/downvote', authorize, Vote.downVote); // user can downvote recipe
};

export default router;
