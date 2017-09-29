"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Recipe = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require("../models/database");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = function () {
	function Recipe() {
		_classCallCheck(this, Recipe);
	}

	_createClass(Recipe, [{
		key: "addRecipe",
		value: function addRecipe(req, res) {
			var owner = req.body.owner;
			var name = req.body.name;
			var ingredient = req.body.ingredient;
			var description = req.body.description;

			if (!owner) {
				return res.status(400).send("Recipe should have an owner");
			};

			if (!name) {
				return res.status(400).send("Recipe should have a name");
			};

			if (!ingredient) {
				return res.status(400).send("Recipe should have ingredients");
			};

			if (!description) {
				return res.status(400).send("Recipe should have directions to cook");
			};

			if (ingredient.trim().length < 1) {
				return res.status(400).send("Ingredients are empty");
			};

			if (description.trim().length < 1) {
				return res.status(400).send("Recipe should have a direction to cook");
			}

			var id = _database.db.recipes.length + 1;
			var newRecipe = {
				id: id,
				ownerId: owner,
				name: name,
				ingredients: [ingredient],
				description: description,
				downVote: 0,
				upVote: 0
			};
			_database.db.recipes.push(newRecipe);
			return res.status(201).json({
				status: "success",
				message: "Recipe added",
				recipe: newRecipe
			});
			return this;
		}
	}, {
		key: "updateRecipe",
		value: function updateRecipe(req, res) {
			var query = req.params.recipeId;
			if (!query) {
				return res.status(400).send('Recipe parameter is needed');
			} else {
				for (var i = 0; i < _database.db.recipes.length; i++) {
					if (parseInt(_database.db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
						_database.db.recipes[i].name = req.body.newName || _database.db.recipes[i].name;
						_database.db.recipes[i].ingredients = [req.body.newIngredients] || _database.db.recipes[i].ingredients;
						_database.db.recipes[i].description = req.body.newDescription || _database.db.recipes[i].description;
						return res.status(200).json({
							status: "success",
							message: "Recipe modified",
							recipe: _database.db.recipes[i]
						});
					}
				}
				return res.status(404).send('recipe with id ' + query + ' not found');
			}
			return this;
		}
	}, {
		key: "deleteRecipe",
		value: function deleteRecipe(req, res) {
			for (var i = 0; i < _database.db.recipes.length; i++) {
				if (parseInt(_database.db.recipes[i].id, 10) === parseInt(req.params.recipeId, 10)) {
					_database.db.recipes.splice(i, 1);
					return res.status(200).json({
						status: "success",
						message: "Recipe has been deleted",
						recipe: _database.db.recipes[i]
					});
				}
			}
			return res.status(404).send("Recipe not found");
		}
	}, {
		key: "getAllRecipes",
		value: function getAllRecipes(req, res) {
			if (req.query.hasOwnProperty('sort')) {
				var sorted = _database.db.recipes.sort(function (a, b) {
					return b.upVote - a.upVote;
				});
				return res.status(200).json({
					status: "success",
					data: sorted
				});
			}
			return res.status(200).json({
				status: "success",
				recipes: _database.db.recipes
			});
			return this;
		}
	}]);

	return Recipe;
}();

exports.Recipe = Recipe;