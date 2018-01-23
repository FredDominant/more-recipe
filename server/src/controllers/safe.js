static updateRecipe(req, res) {
	const name = req.body.name;
	const description = req.body.description;
	const directions = req.body.directions;
	const ingredients = req.body.ingredients;
	const picture = req.body.picture;
	recipe.findOne({
		where: {
			id: req.params.recipeId,
			$and: {
				userId: req.decoded.id
			}
		}
	})
		.then((foundRecipe) => {
			if (foundRecipe) {
				const newRecipe = {
					name: name ? req.body.name.trim().toLowerCase() : foundRecipe.dataValues.name,
					description: description ? description.trim().toLowerCase() : foundRecipe.dataValues.description,
					ingredients: ingredients ? ingredients.trim().toLowerCase() : foundRecipe.dataValues.ingredients,
					directions: directions ? directions.trim().toLowerCase() : foundRecipe.dataValues.directions,
					picture: picture ? picture.trim() : foundRecipe.dataValues.picture
				};
				foundRecipe.update(newRecipe)
					.then(updatedRecipe => res.status(200)
						.json({
							Message: 'Update successful',
							Recipe: updatedRecipe
						}));
			}
			if (!foundRecipe) {
				return res.status(404)
					.json({
						Message: `Can't find recipe with id ${req.params.recipeId} by you`
					});
			}
		})
		.catch(() => {
			res.status(500)
				.json({
					Message: 'Internal server error. Unable to complete request'
				});
		});
}