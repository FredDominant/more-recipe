"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Review = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require("../models/database");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Review = function () {
  function Review() {
    _classCallCheck(this, Review);
  }

  _createClass(Review, [{
    key: "addReview",
    value: function addReview(req, res) {
      var reviewer = req.body.reviewer;
      var content = req.body.content;
      var recipe = req.params.recipeId;

      if (!content) {
        return res.status(400).send("Review should have a content");
      };

      if (content.trim().length < 1) {
        return res.status(400).send("Review is empty");
      };

      if (!recipe || !reviewer) {
        return res.status(400).send("Please use a valid recipeId");
      }
      var newId = _database2.default.reviews.length + 1;
      var newReview = {
        reviewId: newId,
        ownerId: reviewer,
        content: content
      };
      _database2.default.reviews.push(newReview);
      return res.status(201).json({
        status: "success",
        message: "Review added",
        review: newReview
      });

      return this;
    }
  }]);

  return Review;
}();

exports.Review = Review;