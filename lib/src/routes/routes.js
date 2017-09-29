'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.router = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _controlReview = require('../controllers/controlReview');

var _controlRecipe = require('../controllers/controlRecipe');

var _controlUpvote = require('../controllers/controlUpvote');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipe = new _controlRecipe.Recipe();
var review = new _controlReview.Review();
var upvote = new _controlUpvote.Upvote();

var router = exports.router = function router(app) {
	app.get('/', function (req, res) {
		res.status(200).send("Welcome to api");
	});
	app.post('/api/v1/recipes', recipe.addRecipe);
	app.put('/api/v1/recipes/:recipeId', recipe.updateRecipe);
	app.post('/api/v1/recipes/:recipeId/review', review.addReview);
	app.delete('/api/v1/recipes/:recipeId', recipe.deleteRecipe);
	app.get('/api/v1/recipes?sort=up&order=des', upvote.getUpvotes);
	app.get('/api/v1/recipes', recipe.getAllRecipes);
};