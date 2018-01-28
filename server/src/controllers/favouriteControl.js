import models from '../models';

const recipe = models.Recipe;
const favourite = models.Favourite;

/**
 *
 * @export
 *
 * @class Favourite
 */
export default class Favourite {
  /**
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @returns {object} JSON and HTTP status code
   *
   * @memberof Favourite
   */
  static addFavourite(req, res) {
    recipe.findById(req.params.recipeId)
      .then((recipeExists) => {
        if (!recipeExists) {
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
              favourite.destroy({
                where: {
                  recipeId: req.params.recipeId,
                  $and: {
                    userId: req.decoded.id
                  }
                }
              })
                .then(() => {
                  res.status(200).json({ message: 'Removed from favourites', userFavourited: false });
                  recipe.findById(req.params.recipeId).then((Recipe) => {
                    Recipe.decrement('favourites');
                  });
                });
              return;
            }
            favourite.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId
            })
              .then(newFavourite => res.status(201)
                .json({
                  message: 'Recipe added to favourites',
                  favourite: newFavourite,
                  userFavourited: true
                }))
              .then(() => {
                recipe.findById(req.params.recipeId).then((Recipe) => {
                  Recipe.increment('favourites');
                });
              });
          });
      })
      .catch(() => res.status(500)
        .json({ message: 'Internal server error, please try again later' }));
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} any
   *
   * @memberof Favourite
   */
  static getAll(req, res) {
    const limit = 6;
    const page = parseInt((req.query.page || 1), 10);
    const offset = limit * (page - 1);
    favourite.findAndCountAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        {
          model: models.Recipe,
          include: [{ model: models.User, attributes: ['firstName', 'lastName'] }]
        }
      ],
      limit,
      offset,
      order: [
        ['id', 'DESC']
      ]
    }).then(({ rows, count }) => {
      const numberOfItems = count;
      const pages = Math.ceil(numberOfItems / limit);
      if (count === 0) {
        return res.status(404)
          .json({ message: 'You have no favourite recipe' });
      }
      return res.status(200)
        .json({
          numberOfItems,
          limit,
          pages,
          currentPage: page,
          favourites: rows
        });
    })
      .catch(() => res.status(500)
        .json({ message: 'Unable to get favourites, internal server error' }));
  }
  /**
 * @returns {object} response
 *
 * @static
 *
 * @param {object} req object
 * @param {object} res object
 *
 * @memberof Favourite
 */
  static delete(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        favourite.findOne({
          where: { recipeId: req.params.recipeId,
            $and: { userId: req.decoded.id }
          }
        })
          .then((foundFavourite) => {
            if (foundFavourite) {
              favourite.destroy({
                where: {
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                }
              })
                .then(() => res.status(200).json({ message: 'Deleted recipe from favourites' }))
                .then(() => {
                  recipe.findById(req.params.recipeId).then((Recipe) => {
                    Recipe.decrement('favourites');
                  });
                });
            }
          });
      })
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  }
}
