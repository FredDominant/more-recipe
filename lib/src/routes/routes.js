'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlReview = require('../controllers/controlReview');

var Review = _interopRequireWildcard(_controlReview);

var _controlRecipe = require('../controllers/controlRecipe');

var Recipe = _interopRequireWildcard(_controlRecipe);

var _controlUpvote = require('../controllers/controlUpvote');

var Upvote = _interopRequireWildcard(_controlUpvote);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var recipe = new Recipe.default();
var review = new Review.default();
var upvote = new Upvote.default();

var router = function router(app) {
  app.get('/', function (req, res) {
    res.status(200).send('Welcome to api');
  });
  app.post('/api/v1/recipes', recipe.addRecipe);
  app.put('/api/v1/recipes/:recipeId', recipe.updateRecipe);
  app.post('/api/v1/recipes/:recipeId/review', review.addReview);
  app.delete('/api/v1/recipes/:recipeId', recipe.deleteRecipe);
  app.get('/api/v1/recipes?sort=up&order=des', upvote.getUpvotes);
  app.get('/api/v1/recipes', recipe.getAllRecipes);
};

exports.default = router;