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
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @returns {object} JSON and HTTP status code
   * @memberof Favourite
   */
  static addFavourite(req, res) {
    recipe.findById(req.params.recipeId)
      .then((recipeExists) => {
        if (!recipeExists) {
          return res.status(404)
            .json({ Message: 'recipe doesn\'t exist in catalogue' });
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
                  Message: 'Already added this recipe to your favourites'
                });
            }
            favourite.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId
            })
              .then((newFavourite) => { 
                return res.status(201)
                  .json({
                    Message: 'Recipe added to favourites',
                    Favourite: newFavourite
                  });
              })
              .catch(() => { 
                return res.status(500)
                  .json({ Message: 'Unable to add to favourites due to server error' });
              });
          })
          .catch(() => { 
            return res.status(500)
              .json({ Message: 'a server error ocurred' });
          });
      })
      .catch(() => { 
        return res.status(500)
          .json({ Message: 'Internal server error, please try again later' });
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
      .then((foundFavourites) => {
        if (foundFavourites) {
          if (foundFavourites.length < 1) {
            return res.status(404)
              .json({ Message: 'You have no favourites. Add recipes to favourite' });
          }
          return res.status(200)
            .json({
              Favourites: foundFavourites
            });
        }
      })
      .catch(() => {
        return res.status(500)
          .json({ Message: 'Unable to get favourites, internal server error' });
      });
  }
}
