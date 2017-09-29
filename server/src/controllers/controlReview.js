import {db} from '../models/database';


class Review {
	addReview(req, res){
		let reviewer = req.body.reviewer;
		let content = req.body.content;
		let recipe = req.params.recipeId;
		
		if (!content) {
			return res.status(400)
				.send("Review should have a content");
		};
		
		if (content.trim().length < 1) {
				return res.status(400)
					.send("Review is empty");
		};
		
		if (!recipe || !reviewer){
			return res.status(400)
				.send("Please use a valid recipeId");
		} else {
			let newId = db.reviews.length + 1;
			let newReview = {
				reviewId: newId,
				ownerId: reviewer,
				content: content
			};
			db.reviews.push(newReview);
			return res.status(201)
				.json({
					status: "success",
					message: "Review added",
					review: newReview
				});
		}
		return this;
	}
}
export {Review};