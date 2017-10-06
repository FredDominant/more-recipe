import models from '../models';

const recipe = models.Recipe;
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
  static addRecipe(req, res) {
    const directions = req.body.directions;
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    if (!ingredients) {
      return res.status(400).json({ message: 'Ingredients field is empty' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Recipe name is empty' });
    }
    if (name.length < 5) {
      return res.status(400).json({ message: 'Recipe name should be at least 6 characters' });
    }
    if (!directions) {
      return res.status(400).json({ message: 'Add directions to prepare recipe' });
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
            .then((newRecipe) => { return res.status(201)
              .json({
                status: 'success',
                recipe: newRecipe
              });
            })
            .catch((error) => { return res.status(500)
              .json({
                status: 'Fail',
                message: error
              });
            });
        }
      })
      .catch((error) => { return res.status(500)
        .json({
          status: 'fail',
          error
        });
      });
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  static updateRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to update' });
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
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
            name: name ? name.toLowerCase() : foundRecipe.dataValues.name,
            ingredients: ingredients ? ingredients.toLowerCase() : foundRecipe.dataValues.ingredients,
            directions: directions ? directions.toLowerCase() : foundRecipe.dataValues.directions
          };
          foundRecipe.update(update)
            .then((updatedRecipe) => { return res.status(200)
              .json({
                status: 'Update successful',
                recipe: updatedRecipe
              });
            })
            .catch((error) => { return res.status(500)
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
        console.info(error);
        return res.status(500)
          .json({
            status: 'Fail',
            error,
          });
      });
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  static deleteRecipe(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to delete' });
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
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
            .then(() => res.status(200)
              .json({
                status: 'Success',
                message: 'recipe deleted'
              }))
            .catch(error => res.status(500)
              .json({ message: error }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              status: 'Fail',
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch((error) => { return res.status(500)
        .json({
          status: 'Fail',
          error,
        });
      });
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  static getAll(req, res) {
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
              .json({ message: 'No recipes found' });
          }
        })
        .catch((error) => { return res.status(500)
          .json({
            error,
          });
        });
    }
    if (req.query.sort) {
      recipe.findAll()
        .then((recipes) => {
          if (recipes) {
            const sorted = recipes.sort((a, b) => b.upvote - a.upvote);
            return res.status(200)
              .json({
                status: 'Succes',
                sorted,
              });
          }
          if (!recipes) {
            return res.status(200)
              .json({ message: 'Currently no recipes' });
          }
        })
        .catch((error) => { return res.status(500)
          .json({
            status: 'Fail',
            error,
          });
        });
    }
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Recipe
   */
  static viewOne(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe' });
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
    }
    recipe.findOne({
      where: { id: req.params.recipeId },
      include: [
        { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
        { model: models.Review, attributes: ['content'] }
      ]
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ message: `Can't find recipe with id ${req.params.recipeId}` });
        }
        if (foundRecipe) {
          // add reviews
          if (req.decoded) {
            if (req.decoded.id !== foundRecipe.dataValues.userId) {
              foundRecipe.increment('views');
            }
          }
          if (!req.decoded) {
            foundRecipe.increment('views');
          }
          return res.status(200)
            .json({
              status: 'Success',
              foundRecipe,
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500)
          .json({
            status: 'Fail',
            error,
          });
      });
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipe
   */
  static getAllUser(req, res) {
    recipe.findAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        { model: models.Review, attributes: ['content'] }
      ]
    })
      .then((all) => {
        if (!all) {
          return res.status(404)
            .json({ message: 'You currently have no recipes' });
        }
        if (all) {
          return res.status(200)
            .json({
              status: 'Success',
              recipes: all
            });
        }
      })
      .catch(() => { return res.status(500)
        .json({ message: 'Unable to find all recipes by you' });
      });
  }
}
