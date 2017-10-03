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
}
