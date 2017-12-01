downvote.findOne({
  where: {
    recipeId: req.params.id,
    userId: req.decoded.id
  }
})
  .then((foundDownvote) => {
    if (!foundDownvote) {
      const newUpvote = {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      };
      upvote.create({ newUpvote })
        .then(() => {
          recipe.findById(req.params.recipeId).then((updatedRecipe) => {
            updatedRecipe.increment('upvote');
            recipe.findById(req.params.recipeId).then(Recipe => res.status(201).json({ Message: 'Upvoted', Recipe }));
          }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
        }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
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
        upvote.create({ newUpvote })
          .then(() => {
            recipe.findById(req.params.recipeId).then((updatedRecipe) => {
              updatedRecipe.decrement('downvote');
              updatedRecipe.increment('upvote');
              recipe.findById(req.params.recipeId).then(Recipe => res.status(201).json({ Message: 'Upvoted', Recipe }));
            }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
          }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
      }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
    }
  }).catch(() => res.status(500).json({ Message: 'Internal server error' }));
