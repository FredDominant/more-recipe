'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _database = require('../models/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Upvote = function () {
  function Upvote() {
    _classCallCheck(this, Upvote);
  }

  _createClass(Upvote, [{
    key: 'getUpvotes',
    value: function getUpvotes(req, res) {
      var compareFunct = function compareFunct(a, b) {
        b.upVote - a.upVote;
      };
      var up = [_database2.default.recipes.sort(compareFunc)];
      res.status(200).send(up);
      return this;
    }
  }]);

  return Upvote;
}();

exports.default = Upvote;