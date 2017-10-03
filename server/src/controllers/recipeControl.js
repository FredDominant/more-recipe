import models from '../models';
import validateRecipe from '../functions/validateRecipe';

const recipe = models.Recipe;
/* const user = models.User;
const review = models.Review; */

/**
 * 
 * 
 * @export
 * @class Recipe
 */
export default class Recipe {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  addRecipe(req, res) {
    const { errors, isvalid } = validateRecipe(req.body);
    if (!(isvalid)) {
      return res.status(400)
        .json(errors);
    }
    recipe.findOne({
      where: {
        name: req.body.name.toLowerCase(),
        $and: {
          userId: req.decoded.id
        }
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          return res.status(403)
            .json({
              status: 'Fail',
              message: 'You already have a recipe with this name'
            });
        }
        if (!foundRecipe) {
          recipe.create({
            name: req.body.name.toLowerCase(),
            userId: req.decoded.id,
            ingredients: req.body.ingredients.toLowerCase(),
            directions: req.body.directions.toLowerCase()
          })
            .then((newRecipe) => {
              res.status(201)
                .json({
                  status: 'success',
                  recipe: newRecipe
                });
            })
            .catch((error) => {
              res.status(500)
                .json({
                  status: 'Fail',
                  message: error
                });
            });
        }
      })
      .catch((error) => {
        res.status(500)
          .json({
            status: 'fail',
            error
          });
      });
    return this;
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  updateRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to update');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    const name = req.body.name;
    const directions = req.body.directions;
    const ingredients = req.body.ingredients;
    recipe.findOne({
      where: {
        id: req.params.recipeId,
        $and: {
          userId: req.decoded.id
        }
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          const update = {
            name: name.toLowerCase() || foundRecipe.dataValues.name,
            ingredients: ingredients.toLowerCase() || foundRecipe.dataValues.ingredients,
            directions: directions.toLowerCase() || foundRecipe.dataValues.directions
          };
          foundRecipe.update(update)
            .then((updatedRecipe) => {
              return res.status(200)
                .json({
                  status: 'Update successful',
                  recipe: updatedRecipe
                });
            })
            .catch((error) => {
              return res.status(500)
                .json({
                  status: 'Fail',
                  message: error
                });
            });
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch((error) => {
        return res.status(500)
          .json({
            status: 'Fail',
            error,
          });
      });
    return this;
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  deleteRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to delete');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    recipe.findOne({
      where: {
        id: req.params.recipeId,
        $and: {
          userId: req.decoded.id
        }
      }
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
        if (foundRecipe) {
          recipe.destroy({
            where: {
              id: req.params.recipeId,
              $and: {
                userId: req.decoded.id
              }
            }
          })
            .then(() => {
              return res.status(200)
                .json({
                  status: 'Success',
                  message: 'recipe deleted'
                });
            })
            .catch((error) => {
              return res.status(500)
                .send(error);
            });
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch((error) => {
        return res.status(500)
          .json({
            status: 'Fail',
            error,
          });
      });
    return this;
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  getAll(req, res) {
    if (!req.query.sort) {
      recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            return res.status(200)
              .json({
                status: 'Success',
                recipes,
              });
          }
          if (!recipes) {
            return res.status(404)
              .send('No recipes found');
          }
        })
        .catch((error) => {
          return res.status(500)
            .json({
              error,
            });
        });
    }
    if (req.query.sort) {
      recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            const sorted = recipes.sort((a, b) => {
              return b.upvote - a.upvote;
            });
            return res.status(200)
              .json({
                status: 'Succes',
                sorted,
              });
          }
          if (!recipes) {
            return res.status(200)
              .send('Currently no recipes');
          }
        })
        .catch((error) => {
          return res.status(500)
            .json({
              status: 'Fail',
              error,
            });
        });
    }
    return this;
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Recipe
   */
  viewOne(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .send(`Can't find recipe with id ${req.params.recipeId}`);
        }
        if (foundRecipe) {
          // add reviews
          return res.status(200)
            .json({
              status: 'Success',
              foundRecipe,
            });
        }
      })
      .catch((error) => {
        return res.status(500)
          .json({
            status: 'Fail',
            error,
          });
      });
    return this;
  }
}
