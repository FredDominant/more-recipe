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
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj}status code and message
   * @memberof Vote
   */
  static upvote(req, res) {
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ message: 'recipe not found, ensure you typed correct recipe Id' });
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
            // find if recipe has been downvoted by same user
              downvote.findOne({
                where: {
                  recipeId: req.params.recipeId,
                  $and: { userId: req.decoded.id }
                },
                attributes: ['id', 'recipeId', 'userId']
              }).then((foundDownvote) => {
                if (!foundDownvote) {
                // create upvote
                  const newUpvote = {
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  };
                  upvote.create(newUpvote).then(() => {
                    recipe.findById(req.params.recipeId)
                      .then((found) => {
                        if (!found) {
                          return res.status(500)
                            .json({ Message: 'couldn\'t upvote recipe' });
                        }
                        if (found) {
                          found.increment('upvote');
                          return res.status(201)
                            .json({ Message: 'upvoted!' });
                        }
                      }).catch(() => {
                        // unable to increment recipe value
                        return res.status(500)
                          .json({ Message: 'Server error. Unable to complete vote' });
                      });
                  }).catch(() => {
                  // can't create upvote
                    return res.status(500)
                      .json({ Message: 'Server error. Unable to complete vote'  });
                  });
                }
                if (foundDownvote) {
                  downvote.destroy({
                    where: {
                      recipeId: req.params.recipeId,
                      $and: { userId: req.decoded.id }
                    }
                  }).then(() => {
                  // after destroying downvote, create upvote, increment recipe's upvote
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
                              return res.status(201)
                                .json({ Message: 'recipe upvoted' });
                            }
                            if (!existingRecipe) {
                              return res.status(500)
                                .json({ Message: 'Can\'t find recipe to increment after creation' });
                            }
                          }).catch(() => {
                            // error can't find recipe after destroying downvote
                            return res.status(500)
                              .json({ Message: 'Server error. Unable to complete vote' });
                          });
                      }).catch((error) => {
                        // error creating upvote after destroying in downvote
                        return res.status(500)
                          .json({ Message: error });
                      });
                  }).catch(() => {
                  // couldn't destroy in downvote
                    return res.status(500)
                      .json({ Message: 'Server error. Unable to complete vote'  });
                  });
                }
              }).catch(() => {
              // can't find in downvote
                return res.status(500)
                  .json({ Message: 'Server error. Unable to complete vote' });
              });
            }
            if (foundUpvote) {
              return res.status(403)
                .json({ Message: 'You already upvoted this recipe' });
            }
          }).catch(() => {
          // can't find recipe in upvote
            return res.status(500)
              .json({ Message: 'Server error. Unable to complete vote' });
          });
        }
      }).catch(() => {
      // can't find recipe
        return res.status(500)
          .json({ Message: 'Server error. Unable to complete vote' });
      });
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} any
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
            // find if recipe has been upvoted by user
              upvote.findOne({
                where: {
                  recipeId: req.params.recipeId,
                  $and: { userId: req.decoded.id }
                },
                attributes: ['id', 'recipeId', 'userId']
              }).then((foundUpvote) => {
              // if recipe has not been upvoted by user
                if (!foundUpvote) {
                // create new downvote
                  const newDownvote = {
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  };
                  downvote.create(newDownvote)
                    .then(() => {
                      recipe.findById(req.params.recipeId).then((found) => {
                        if (!found) {
                          return res.status(500)
                            .json({ Message: 'couldn\'t upvote recipe' });
                        }
                        if (found) {
                          found.increment('downvote');
                          return res.status(201)
                            .json({ Message: 'downvoted!' });
                        }
                      }).catch(() => {
                        // cant find after creating downvote
                        return res.status(500)
                          .json({ Message: 'Server error. Unable to complete vote'  });
                      });
                    }).catch(() => {
                      // can't create new new downvote
                      return res.status(500)
                        .json({ Message: 'Server error. Unable to complete vote' });
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
                              return res.status(201)
                                .json({ Message: 'recipe downvoted' });
                            }
                            if (!found) {
                              return res.status(500)
                                .json({ Message: 'Can\'t find recipe to increment after creation' });
                            }
                          }).catch(() => {
                          // error can't find recipe after destroying downvote
                            return res.status(500)
                              .json({ Message: 'Server error. Unable to complete vote' });
                          });
                      }).catch(() => {
                        // cant create after destroying
                        return res.status(500)
                          .json({ Message: 'Server error. Unable to complete vote' });
                      });
                  }).catch(() => {
                  // cant destroy upvote
                    return res.status(500)
                      .json({ Message: 'Server error. Unable to complete vote' });
                  });
                }
              }).catch(() => {
              // can't find in upvote
                return res.status(500)
                  .json({ Message: 'Server error. Unable to complete vote' });
              });
            }
            if (foundDownvote) {
              return res.status(403)
                .json({ Message: 'You already downvoted this recipe' });
            }
          }).catch(() => {
          // can't find user voted recipe in downvote
            return res.status(500)
              .json({ Message: 'Server error. Unable to complete vote' });
          });
        }
      }).catch(() => {
      // check if recipe exists
        return res.status(500)
          .json({ Message: 'Server error. Unable to complete vote' });
      });
  }
}
