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
   * @returns {obj} status code and message
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
                          return res.status(500).json({ Message: 'couldn\'t upvote recipe' });
                        }
                        if (found) {
                          found.increment('upvote');
                          recipe.findOne({
                            where: { id: req.params.recipeId },
                            include: [
                              { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                              { model: models.Review,
                                attributes: ['id', 'content'],
                                include: [
                                  { model: models.User, attributes: ['firstname', 'lastname'] }
                                ] }
                            ]
                          }).then(Recipe => res.status(201).json({ Message: 'new upvote', Recipe }));
                        }
                      }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
                  }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
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
                              recipe.findOne({
                                where: { id: req.params.recipeId },
                                include: [
                                  { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                                  { model: models.Review,
                                    attributes: ['id', 'content'],
                                    include: [
                                      { model: models.User, attributes: ['firstname', 'lastname'] }
                                    ] }
                                ]
                              }).then(Recipe => res.status(200).json({ Message: 'new upvote after destroying down', Recipe }));
                              // const upvotedRecipe = {
                              //   name: existingRecipe.dataValues.name,
                              //   description: existingRecipe.dataValues.description,
                              //   ingredients: existingRecipe.dataValues.ingredients,
                              //   directions: existingRecipe.dataValues.directions,
                              //   picture: existingRecipe.dataValues.picture,
                              //   upvote: (existingRecipe.dataValues.upvote + 1),
                              //   downvote: (existingRecipe.dataValues.downvote - 1),
                              //   views: existingRecipe.dataValues.views
                              // };
                              // return res.status(201)
                              //   .json({ Message: 'recipe upvoted', Recipe: upvotedRecipe });
                            }
                            if (!existingRecipe) {
                              return res.status(500).json({ Message: 'Can\'t find recipe to increment after creation' });
                            }
                          }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
                      }).catch(error => res.status(500).json({ Message: error }));
                  }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
                }
              }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
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
                          { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                          { model: models.Review,
                            attributes: ['id', 'content'],
                            include: [
                              { model: models.User, attributes: ['firstname', 'lastname'] }
                            ] }
                        ]
                      }).then(Recipe => res.status(200).json({ Message: 'deleted upvote and decremented', Recipe }));
                    }).catch(() => res.status.json({ Message: 'Internal server error' }));
                }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
              // return res.status(403)
              //   .json({ Message: 'You already upvoted this recipe' });
            }
          }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
        }
      }).catch(() => res.status(500).json({ Message: 'Server error. Unable to complete vote' }));
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
                          recipe.findOne({
                            where: { id: req.params.recipeId },
                            include: [
                              { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                              { model: models.Review,
                                attributes: ['id', 'content'],
                                include: [
                                  { model: models.User, attributes: ['firstname', 'lastname'] }
                                ] }
                            ]
                          }).then(Recipe => res.status(201).json({ Message: 'created downvote', Recipe }));
                          // return res.status(201)
                          //   .json({ Message: 'downvoted!' });
                        }
                      }).catch(() =>
                      // cant find after creating downvote
                        res.status(500)
                          .json({ Message: 'Server error. Unable to complete vote' })
                      );
                    }).catch(() =>
                    // can't create new new downvote
                      res.status(500)
                        .json({ Message: 'Server error. Unable to complete vote' })
                    );
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
                                  { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                                  { model: models.Review,
                                    attributes: ['id', 'content'],
                                    include: [
                                      { model: models.User, attributes: ['firstname', 'lastname'] }
                                    ] }
                                ]
                              }).then(Recipe => res.status(200).json({ Message: 'incremented downvote after destroying up', Recipe }));
                              // return res.status(201)
                              //   .json({ Message: 'recipe downvoted' });
                            }
                            if (!found) {
                              return res.status(500)
                                .json({ Message: 'Can\'t find recipe to increment after creation' });
                            }
                          }).catch(() =>
                            // error can't find recipe after destroying downvote
                            res.status(500)
                              .json({ Message: 'Server error. Unable to complete vote' })
                          );
                      }).catch(() =>
                      // cant create after destroying
                        res.status(500)
                          .json({ Message: 'Server error. Unable to complete vote' })
                      );
                  }).catch(() =>
                    // cant destroy upvote
                    res.status(500)
                      .json({ Message: 'Server error. Unable to complete vote' })
                  );
                }
              }).catch(() =>
                // can't find in upvote
                res.status(500)
                  .json({ Message: 'Server error. Unable to complete vote' })
              );
            }
            if (foundDownvote) {
              downvote.destroy({
                where: { userId: req.decoded.id },
                $and: { recipeId: req.params.recipeId }
              })
                .then(() => {
                  recipe.findById(req.params.recipeId)
                    .then((updatedRecipe) => {
                      updatedRecipe.decrement('downvote');
                      recipe.findOne({
                        where: { id: req.params.recipeId },
                        include: [
                          { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                          { model: models.Review,
                            attributes: ['id', 'content'],
                            include: [
                              { model: models.User, attributes: ['firstname', 'lastname'] }
                            ] }
                        ]
                      }).then(Recipe => res.status(200).json({ Message: 'deleted downvote and decremented', Recipe }));
                    }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
                }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
              // return res.status(403)
              //   .json({ Message: 'You already downvoted this recipe' });
            }
          }).catch(() =>
            // can't find user voted recipe in downvote
            res.status(500)
              .json({ Message: 'Server error. Unable to complete vote' })
          );
        }
      }).catch(() =>
        // check if recipe exists
        res.status(500)
          .json({ Message: 'Server error. Unable to complete vote' })
      );
  }
}
