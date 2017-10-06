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
  static upvote(req, res) {
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to upvote' });
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
    }
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
                    return res.status(404).json({ message: 'recipe doesn\'t exist' });
                  }
                  foundRecipe.increment('upvote');
                  upvote.create({
                    recipeId: req.params.recipeId,
                    userId: req.decoded.id
                  }).then(() => {
                    return res.status(201).json({ message: 'upvoted!' });
                  }).catch((error) => {
                    console.log(error);
                    return res.status(500).json({ message: 'error while upvoting' });
                  });
                }).catch((error) => {
                  console.log(error);
                  return res.status(500).json({ message: 'can\'t confirm previous votes' });
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
                      return res.status(404).json({ message: 'can\'t find recipe' });
                    }
                    foundRecipe.decrement('downvote');
                    foundRecipe.increment('upvote');
                    upvote.create({
                      recipeId: req.params.recipeId,
                      userId: req.decoded.id
                    }).then(() => {
                      return res.status(201).json({ message: 'upvoted!' });
                    })
                      .catch(() => {
                        return res.status(500).json({ message: 'destroyed but... error while upvoting' });
                      });
                  }).catch((error) => {
                    console.log(error);
                    return res.status(500).json({ message: 'can\'t confirm previous votes' });
                  });
              })
                .catch(() => {
                  return res.status(500).json({ message: 'unable to destroy in downvote' });
                });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: 'unable to find in downvote' });
          });
      } else {
        return res.status(403).json({ message: 'You already up voted this recipe' });
      }
    }).catch((error) => { 
      console.log(error);
      return res.status(500).json({ message: 'internal server error' });
    });

  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof Vote
   */
}
