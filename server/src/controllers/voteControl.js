import models from '../models';

const recipe = models.Recipe;
const upvote = models.Upvote;
const downvote = models.Downvote;

/**
 *
 *
 * @export
 * @class Vote
 */
export default class Vote {
  /**
   * @description this method handles a recipe's upvote
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @returns {obj} status code and message
   *
   * @memberof Vote
   */
  static upvote(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({ Message: 'recipe not found, ensure you typed correct recipe Id' });
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
                        if (!found) {
                          return res.status(404).json({ Message: 'recipe not found' });
                        }
                        if (found) {
                          found.increment('upvote');
                          recipe.findOne({
                            where: { id: req.params.recipeId },
                            include: [
                              { model: models.User, attributes: ['firstname', 'lastname', 'email'] }
                            ]
                          }).then(Recipe => res.status(201).json({ Message: 'new upvote', Recipe }));
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
                                  { model: models.User, attributes: ['firstname', 'lastname'] }
                                ]
                              }).then(Recipe => res.status(200).json({ Message: 'new upvote after destroying down', Recipe }));
                            }
                            if (!existingRecipe) {
                              return res.status(404).json({ Message: 'Can\'t find recipe to increment after creation' });
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
                          { model: models.User, attributes: ['firstname', 'lastname'] }
                        ]
                      }).then(Recipe => res.status(200).json({ Message: 'deleted upvote and decremented', Recipe }));
                    });
                });
            }
          });
        }
      })
      .catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
  }
  /**
   * @description this method handles a recipe's downvote
   *
   * @static
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @returns {obj} any
   *
   * @memberof Vote
   */
  static downVote(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ Message: 'recipe not found, ensure recipe Id is valid' });
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
                        if (!found) {
                          return res.status(404).json({ Message: 'couldn\'t upvote recipe' });
                        }
                        if (found) {
                          found.increment('downvote');
                          recipe.findOne({
                            where: { id: req.params.recipeId },
                            include: [
                              { model: models.User, attributes: ['firstname', 'lastname'] },
                            ]
                          }).then(Recipe => res.status(201).json({ Message: 'created downvote', Recipe }));
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
                                  { model: models.User, attributes: ['firstname', 'lastname'] }
                                ]
                              }).then(Recipe => res.status(200).json({ Message: 'Downvoted', Recipe }));
                            }
                            if (!found) {
                              return res.status(404).json({ Message: 'Can\'t find recipe' });
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
                        { model: models.User, attributes: ['firstname', 'lastname'] }
                      ]
                    }).then(Recipe => res.status(200).json({ Message: 'deleted downvote', Recipe }));
                  });
              });
            }
          });
        }
      }).catch(() =>
        res.status(500).json({ Message: 'Server error. Unable to complete vote' })
      );
  }
}
