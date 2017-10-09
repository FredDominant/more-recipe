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
   * @returns status code and message
   * @memberof Vote
   */
  static upvote(req, res) {
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
    }
    recipe.findById(req.params.recipeId).then((foundRecipe) => {
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
            // find if recipe has been downvoted by same user
            downvote.findOne({
              where: {
                recipeId: req.params.recipeId,
                $and: { userId: req.decoded.id }
              },
              attributes: ['id', 'recipeId', 'userId']
            }).then((foundDownvote) => {
              // if recipe has not been downvoted by user, create upvote, increment recipe's upvote property
              if (!foundDownvote) {
                // create upvote
                const newUpvote = {
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                };
                upvote.create(newUpvote).then(() => {
                  console.log('upvote created');
                  recipe.findById(req.params.recipeId).then((found) => {
                    if (!found) {
                      // shouldn't come to this
                      return res.status(500).json({ message: 'couldn\'t upvote recipe' });
                    }
                    if (found) {
                      found.increment('upvote');
                      return res.status(201).json({ message: 'upvoted!' });
                    }
                  }).catch((error) => {
                    // unable to increment recipe value
                    console.error(error);
                    return res.status(500).json({ message: error });
                  });
                }).catch((error) => {
                  // can't create upvote
                  console.error(error);
                  return res.status(500).json({ message: error });
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
                  upvote.create(newUpvote).then(() => {
                    recipe.findById(req.params.recipeId).then((found) => {
                      if (found) {
                        found.increment('upvote');
                        found.decrement('downvote');
                        return res.status(201).json({ message: 'recipe upvoted' });
                      }
                      if (!found) {
                        console.log('Can\'t find recipe to increment after creation');
                        return res.status(500).json({ message: 'Can\'t find recipe to increment after creation' });
                      }
                    }).catch((error) => {
                      // error can't find recipe after destroying downvote
                      console.error(error);
                      return res.status(500).json({ message: error });
                    });
                  }).catch((error) => {
                    // error creating upvote after destroying in downvote
                    console.error(error);
                    return res.status(500).json({ message: error });
                  });
                }).catch((error) => {
                  // couldn't destroy in downvote
                  console.error(error);
                  return res.status(500).json({ message: error });
                });
              }
            }).catch((error) => {
              // can't find in downvote
              console.error(error);
              return res.status(500).json({ message: error });
            });
          }
          if (foundUpvote) {
            return res.status(403).json({ message: 'You already upvoted this recipe' });
          }
        }).catch((error) => {
          // can't find recipe in upvote
          console.error(error);
          return res.status(500).json({ message: error });
        });
      }
    }).catch((error) => {
      // can't find recipe
      console.error(error);
      return res.status(500).json({ message: error });
    });
  }
  /**
   * 
   * 
   * @static
   * @param {any} req 
   * @param {any} res 
   * @memberof Vote
   */
  static downVote(req, res) {
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
    }
    recipe.findById(req.params.recipeId).then((foundRecipe) => {
      if (!foundRecipe) {
        return res.json({ message: 'recipe not found, ensure recipe Id is valid' });
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
                downvote.create(newDownvote).then(() => {
                  console.log('downvoted!');
                  recipe.findById(req.params.recipeId).then((found) => {
                    if (!found) {
                      // shouldn't come to this
                      return res.status(500).json({ message: 'couldn\'t upvote recipe' });
                    }
                    if (found) {
                      found.increment('downvote');
                      return res.status(201).json({ message: 'downvoted!' });
                    }
                  }).catch((error) => {
                    // cant find after creating downvote
                    console.error(error);
                    return res.status(500).json({ message: error });
                  });
                }).catch((error) => {
                  // can't create new new downvote
                  console.error(error);
                  return res.status(500).json({ message: error });
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
                  downvote.create(newDownvote).then(() => {
                    recipe.findById(req.params.recipeId).then((found) => {
                      if (found) {
                        found.increment('downvote');
                        found.decrement('upvote');
                        return res.status(201).json({ message: 'recipe downvoted' });
                      }
                      if (!found) {
                        console.log('Can\'t find recipe to increment after creation');
                        return res.status(500).json({ message: 'Can\'t find recipe to increment after creation' });
                      }
                    }).catch((error) => {
                      // error can't find recipe after destroying downvote
                      console.error(error);
                      return res.status(500).json({ message: error });
                    });
                  }).catch((error) => {
                    // cant create after destroying
                    console.error(error);
                    return res.status(500).json({ message: error });
                  });
                }).catch((error) => {
                  // cant destroy upvote
                  console.error(error);
                  return res.status(500).json({ message: error });
                });
              }
            }).catch((error) => {
              // can't find in upvote
              console.error(error);
              return res.status(500).json({ message: error });
            });
          }
          if (foundDownvote) {
            return res.status(403).json({ message: 'You already downvoted this recipe' });
          }
        }).catch((error) => {
          // can't find user voted recipe in downvote
          console.error(error);
          return res.status(500).json({ message: error });
        });
      }
    }).catch((error) => {
      // check if recipe exists
      console.error(error);
      return res.status(500).json({ message: error });
    });
  }
}
