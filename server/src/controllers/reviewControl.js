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
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Review
   */
  static addReview(req, res) {
    const content = req.body.content;
    if (!content) {
      return res.status(400).json({ message: 'Add review content' });
    }
    if (!(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Include ID of recipe to review' });
    }
    if (isNaN(req.params.recipeId)) {
      return res.status(400)
        .json({ message: 'Invalid recipeId. recipeId should be a number' });
    }
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ message: `No recipe with id ${req.params.recipeId}` });
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
                  content: req.body.content,
                  userId: req.decoded.id,
                  recipeId: req.params.recipeId
                };
                review.create(newReview)
                  .then((createdReview) => {
                    return res.status(201)
                      .json({
                        status: 'Success',
                        createdReview,
                      });
                  })
                  .catch((error) => {
                    return res.status(500)
                      .json({
                        status: 'Fail. Unable to add review',
                        error,
                      });
                  });
              }
              if (foundReview) {
                return res.status(403)
                  .json({ message: 'You\'ve posted a review for this recipe already' });
              }
            })
            .catch((error) => {
              return res.status(500)
                .json({
                  status: 'Fail. Unable to add review',
                  error,
                });
            });
        }
      })
      .catch(() => {
        return res.status(500)
          .json({ message: 'Internal error ocurred. Please try again later' });
      });
  }
}
