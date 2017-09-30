'use strict';

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);

describe('Test for API', function () {
  describe('GET /', function () {
    it('Should return 200', function (done) {
      _chai2.default.request(_app2.default).get('/').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('Should return 404 for unknown routes', function (done) {
      _chai2.default.request(_app2.default).get('/some/very/useless/route').end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
    it('Should return 404 for posts to undefined routes', function (done) {
      _chai2.default.request(_app2.default).post('/another/undefined/route').send({ random: 'random' }).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  describe('POST recipe', function () {
    it('Should return 400 for post without recipe name', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').send({
        id: 6,
        ownerId: 12,
        ingredients: ['something'],
        description: 'description',
        downVote: 6,
        upVote: 12
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('Should return 400 for post without recipe description', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').send({
        id: 6,
        ownerId: 12,
        ingredients: ['something'],
        name: 'some name',
        downVote: 6,
        upVote: 12
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('API to Get all recipes', function () {
    it('Should return 200', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('Should return 200 for sorted recipes', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes?sort=up&order=des').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('Should return an object', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
    });
  });
  describe('API to update recipe', function () {
    it('Should return 200 if successful', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/1').send({
        name: 'A new name',
        ingredients: 'Some ingredients',
        description: 'some new description'
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('status').equal('success');
        done();
      });
    });
  });
  describe('Test for review', function () {
    it('Should return 201 if successful', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/1/review').send({
        reviewer: 6,
        content: 'Just a test content',
        recipe: 3
      }).end(function (err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });
    it('Should return 400 if empty parameters', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/1/review').send({
        content: 'Just a test content',
        recipe: 3
      }).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('API delete recipe', function () {
    it('Should return 200 for succesful delete request ', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/3').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('Should return 404 if parameter is not found', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/200').end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});