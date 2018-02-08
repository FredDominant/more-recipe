import models from '../models';

const review = models.Review;
const recipe = models.Recipe;
const user = models.User;
/**
 *
 * @export
 *
 * @class Review
 */
export default class Review {
  /**
   * @description This method adds reviews to a recipe
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response

   * @memberof Review
   *
   * @returns {object} JSON HTTP Status code
   */
  static addReview(req, res) {
    const { content } = req.body;
    recipe.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404)
            .json({ message: `No recipe with id ${req.params.recipeId}` });
        }
        const newReview = {
          content,
          userId: req.decoded.id,
          recipeId: req.params.recipeId
        };
        review.create(newReview)
          .then((reviewDetails) => {
            user.findOne({
              where: { id: req.decoded.id },
              attributes: ['firstName', 'lastName', 'imageUrl']
            }).then(foundUser => res.status(201).json({
              User: foundUser,
              content: reviewDetails.content,
              id: reviewDetails.id,
              userid: reviewDetails.userId,
              recipeid: reviewDetails.recipeId,
              updatedAt: reviewDetails.updatedAt,
              createdAt: reviewDetails.createdAt
            }));
          });
      })
      .catch(() => res.status(500)
        .json({ message: 'Internal error ocurred. Please try again later' }));
  }
  /**
   * @description returns the reviews of a particular recipe
   *
   * @param {any} req
   * @param {any} res
   *
   * @memberof Review
   *
   * @returns {JSON} json object and HTTP Response
   */
  static getReviews(req, res) {
    review.findAndCountAll({
      where: { recipeId: req.params.recipeId },
    }).then((allReviews) => {
      const page = parseInt((req.query.page || 1), 10);
      const numberOfItems = allReviews.count;
      const limit = 6;
      const pages = Math.ceil(numberOfItems / limit);
      let offset = 0;
      offset = limit * (page - 1);
      review.findAll({
        where: {
          recipeId: req.params.recipeId
        },
        include: [
          { model: models.User, attributes: ['firstName', 'lastName', 'imageUrl'] }
        ],
        limit,
        offset,
        order: [
          ['id', 'DESC']
        ]
      })
        .then((reviews) => {
          if (reviews) {
            if (reviews.length < 1) {
              return res.status(404).json({ message: 'There are currently no reviews for this recipe' });
            }
            return res.status(200)
              .json({
                numberOfItems,
                limit,
                pages,
                currentPage: page,
                reviews
              });
          }
        });
    })
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  }
}
