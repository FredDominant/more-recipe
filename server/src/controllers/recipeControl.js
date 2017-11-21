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
   * @param {request} req HTTP request
   * @param {request} res HTTP response
   *
   * @returns {object} JSON and HTTP status code
   * @memberof Recipe
   */
  static addRecipe(req, res) {
    const description = req.body.description;
    const directions = req.body.directions;
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const picture = req.body.recipeImage;
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
              Message: 'You already have a recipe with this name'
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
                Recipe: newRecipe
              }))
            .catch(() => res.status(500)
              .json({
                Message: 'Internal server error. Unable to complete'
              }));
        }
      })
      .catch(() => res.status(500)
        .json({
          Message: 'Internal server error. Unable to Add new recipe'
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
    const name = req.body.name;
    const description = req.body.description;
    const directions = req.body.directions;
    const ingredients = req.body.ingredients;
    const picture = req.body.recipeImage;
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
            name: name ? name.toLowerCase() : foundRecipe.dataValues.name,
            description: description ? description.toLowerCase() : foundRecipe.dataValues.description,
            ingredients: ingredients ? ingredients.toLowerCase() : foundRecipe.dataValues.ingredients,
            directions: directions ? directions.toLowerCase() : foundRecipe.dataValues.directions,
            picture: picture ? picture.trim() : foundRecipe.dataValues.picture
          };
          foundRecipe.update(newRecipe)
            .then(updatedRecipe => res.status(200)
              .json({
                Message: 'Update successful',
                Recipe: updatedRecipe
              }))
            .catch(() => res.status(500)
              .json({
                Message: 'Internal server error.'
              }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              Message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          Message: 'Internal server error. Unable to complete request'
        }));
  }
  /**
   * This method deletes a recipe
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
              Message: `Can't find recipe with id ${req.params.recipeId} by you`
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
                Message: 'recipe deleted'
              }))
            .catch(() => res.status(500)
              .json({ Message: 'Internal server error' }));
        }
        if (!foundRecipe) {
          return res.status(404)
            .json({
              Message: `Can't find recipe with id ${req.params.recipeId} by you`
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          Message: 'Internal server error.'
        }));
  }
  /**
   * This method returns all recipes
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
      recipe.findAndCountAll().then((all) => {
        const limit = 5;
        let offset = 0;
        const page = parseInt((req.query.page || 1), 10);
        const numberOfItems = all.count;
        const pages = Math.ceil(numberOfItems / limit);
        offset = limit * (page - 1);
        recipe.findAll({
          limit,
          offset,
          order: [
            ['id', 'ASC']
          ],
          include: [
            { model: models.User, attributes: ['firstname', 'lastname'] }
          ]
        })
          .then((recipes) => {
            if (recipes) {
              if (recipes.length < 1) {
                return res.status(404)
                  .json({ Message: 'There are currently no recipes in collection' });
              }
              return res.status(200)
                .json({
                  NumberOfItems: numberOfItems,
                  Limit: limit,
                  Pages: pages,
                  CurrentPage: page,
                  Recipes: recipes
                });
            }
          })
          .catch(() => res.status(500)
            .json({
              Message: 'Unable to complete request. Internal server error.'
            }));
      }).catch(() => res.status(500)
        .json({ Message: 'Internal server' }));
    }
    if (req.query.sort) {
      recipe.findAll()
        .then((allRecipes) => {
          if (allRecipes) {
            if (allRecipes.length < 1) {
              return res.status(404)
                .json({
                  Message: 'There are currently no recipes'
                });
            }
            const sortedRecipes = allRecipes.sort((a, b) => b.upvote - a.upvote);
            return res.status(200)
              .json({
                Recipes: sortedRecipes
              });
          }
        })
        .catch(() => res.status(500)
          .json({
            Message: 'Internal server error. Unable to complete request.'
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
        { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
        { model: models.Review,
          attributes: ['content'],
          include: [
            { model: models.User, attributes: ['firstname', 'lastname'] }
          ] }
      ]
    })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ Message: `Can't find recipe with id ${req.params.recipeId}` });
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
          return res.status(200)
            .json({
              Recipe: foundRecipe,
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          Message: 'Internal server error. Unable to complete request.'
        }));
  }
  /**
   * This method gets all recipes by current user
   *
   * @param {request} req HTTP request
   * @param {response} res HHTP response
   *
   * @returns {object} JSON and HTTP Status Code
   *
   * @memberof Recipe
   */
  static getAllUser(req, res) {
    recipe.findAndCountAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        { model: models.Review, attributes: ['content'] }
      ]
    }).then((allUser) => {
      const page = parseInt((req.query.page || 1), 10);
      const numberOfItems = allUser.count;
      const limit = 3;
      const pages = Math.ceil(numberOfItems / limit);
      let offset = 0;
      offset = limit * (page - 1);
      recipe.findAll({
        where: {
          userId: req.decoded.id
        },
        include: [
          { model: models.Review, attributes: ['content'] }
        ],
        limit,
        offset,
        order: [
          ['id', 'ASC']
        ]
      })
        .then((allUserRecipes) => {
          if (allUserRecipes) {
            if (allUserRecipes.length < 1) {
              return res.status(404)
                .json({ Message: 'You currently have no recipes in catalogue' });
            }
            return res.status(200)
              .json({
                NumberOfItems: numberOfItems,
                Limit: limit,
                NumberOfPages: pages,
                CurrentPage: page,
                Recipes: allUserRecipes
              });
          }
        })
        .catch(() => res.status(500)
          .json({ Message: 'Unable to find all recipes by you' }));
    }).catch(() => res.status(500)
      .json({
        Message: 'Internal server error'
      }));
  }
  /**
 *
 *
 * @static
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
      const limit = 3;
      const numberOfItems = allSearch.count;
      const page = parseInt((req.query.page || 1), 10);
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      recipe.findAll({
        where: {
          $or:
            queryIngredient.concat(queryName)
        },
        limit,
        offset,
        order: [
          ['id', 'ASC']
        ]
      }).then((foundRecipe) => {
        if (foundRecipe.length < 1) {
          return res.status(404)
            .json({
              Message: 'No match(es) found'
            });
        }
        return res.status(200)
          .json({
            NumberOfItems: numberOfItems,
            NumberOfPages: pages,
            CurrentPage: page,
            Limit: limit,
            Recipe: foundRecipe
          });
      }).catch(() => res.status(500)
        .json({ Message: 'Internal server error. Unable to complete search.' }));
    }).catch(() => res.status(500)
      .json({ Message: 'Internal server error' }));
  }
}
