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

  describe('Favourites endpoint should', () => {
    it('not allow unregistered users add recipe as favourites', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favourite')
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('return 404 for recipes that aren`t in catalogue', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/20/favourite')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('allow registered users add recipes as fovourites', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favourite')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('allow a user get all the recipes they favourited', (done) => {
      chai.request(app)
        .get('/api/v1/users/favourites')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('allow registered users delete recipes from fovourites', (done) => {
      chai.request(app)
        .delete('/api/v1/favourites/1/delete')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('not allow registered users delete recipes they didn`t add as fovourites', (done) => {
      chai.request(app)
        .delete('/api/v1/favourites/6/delete')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('allow registered users add recipes as fovourites', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favourite')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('allow registered users remove recipes from favourites', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favourite')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
