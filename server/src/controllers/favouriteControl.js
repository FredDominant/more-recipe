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
              favourite.destroy({
                where: {
                  recipeId: req.params.recipeId,
                  $and: {
                    userId: req.decoded.id
                  }
                }
              })
                .then(() => res.status(200).json({ Message: 'Removed from favourites' }));
              return;
            }
            favourite.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId
            })
              .then(newFavourite => res.status(201)
                .json({
                  Message: 'Recipe added to favourites',
                  Favourite: newFavourite
                }));
          });
      })
      .catch(() => res.status(500)
        .json({ Message: 'Internal server error, please try again later' }));
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
    favourite.findAndCountAll({
      where: {
        userId: req.decoded.id
      }
    }).then((allFavourites) => {
      let offset = 0;
      const limit = 2;
      const numberOfItems = allFavourites.count;
      const page = parseInt((req.query.page || 1), 10);
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      favourite.findAll({
        where: {
          userId: req.decoded.id
        },
        include: [
          {
            model: models.Recipe,
            attributes: ['name', 'ingredients', 'directions', 'description', 'picture', 'upvote', 'downvote'],
            include: [{ model: models.User, attributes: ['firstname', 'lastname'] }]
          },
        ],
        limit,
        offset,
        order: [
          ['id', 'DESC']
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
                NumberOfItems: numberOfItems,
                Pages: pages,
                CurrentPage: page,
                Limit: limit,
                Favourites: foundFavourites
              });
          }
        });
    })
      .catch(() => res.status(500)
        .json({ Message: 'Unable to get favourites, internal server error' }));
  }
  /**
 * @returns {HTTPResponse} response
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof Favourite
 */
  static delete(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({ Message: 'Recipe not found' });
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
                .then(() => res.status(200).json({ Message: 'Deleted recipe from favourites' }));
              return;
            }
            if (!foundFavourite) {
              return res.status(404).json({ Message: 'Favourite not found' });
            }
          });
      })
      .catch(() => res.status(500).json({ Message: 'Internal server error' }));
  }
}
