import models from '../models';

const recipe = models.Recipe;
const favourite = models.Favourite;

/**
 *
 *
 * @export
 * @class Favourite
 */
export default class Favourite {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} any
   * @memberof Favourite
   */
  static addFavourite(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to favourite' });
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
    }
    recipe.findById(req.params.recipeId)
      .then((found) => {
        if (!found) {
          return res.status(404)
            .json({ message: 'recipe doesn\'t exist in catalogue' });
        }
        favourite.findOne({
          where: {
            recipeId: req.params.recipeId,
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
                  message: 'Already added this recipe to your favourites'
                });
            }
            favourite.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId
            })
              .then(() => { return res.status(201)
                .json({
                  status: 'Success',
                  message: 'Recipe added to favourites'
                });
              })
              .catch(() => { return res.status(500)
                .json({ message: 'Unable to add to favourites due to server error' });
              });
          })
          .catch(() => { return res.status(500)
            .json({ messahe: 'a server error ocurred' });
          });
      })
      .catch(() => { return res.status(500)
        .json({ message: 'Internal server error, please try again later' });
      });
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} any
   * @memberof Favourite
   */
  static getAll(req, res) {
    favourite.findAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        {
          model: recipe, attributes: ['name', 'ingredients', 'directions']
        }
      ]
    })
      .then((found) => {
        if (!found) {
          return res.status(404)
            .json({
              status: 'success',
              message: 'You have no recipes added as favourites'
            });
        }
        if (found) {
          if (found.length < 1) {
            return res.status(200)
              .json({ message: 'You have no favourites. Add recipes to favourite' });
          }
          return res.status(200)
            .json({
              status: 'Success',
              favourites: found
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500)
          .json({ message: 'Unable to get favourites, internal server error' });
      });
  }
}
