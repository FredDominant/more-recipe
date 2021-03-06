import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';
import models from '../models';
import fakeUsers from './faker/users.faker';
import fakeReviews from './faker/reviews.faker';

const expect = chai.expect;
chai.use(chaiHttp);
let userToken;

describe('Test for', () => {
  after((done) => {
    models.Review.destroy({ where: { id: { $notIn: [1] } } });
    done();
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(fakeUsers.validLogin)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  describe('Endpoints to add reviews should', () => {
    it('not allow unauthenticated users add reviews to recipes', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .send(fakeReviews.validReview)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.a('string');
          expect(res.body).to.haveOwnProperty('message').to.equal('Failed to provide token');
          done();
        });
    });
    it('not allow users add reviews to recipes that don`t exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/100/review')
        .set('x-access-token', userToken)
        .send(fakeReviews.validReview)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.a('string');
          expect(res.body).to.haveOwnProperty('message').to.equal('No recipe with id 100');
          done();
        });
    });
    it('not allow users add empty review content', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/100/review')
        .set('x-access-token', userToken)
        .send(fakeReviews.invalidReview)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.be.an('object');
          done();
        });
    });
    it('allow authenticated users with valid review content add reviews to recipes', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .set('x-access-token', userToken)
        .send(fakeReviews.validReview)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('User').to.be.an('object');
          expect(res.body).to.haveOwnProperty('content').to.a('string');
          expect(res.body).to.haveOwnProperty('id').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('userid').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('recipeid').to.not.be.a('null');
          done();
        });
    });
  });

  describe('Endpoints to get reviews should', () => {
    it('allow unauthenticated users view reviews', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1/review')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.status).to.not.equal(401);
          expect(res.status).to.not.equal(403);
          expect(res.body).to.haveOwnProperty('numberOfItems').to.be.a('number');
          expect(res.body).to.haveOwnProperty('limit').to.be.a('number');
          expect(res.body).to.haveOwnProperty('pages').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('currentPage').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('reviews').to.not.be.a('null');

          done();
        });
    });
    it('allow authenticated users view reviews', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1/review')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.status).to.not.equal(401);
          expect(res.status).to.not.equal(403);
          expect(res.body).to.haveOwnProperty('numberOfItems').to.be.a('number');
          expect(res.body).to.haveOwnProperty('limit').to.be.a('number');
          expect(res.body).to.haveOwnProperty('pages').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('currentPage').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('reviews').to.not.be.a('null');
          done();
        });
    });
  });
});
