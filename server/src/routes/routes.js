import express from 'express';
import bodyParser from 'body-parser';
import { Review } from '../controllers/controlReview';
import { Recipe } from '../controllers/controlRecipe';
import { Upvote } from '../controllers/controlUpvote'

const recipe = new Recipe();
const review = new Review();
const upvote = new Upvote();

export const router = (app) => {
	app.get('/', (req, res) => {
		res.status(200)
		.send("Welcome to api");
	});
	app.post('/api/v1/recipes', recipe.addRecipe);
	app.put('/api/v1/recipes/:recipeId', recipe.updateRecipe);
	app.post('/api/v1/recipes/:recipeId/review', review.addReview);
	app.delete('/api/v1/recipes/:recipeId', recipe.deleteRecipe);
	app.get('/api/v1/recipes?sort=up&order=des', upvote.getUpvotes);
	app.get('/api/v1/recipes', recipe.getAllRecipes); 
};
