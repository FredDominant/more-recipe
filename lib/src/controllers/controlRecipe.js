'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recipe = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('../models/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, [{
    key: 'addRecipe',
    value: function addRecipe(req, res) {
      var owner = req.body.owner;
      var name = req.body.name;
      var ingredient = req.body.ingredients;
      var description = req.body.description;

      if (!owner) {
        return res.status(400).send('Recipe should have an owner');
      }

      if (!name) {
        return res.status(400).send('Recipe should have a name');
      }

      if (!ingredient) {
        return res.status(400).send('Recipe should have ingredients');
      }

      if (!description) {
        return res.status(400).send('Recipe should have directions to cook');
      }

      if (ingredient.trim().length < 1) {
        return res.status(400).send('Ingredients are empty');
      }

      if (description.trim().length < 1) {
        return res.status(400).send('Recipe should have a direction to cook');
      }

      var id = _database2.default.recipes.length + 1;
      var newRecipe = {
        id: id,
        ownerId: owner,
        name: name,
        ingredients: [ingredient],
        description: description,
        downVote: 0,
        upVote: 0
      };
      _database2.default.recipes.push(newRecipe);
      return res.status(201).json({
        status: 'success',
        message: 'Recipe added',
        recipe: newRecipe
      });
      return this;
    }
  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      var query = req.params.recipeId;
      if (!query) {
        return res.status(400).send('Recipe parameter is needed');
      }
      for (var i = 0; i < _database2.default.recipes.length; i++) {
        if (parseInt(_database2.default.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
          _database2.default.recipes[i].name = req.body.newName || _database2.default.recipes[i].name;
          _database2.default.recipes[i].ingredients = [req.body.newIngredients] || _database2.default.recipes[i].ingredients;
          _database2.default.recipes[i].description = req.body.newDescription || _database2.default.recipes[i].description;
          return res.status(200).json({
            status: "success",
            message: "Recipe modified",
            recipe: _database2.default.recipes[i]
          });
        }
      }
      return res.status(404).send('recipe with id ' + query + ' not found');

      return this;
    }
  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      for (var i = 0; i < _database2.default.recipes.length; i++) {
        if (parseInt(_database2.default.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
          _database2.default.recipes.splice(i, 1);
          return res.status(200).json({
            status: 'success',
            message: 'Recipe has been deleted',
            recipe: _database2.default.recipes[i]
          });
        }
      }
      return res.status(404).send('Recipe not found');
    }
  }, {
    key: 'getAllRecipes',
    value: function getAllRecipes(req, res) {
      console.log(req.query);
      if (req.query.sort) {
        var sorted = _database2.default.recipes.sort(function (a, b) {
          return b.upVote - a.upVote;
        });
        return res.status(200).json({
          status: 'success',
          data: sorted
        });
      }
      return res.status(200).json({
        status: 'success',
        recipes: _database2.default.recipes
      });
      return this;
    }
  }]);

  return Recipe;
}();

exports.Recipe = Recipe;