import models from '../models';

const review = models.Review;
const recipe = models.Recipe;

/**
 *
 *
 * @export
 * @class Review
 */
export default class Review {
  /**
   * Thia method adds reviews to a recipe
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   *
   * @returns {object} JSON HTTP Status code
   *
   * @memberof Review
   */
  static addReview(req, res) {
    const content = req.body.content;
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ Message: `No recipe with id ${req.params.recipeId}` });
        }
        if (foundRecipe) {
          review.findOne({
            where: {
              id: req.params.recipeId,
              $and: {
                userId: req.decoded.id
              }
            }
          })
            .then((foundReview) => {
              if (!foundReview) {
                const newReview = {
                  content,
                  userId: req.decoded.id,
                  recipeId: req.params.recipeId
                };
                review.create(newReview)
                  .then((createdReview) => {
                    return res.status(201)
                      .json({
                        Review: createdReview
                      });
                  })
                  .catch(() => {
                    return res.status(500)
                      .json({
                        Message: 'Fail. Unable to add review'
                      });
                  });
              }
              if (foundReview) {
                return res.status(403)
                  .json({ Message: 'You\'ve posted a review for this recipe already' });
              }
            })
            .catch(() => {
              return res.status(500)
                .json({
                  Message: 'Fail. Unable to add review'
                });
            });
        }
      })
      .catch(() => {
        return res.status(500)
          .json({ Message: 'Internal error ocurred. Please try again later' });
      });
  }
}
