import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';
import fakeData from './faker/users.faker';

// const helper = new passwordHelper.default();
const expect = chai.expect;
chai.use(chaiHttp);
let userToken;

describe('Test for Users', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(fakeData.validUser)
      .end(() => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send(fakeData.validLogin)
          .end((err, res) => {
            userToken = res.body.Token;
            done();
          });
      });
  });

  describe('signup should', () => {
    it('allow for valid Signup', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.validSignup)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.haveOwnProperty('Token');
          done();
        });
    });
    it('return 400 for unmatching passwords', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.unmatchingPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('return 400 for invalid signup credentials', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.missingName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('return 400 if email is already in use', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.alreadyTakenEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('Login should', () => {
    it('return 200 for a valid login', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeData.validLogin)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('return 401 for unregistered user', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeData.unregisteredLogin)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('return 400 for invalid login credentials', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeData.invalidLogin)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('Message');
          done();
        });
    });
  });

  describe('profile should', () => {
    it('return 200 for request to view profile', (done) => {
      chai.request(app)
        .get('/api/v1/users/profile')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.haveOwnProperty('User');
          done();
        });
    });
    it('return 200 for request to update profile', (done) => {
      chai.request(app)
        .put('/api/v1/users/update')
        .send({ email: 'fredadewole@email.com' })
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});