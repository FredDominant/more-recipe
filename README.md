[![Build Status](https://travis-ci.org/Noblemajesty/more-recipe.svg?branch=chore%2Ftest)](https://travis-ci.org/Noblemajesty/more-recipe)
[![Maintainability](https://api.codeclimate.com/v1/badges/c7e0da6db5c85bff9a79/maintainability)](https://codeclimate.com/github/Noblemajesty/more-recipe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c7e0da6db5c85bff9a79/test_coverage)](https://codeclimate.com/github/Noblemajesty/more-recipe/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/Noblemajesty/more-recipe/badge.svg?branch=chore%2Ftest)](https://coveralls.io/github/Noblemajesty/more-recipe?branch=chore%2Ftest)

# **_More-Recipes_**

## _Introduction_

More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt.  
Suppose a user comes up with a recipe, he/she can post it on More-Recipes and get feedback in form of reviews and votes from other users who explore that recipe.  Users can also keep a list of their favorite recipes on the application

### Technologies
-----

 1. [Nodejs](https://nodejs.org/en/)
 1. [Postgresql](https://www.postgresql.org/)
 1. [Express](https://expressjs.com/)
 1. [Sequelize](http://docs.sequelizejs.com/)
 1. [React](https://reactjs.org/)
 1. [Redux](https://redux.js.org/)


## API Documentation
 The full documentation for all api end point can be found [here](https://fred-recipes.herokuapp.com/api/documentation)

## _Features_

* **A User can create account and log in to use app**
* **A recipe listing or catalog page that allows viewers to search for recipes. It also shows popular recipes.**
* **A User can view details of a recipe, upvote/downvote recipes, add recipe as favourite and see any reviews. logged in users can post reviews**
* **A page, where logged in users can view a list of their favourite recipes**
* **A user's profile page**
* **A page where an authenticated user can do the following:**
1. Add recipe
2. View or Modify the recipe he/she added
3. Delete the recipe he/she added
4. Add a recipe to favourites
5. View all recipes in the catalogue
6. Upvote a recipe
7. downvote a recipe
8. Review a recipe
9. Update profile
10. Users can change their password or reset it if forgotten.

## Limitations
---
This project has some limitations. The most notable ones are:

1. Users can not view other user's profile or see their personal/favorite recipe list.
2. Users cannot deactivate their accounts


## Demo
___

View the web client live [here](https://fred-recipes.herokuapp.com/)

## Test
___

This app uses the following for testing:
* For server-side testing run `npm run test:report`.
* For client-side testing run `npm run client`

## How to Install
___

1. Clone the repo and enter directory 
```sh
git clone git@github.com:noblemajesty/more-recipes.git && cd more-recipes
```
2. Install the project's dependecies
```sh
npm install
```
3. Create `.env` file and copy content of `.env.sample` to it and provide the appropriate values
```sh
cp .env.sample .env
```

4. Finally, start the server
```sh
```

## Contributing to the project
___
* Fork this repository to your github account
* Clone the repository -  `git clone https://github.com/{your_username_goes_here}/dman.git`
* Create your feature branch - `git checkout -b {feature, chore or bug}-short_feature_desscription`
* Commit your changes - `git commit -m “{commit_message_goes_here}“` or `git commit` for the interactive interface
* Push to the remote branch - `git push origin {your_branch_name_as_described_above}`
* Open a pull request 

## FAQ
___
> What language was used to develop this application?
```
This is a full stack javascript application
```
> Who can contribute?
```
Anyone!
```

## Author
___
Fred Adewole([@Fred_Amare](https://twitter.com/fred_Amare))

## License
___
This is licensed for your use, modification and distribution under the [MIT license](https://github.com/noblemajesty/more-recipes/blob/dev/LICENSE).
