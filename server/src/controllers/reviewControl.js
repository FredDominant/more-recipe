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
        const newReview = {
          content,
          userId: req.decoded.id,
          recipeId: req.params.recipeId
        };
        review.create(newReview)
          .then(() => {
            recipe.findOne({
              where: { id: req.params.recipeId },
              include: [
                { model: models.User, attributes: ['firstname', 'lastname', 'email'] },
                { model: models.Review,
                  attributes: ['id', 'content'],
                  include: [
                    { model: models.User, attributes: ['firstname', 'lastname', 'picture'] }
                  ]
                }
              ]
            })
              .then(fullRecipe => res.status(201).json({ Message: 'created', Recipe: fullRecipe }));
          });
        // .catch(() => res.status(500).json({ Message: 'An error ocurred' }));
      })
      .catch(() => res.status(500)
        .json({ Message: 'Internal error ocurred. Please try again later' }));
  }
}
