import models from '../models';

const recipe = models.Recipe;
const favourite = models.Favourite;
/**
 *
 * @export
 *
 * @class Recipe
 */
export default class Recipe {
  /**
   *
   * @param {request} req HTTP request
   *
   * @param {request} res HTTP response
   *
   * @returns {object} JSON and HTTP status code
   *
   * @memberof Recipe
   */
  static addRecipe(req, res) {
    const {
      name,
      description,
      directions,
      ingredients,
      picture
    } = req.body;
    recipe.findOne({
      where: {
        name: name.toLowerCase(),
        userId: req.decoded.id
      }
    })
      .then((foundRecipe) => {
        if (foundRecipe) {
          return res.status(403)
            .json({
              message: 'You already have a recipe with this name'
            });
        }
        if (!foundRecipe) {
          recipe.create({
            name: name.toLowerCase(),
            userId: req.decoded.id,
            description: description.toLowerCase(),
            ingredients: ingredients.toLowerCase(),
            directions: directions.toLowerCase(),
            picture
          })
            .then(newRecipe => res.status(201)
              .json({
                recipe: newRecipe
              }));
        }
      })
      .catch(() => res.status(500)
        .json({
          message: 'Internal server error. Unable to Add new recipe'
        }));
  }
  /**
   * @description This function updates a user's recipe
   *
   * @param {request} req HTTP Reques
   * @param {response} res HTTP Response
   *
   * @returns {object} JSON and HTTP status code
   *
   * @memberof Recipe
   */
  static updateRecipe(req, res) {
    const {
      name,
      description,
      directions,
      ingredients,
      picture
    } = req.body;

    recipe.findOne({
      where: {
        name: name.trim().toLowerCase(),
        userId: req.decoded.id
      }
    }).then((existingRecipeWithSameName) => {
      if (!(!existingRecipeWithSameName || existingRecipeWithSameName.name === name)) {
        return res.status(403).json({ message: 'You have a recipe with this name' });
      }
    });

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
          const newRecipe = {
            name: name ?
              name.trim().toLowerCase() : foundRecipe.dataValues.name,
            description: description ?
              description.trim().toLowerCase() : foundRecipe.dataValues.description,
            ingredients: ingredients ?
              ingredients.trim().toLowerCase() : foundRecipe.dataValues.ingredients,
            directions: directions ?
              directions.trim().toLowerCase() : foundRecipe.dataValues.directions,
            picture: picture ?
              picture.trim() : foundRecipe.dataValues.picture
          };
          return foundRecipe.update(newRecipe)
            .then(updatedRecipe => res.status(200)
              .json({
                message: 'Update successful',
                recipe: updatedRecipe
              }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(() => {
        res.status(500)
          .json({
            message: 'Internal server error. Unable to complete request'
          });
      });
  }
  /**
   * @description This method deletes a recipe
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   *
   * @returns {object} JSON HTTP and status code
   *
   * @memberof Recipe
   */
  static deleteRecipe(req, res) {
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
          }).then(() => res.status(200).json({ message: 'recipe deleted' }));
        }
      })
      .catch(() => res.status(500)
        .json({
          message: 'Internal server error.'
        }));
  }
  /**
   * @description This method returns all recipes
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   *
   * @returns {object} JSON and HTTP Status Code
   *
   * @memberof Recipe
   */
  static getAll(req, res) {
    if (!req.query.sort) {
      const limit = 6;
      const page = parseInt((req.query.page || 1), 10);
      const offset = limit * (page - 1);
      recipe.findAndCountAll({
        limit,
        offset,
        order: [
          ['id', 'DESC']
        ],
        include: [
          { model: models.User, attributes: ['firstName', 'lastName', 'imageUrl'] }
        ]
      }).then(({ rows, count }) => {
        const numberOfItems = count;
        const pages = Math.ceil(numberOfItems / limit);
        if (count === 0) {
          return res.status(404)
            .json({ message: 'There are currently no recipes in collection' });
        }
        return res.status(200)
          .json({
            numberOfItems,
            limit,
            pages,
            currentPage: page,
            recipes: rows
          });
      }).catch(() => res.status(500)
        .json({ message: 'Internal server' }));
    }
    if (req.query.sort) {
      recipe.findAll({ limit: 3 })
        .then((allRecipes) => {
          if (allRecipes) {
            if (allRecipes.length < 1) {
              return res.status(404)
                .json({
                  message: 'There are currently no recipes'
                });
            }
            const sortedRecipes = allRecipes.sort((a, b) => b.upvote - a.upvote);
            return res.status(200)
              .json({
                recipes: sortedRecipes
              });
          }
        })
        .catch(() => res.status(500)
          .json({
            message: 'Internal server error. Unable to complete request.'
          }));
    }
  }
  /**
   * @description This method returns details of only one recipe
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   *
   * @returns {object} JSON and HTTP status code
   *
   * @memberof Recipe
   */
  static viewOne(req, res) {
    recipe.findOne({
      where: { id: req.params.recipeId },
      include: [
        { model: models.User, attributes: ['firstName', 'lastName'] }
      ]
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ message: `Can't find recipe with id ${req.params.recipeId}` });
        }
        if (foundRecipe) {
          if (req.decoded) {
            if (req.decoded.id !== foundRecipe.dataValues.userId) {
              foundRecipe.increment('views');
            }
          }
          if (!req.decoded) {
            foundRecipe.increment('views');
          }
          if (req.decoded) {
            return favourite.findOne({ where:
              { recipeId: req.params.recipeId, $and: { userId: req.decoded.id } } })
              .then(foundFavourite => res.status(200).json({
                recipe: foundRecipe,
                userFavourited: (foundFavourite) ? true : false
              }));
          }
          return res.status(200)
            .json({
              recipe: foundRecipe,
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          message: 'Internal server error. Unable to complete request.'
        }));
  }
  /**
   * @description This method gets all recipes by current user
   *
   * @param {request} req HTTP request
   * @param {response} res HHTP response
   *
   * @returns {object} JSON and HTTP Status Code
   *
   * @memberof Recipe
   */
  static getAllUser(req, res) {
    const limit = 6;
    const page = parseInt((req.query.page || 1), 10);
    const offset = limit * (page - 1);
    recipe.findAndCountAll({
      where: {
        userId: req.decoded.id
      },
      limit,
      offset,
      order: [
        ['id', 'DESC']
      ],
      include: [
        { model: models.User, attributes: ['firstName', 'lastName', 'imageUrl'] }
      ]
    }).then(({ rows, count }) => {
      const numberOfItems = count;
      const pages = Math.ceil(numberOfItems / limit);
      if (count === 0) {
        return res.status(404)
          .json({ message: 'You currently have no recipe in the catalogue' });
      }
      return res.status(200)
        .json({
          numberOfItems,
          limit,
          pages,
          currentPage: page,
          recipes: rows
        });
    })
      .catch(() => res.status(500)
        .json({
          message: 'Internal server error'
        }));
  }
  /**
 *
 * @static
 *
 * @param {request} req HTTP request
 * @param {response} res HTTP response
 *
 * @returns {obj} JSON and HTTP Status code
 *
 * @memberof Recipe
 */
  static search(req, res) {
    const search = req.body.search.split(' ');
    const queryIngredient = search.map(item => ({ ingredients: { $iLike: `%${item}%` } }));
    const queryName = search.map(value => ({ name: { $iLike: `%${value}%` } }));
    recipe.findAndCountAll({
      where: {
        $or:
          queryIngredient.concat(queryName)
      }
    }).then((allSearch) => {
      let offset = 0;
      const limit = 6;
      const numberOfItems = allSearch.count;
      const page = parseInt((req.query.page || 1), 10);
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      recipe.findAll({
        where: {
          $or:
            queryIngredient.concat(queryName)
        },
        include: [
          { model: models.User, attributes: ['firstName', 'lastName'] }
        ],
        limit,
        offset,
        order: [
          ['id', 'ASC']
        ]
      }).then((foundRecipe) => {
        if (foundRecipe.length < 1) {
          return res.status(404)
            .json({
              message: 'No match(es) found'
            });
        }
        return res.status(200)
          .json({
            numberOfItems,
            pages,
            currentPage: page,
            limit,
            recipe: foundRecipe
          });
      });
    }).catch(() => res.status(500)
      .json({ message: 'Internal server error' }));
  }
}
