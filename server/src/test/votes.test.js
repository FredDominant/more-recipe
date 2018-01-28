import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';
import models from '../models';
import fakeUsers from './faker/users.faker';

const expect = chai.expect;
chai.use(chaiHttp);
let userToken;

describe('Test for', () => {
  after((done) => {
    models.Upvote.destroy({ where: { id: { $notIn: [1] } } });
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
  describe('endpoint to upvote should', () => {
    it('not allow unregistered users upvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('not allow users upvote a recipe that doesn`t exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/300/upvote')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('allow users upvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('allow users cancel their upvote of a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/upvote')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('endpoint to downvote should', () => {
    it('not allow unregistered users downvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/downvote')
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('not allow users downvote a recipe that doesn`t exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/300/downvote')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('allow users downvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/downvote')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('allow users cancel their downvote of a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/downvote')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
