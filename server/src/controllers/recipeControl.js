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
}
