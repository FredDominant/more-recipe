import {db} from '../models/database';

class Upvote{
	getUpvotes(req, res){
		const compareFunct = ((a, b) => {
			b.upVote - a.upVote
		});
		const up = [db.recipes.sort(compareFunc)]
		res.status(200)
			.send(up);
		return this;
	}
};
export {Upvote};