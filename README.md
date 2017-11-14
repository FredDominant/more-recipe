[![Build Status](https://travis-ci.org/Noblemajesty/more-recipe.svg?branch=task%2F1%2Ftest-branch)](https://travis-ci.org/Noblemajesty/more-recipe)
[![Coverage Status](https://coveralls.io/repos/github/Noblemajesty/more-recipe/badge.svg?branch=dev-server)](https://coveralls.io/github/Noblemajesty/more-recipe?branch=dev-server)
[![Maintainability](https://api.codeclimate.com/v1/badges/c7e0da6db5c85bff9a79/maintainability)](https://codeclimate.com/github/Noblemajesty/more-recipe/maintainability)

# **_More-Recipes_**

## _Introduction_

More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.  
Suppose a user comes up with a recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe.  Users can also keep a list of their favorite recipes on the application.

## _Features_

* **A User can create account and log in to use app**
* **A recipe listing or catalog page that allows viewers to search for recipes. It also shows popular recipes.**
* **A User can view details of a recipe, upvote/downvote recipes, add recipe as favourite and see any reviews. logged in users can post reviews**
* **A page, where logged in users can view a list of their favourite recipes**
* **A user's profile page**
* **A page where an authenticated user can do the following:**
1. _Add recipe_
2. _View or Modify the recipe he/she added_
3. _Delete the recipe he/she added_
4. _Add a recipe to favourites_
5. _View all recipes in the catalogue_

## _It has the following Endpoints_
* **_Endpoint where users can sign up_ ==> 
_post('https://my-more-recipe.herokuapp.com/api/v1/users/signup')_**
* **_Endpoint where users can sign in_ ==>
_post('https://my-more-recipe.herokuapp.com/api/v1/users/signup')_** 
* **_Endpoint where users can update profile_ ==>
_post('https://my-more-recipe.herokuapp.com/api/v1/users/update')_**
* **_Endpoint where users can Add a new recipe_ ==>
_post('https://my-more-recipe.herokuapp.com/api/v1/recipes')_**
* **_Endpoint where users can update a recipe they posted_ ==>
_put('https://my-more-recipe.herokuapp.com/api/v1/recipes/:recipeId')_**
* **_Endpoint where users can delete a recipe they posted_ ==>
_delete('https://my-more-recipe.herokuapp.com/api/v1/recipes/:recipeId')_**
* **_Endpoint where users can view details of a recipe_ ==>
_get('https://my-more-recipe.herokuapp.com/api/v1/recipes/:recipeId')_**
* **_Endpoint where users can get all current recipes in the app_ ==> 
_get('https://my-more-recipe.herokuapp.com/api/v1/recipes')_**
* **_Endpoint where logged in users can add reviews to recipes_ ==> 
_post('https://my-more-recipe.herokuapp.com/api/v1/recipes/:recipeId/reviews')_**
* **_Endpoint where users can gat all the recipes they own_ ==> 
_get('https://my-more-recipe.herokuapp.com/api/v1/recipes/user/all')_**
* **_Endpoint where users can add a recipe as favourite_ ==> 
_put('https://my-more-recipe.herokuapp.com/api/v1/recipes/:recipeId')_**
* **_Endpoint where users can view most upvoted recipe_ ==>
_get('https://my-more-recipe.herokuapp.com/api/v1/recipes?sort=up&order=des')_**
* **_Endpoint where users can vupote a recipe_ ==> _put('https://my-more-recipe.herokuapp.com/api/v1/recipes/upvote/:recipeId')_**
