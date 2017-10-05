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
   * @returns 
   * @memberof Vote
   */
  upvote(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to upvote');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    /* recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).send('Recipe doesn\'t existtt');
        }
      }).catch(() => { return res.status(500).send('Oops, Server error'); }); */
    upvote.findOne({
      where: { recipeId: req.params.recipeId },
      $and: { userId: req.decoded.id },
      attributes: ['id', 'recipeId', 'userId']
    }).then((found) => {
      if (!found) {
        downvote.findOne({
          where: {
            recipeId: req.params.recipeId,
            $and: { userId: req.decoded.id }
          },
          attributes: ['id', 'userId', 'recipeId']
        })
          .then((newfound) => {
            if (!newfound) {
              recipe.findById(req.params.recipeId)
                .then((foundRecipe) => {
                  if (!foundRecipe) {
                    return res.status(404).send('recipe doesn\'t exist');
                  }
                  foundRecipe.increment('upvote');
                  upvote.create({
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  }).then(() => {
                    return res.status(201).send('upvoted!');
                  }).catch((error) => {
                    console.log(error);
                    return res.status(500).send('error while upvoting');
                  });
                }).catch((error) => {
                  console.log(error);
                  return res.status(500).send('can\'t confirm previous votes');
                });
            }
            if (newfound) {
              downvote.destroy({
                where: {
                  recipeId: req.params.recipeId,
                  $and: { userId: req.decoded.id }
                }
              }).then(() => {
                recipe.findById(req.params.recipeId)
                  .then((foundRecipe) => {
                    if (!foundRecipe) {
                      return res.status(404).send('can\'t find recipe');
                    }
                    foundRecipe.decrement('downvote');
                    foundRecipe.increment('upvote');
                    upvote.create({
                      recipeId: req.params.recipeId,
                      userId: req.decoded.id
                    }).then(() => {
                      return res.status(201).send('upvoted!');
                    })
                      .catch(() => {
                        return res.status(500).send('destroyed but... error while upvoting'); 
                      });
                  }).catch((error) => {
                    console.log(error);
                    return res.status(500).send('can\'t confirm previous votes');
                  });
              })
                .catch(() => {
                  return res.status(500).send('unable to destroy in downvote');
                });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).send('unable to find in downvote');
          });
      }
      if (found) {
        return res.status(403).send('You already up voted this recipe');
      }
    }).catch((error) => { 
      console.log(error);
      return res.status(500).send('error');
    });

    // check recipe by user at downvote

    return this;
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Vote
   */
/*   downvote(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .send('Include ID of recipe to upvote');
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .send('Invalid recipeId. recipeId should be a number');
    }
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).send('Recipe doesn\'t exist');
        }
      }).catch(() => {
        return res.status(500).send('Server error, unable to complete request');
      });
    downvote.findOne({
      where: {
        recipeId: req.params.recipeId,
        $and: { userId: req.decoded.id },
        attributes: ['id', 'recipeId', 'userId']
      }
    }).then((found) => {
			if (!found) {
				upvote.findOne({
					where: {
						recipeId: req.params.recipeId,
						$and: { userId: req.decoded.id}
					},
				})
			}
		})
      .then((newfound) => {
        if (!newfound) {
          recipe.findById(req.params.recipeId)
            .then((foundRecipe) => {
              if (!foundRecipe) {
                return res.status(404).send('recipe doesn\'t exist');
              }
              foundRecipe.increment('downvote');
              downvote.create({
                recipeId: req.params.recipeId,
                userId: req.decoded.id
              }).then(() => {
                return res.status(201).send('downvoted!');
              }).catch(() => {
                return res.status(500).send('error while downvoting');
              });
            }).catch(() => {
              return res.status(500).send('can\'t confirm previous votes')
            });
        }
        if (newfound) {
          upvote.destroy({
            where: {
              recipeId: req.params.recipeId,
              $and: { userId: req.decoded.id }
            }
          }).then(() => {
            recipe.findById(req.params.recipeId)
              .then((foundRecipe) => {
                if (!foundRecipe) {
                  return res.status(404).send('can\'t find recipe');
                }
                foundRecipe.decrement('upvote');
                foundRecipe.increment('downvote');
                downvote.create({
                  recipeId: req.params.recipeId,
                  userId: req.decoded.id
                }).then(() => {
                  return res.status(201).send('downvoted!');
                })
                  .catch(() => {
                    return res.status(500).send('destroyed but... error')
                  });
              }).catch((error) => {
                console.log(error);
                return res.status(500).send('can\'t confir previous votes');
              });
          }).catch(() => {
            return res.status(500).send('unable to destroy in upvote');
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).send('error');
      });
    return this;
  } */
}
