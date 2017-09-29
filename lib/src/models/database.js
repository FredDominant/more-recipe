"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var db = [];

db.reviews = [{
	reviewId: 1,
	ownerId: 1,
	content: "A funny recipe"

}, {
	reviewId: 2,
	ownerId: 1,
	content: "A funny recipe"

}, {
	reviewId: 3,
	ownerId: 1,
	content: "A funny recipe"

}, {
	reviewId: 4,
	ownerId: 1,
	name: "A funny recipe",
	ingredients: ["rice", "beans", "yam", "salt"],
	description: "Boil everything like that."

}];

db.recipes = [{
	id: 1,
	ownerId: 1,
	name: "A funny recipe",
	ingredients: ["rice", "beans", "yam", "salt"],
	description: "Boil everything like that.",
	downVote: 7,
	upVote: 25
}, {
	id: 2,
	ownerId: 1,
	name: "Pasterous pasts",
	ingredients: ["spaghetti", "beans", "yam", "salt"],
	description: "I don't know what this is",
	downVote: 30,
	upVote: 28
}, {
	id: 3,
	ownerId: 1,
	name: "Yam and bread",
	ingredients: ["oil", "water", "yam", "pepper"],
	description: "Make everything work anyhow",
	downVote: 70,
	upVote: 6
}, {
	id: 4,
	ownerId: 2,
	name: "What is this",
	ingredients: ["Fish", "beans", "yam", "salt"],
	description: "Eat fish raw",
	downVote: 10,
	upVote: 11
}, {
	id: 5,
	ownerId: 2,
	name: "Meatballs",
	ingredients: ["diced meat", "fish", "oil", "salt"],
	description: "Fry all together",
	downVote: 3,
	upVote: 250
}];

//console.log(db.recipes[1])
exports.db = db;