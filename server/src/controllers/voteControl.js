import models from '../models';

const recipe = models.Recipe;
const upvote = models.Upvote;
const downvote = models.Downvote;

/**
 *
 * @export
 *
 * @class Vote
 */
export default class Vote {
  /**
   * @description this method handles a recipe's upvote
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code and message
   *
   * @memberof Vote
   */
  static upvote(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({ message: 'recipe not found, ensure you typed correct recipe Id' });
        }
        if (foundRecipe) {
          upvote.findOne({
            where: {
              userId: req.decoded.id,
              $and: { recipeId: req.params.recipeId }
            },
            attributes: ['id', 'recipeId', 'userId']
          }).then((foundUpvote) => {
            if (!foundUpvote) {
              downvote.findOne({
                where: {
                  recipeId: req.params.recipeId,
                  $and: { userId: req.decoded.id }
                },
                attributes: ['id', 'recipeId', 'userId']
              }).then((foundDownvote) => {
                if (!foundDownvote) {
                  const newUpvote = {
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  };
                  upvote.create(newUpvote).then(() => {
                    recipe.findById(req.params.recipeId)
                      .then((found) => {
                        if (found) {
                          found.increment('upvote');
                          recipe.findOne({
                            where: { id: req.params.recipeId },
                            include: [
                              { model: models.User, attributes: ['firstName', 'lastName'] }
                            ]
                          }).then(Recipe => res.status(201).json({ message: 'new upvote', recipe: Recipe }));
                        }
                      });
                  });
                }
                if (foundDownvote) {
                  downvote.destroy({
                    where: {
                      recipeId: req.params.recipeId,
                      $and: { userId: req.decoded.id }
                    }
                  }).then(() => {
                    const newUpvote = {
                      recipeId: req.params.recipeId,
                      userId: req.decoded.id
                    };
                    upvote.create(newUpvote)
                      .then(() => {
                        recipe.findById(req.params.recipeId)
                          .then((existingRecipe) => {
                            if (existingRecipe) {
                              existingRecipe.increment('upvote');
                              existingRecipe.decrement('downvote');
                              recipe.findOne({
                                where: { id: req.params.recipeId },
                                include: [
                                  { model: models.User, attributes: ['firstName', 'lastName'] }
                                ]
                              }).then(Recipe => res.status(200).json({ message: 'new upvote after destroying down', recipe: Recipe }));
                            }
                          });
                      });
                  });
                }
              });
            }
            if (foundUpvote) {
              upvote.destroy({
                where: { userId: req.decoded.id },
                $and: { recipeId: req.params.recipeId }
              })
                .then(() => {
                  recipe.findById(req.params.recipeId)
                    .then((updatedRecipe) => {
                      updatedRecipe.decrement('upvote');
                      recipe.findOne({
                        where: { id: req.params.recipeId },
                        include: [
                          { model: models.User, attributes: ['firstName', 'lastName'] }
                        ]
                      }).then(Recipe => res.status(200).json({ message: 'deleted upvote and decremented', recipe: Recipe }));
                    });
                });
            }
          });
        }
      })
      .catch(() => res.status(500).json({ message: 'Server error. Unable to complete vote' }));
  }
  /**
   * @description this method handles a recipe's downvote
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} any
   *
   * @memberof Vote
   */
  static downVote(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ message: 'recipe not found, ensure recipe Id is valid' });
        }
        if (foundRecipe) {
          downvote.findOne({
            where: {
              userId: req.decoded.id,
              $and: { recipeId: req.params.recipeId }
            },
            attributes: ['id', 'recipeId', 'userId']
          }).then((foundDownvote) => {
            if (!foundDownvote) {
              upvote.findOne({
                where: {
                  recipeId: req.params.recipeId,
                  $and: { userId: req.decoded.id }
                },
                attributes: ['id', 'recipeId', 'userId']
              }).then((foundUpvote) => {
                if (!foundUpvote) {
                  const newDownvote = {
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  };
                  downvote.create(newDownvote)
                    .then(() => {
                      recipe.findById(req.params.recipeId).then((found) => {
                        if (found) {
                          found.increment('downvote');
                          recipe.findOne({
                            where: { id: req.params.recipeId },
                            include: [
                              { model: models.User, attributes: ['firstName', 'lastName'] },
                            ]
                          }).then(Recipe => res.status(201).json({ message: 'created downvote', recipe: Recipe }));
                        }
                      });
                    });
                }
                if (foundUpvote) {
                  upvote.destroy({
                    where: {
                      recipeId: req.params.recipeId,
                      $and: { userId: req.decoded.id }
                    }
                  }).then(() => {
                    const newDownvote = {
                      recipeId: req.params.recipeId,
                      userId: req.decoded.id
                    };
                    downvote.create(newDownvote)
                      .then(() => {
                        recipe.findById(req.params.recipeId)
                          .then((found) => {
                            if (found) {
                              found.increment('downvote');
                              found.decrement('upvote');
                              recipe.findOne({
                                where: { id: req.params.recipeId },
                                include: [
                                  { model: models.User, attributes: ['firstName', 'lastName'] }
                                ]
                              }).then(Recipe => res.status(200).json({ message: 'Downvoted', recipe: Recipe }));
                            }
                          });
                      });
                  });
                }
              });
            }
            if (foundDownvote) {
              downvote.destroy({
                where: { userId: req.decoded.id },
                $and: { recipeId: req.params.recipeId }
              }).then(() => {
                recipe.findById(req.params.recipeId)
                  .then((updatedRecipe) => {
                    updatedRecipe.decrement('downvote');
                    recipe.findOne({
                      where: { id: req.params.recipeId },
                      include: [
                        { model: models.User, attributes: ['firstName', 'lastName'] }
                      ]
                    }).then(Recipe => res.status(200).json({ message: 'deleted downvote', recipe: Recipe }));
                  });
              });
            }
          });
        }
      }).catch(() =>
        res.status(500).json({ message: 'Server error. Unable to complete vote' })
      );
  }
}
