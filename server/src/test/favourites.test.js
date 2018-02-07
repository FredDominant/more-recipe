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
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Failed to provide token');
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
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('recipe doesn\'t exist in catalogue');
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
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Recipe added to favourites');
          expect(res.body).to.haveOwnProperty('favourite');
          expect(res.body).to.haveOwnProperty('favourite').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('userFavourited').to.a('boolean');
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
          expect(res.body).to.haveOwnProperty('numberOfItems');
          expect(res.body).to.haveOwnProperty('limit');
          expect(res.body).to.haveOwnProperty('pages');
          expect(res.body).to.haveOwnProperty('recipes').to.not.be.a('null');
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
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.be.a('string');
          expect(res.body).to.haveOwnProperty('message').to.equal('Deleted recipe from favourites');
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
          expect(res.status).to.not.equal(201);
          expect(res.status).to.not.equal(200);
          expect(res.body).to.haveOwnProperty('message');
          done();
        });
    });
    it('allow registered users add recipes as fovourites', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favourite')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(201); expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Recipe added to favourites');
          expect(res.body).to.haveOwnProperty('favourite');
          expect(res.body).to.haveOwnProperty('favourite').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('userFavourited').to.equal(true);

          done();
        });
    });
    it('allow registered users remove recipes from favourites when they click again', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/favourite')
        .set('x-access-token', userToken)
        .send(fakeUsers.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Removed from favourites');
          expect(res.body).to.haveOwnProperty('userFavourited').to.a('boolean');
          expect(res.body).to.haveOwnProperty('userFavourited').to.equal(false);
          done();
        });
    });
  });
});
