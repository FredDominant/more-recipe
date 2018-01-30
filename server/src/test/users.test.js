import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';
import fakeData from './faker/users.faker';

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
            userToken = res.body.token;
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
          expect(res.body).to.haveOwnProperty('token').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('user').to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('Account created');
          done();
        });
    });
    it('return 400 for unmatching passwords', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.unmatchingPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.not.haveOwnProperty('token');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Passwords don\'t match');
          done();
        });
    });
    it('return 400 for invalid signup credentials', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.missingName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.be.an('object');
          done();
        });
    });
    it('return 401 for incorrect password', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'fredadewole@email.com', password: '1111111111' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.be.a('string');
          expect(res.body).to.haveOwnProperty('message').to.equal('Invalid login credentials');
          done();
        });
    });
    it('return 400 if email is already in use', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(fakeData.alreadyTakenEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.be.an('object');
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
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('token');
          expect(res.body).to.haveOwnProperty('token').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('user');
          expect(res.body).to.haveOwnProperty('user').to.be.an('object');
          expect(res.body).to.haveOwnProperty('message').to.equal('You\'re now logged in');
          done();
        });
    });
    it('return 401 for unregistered user', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeData.unregisteredLogin)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Invalid login credentials');
          done();
        });
    });
    it('return 400 for invalid login credentials', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(fakeData.invalidLogin)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.be.an('object');
          done();
        });
    });
  });
  describe('Verify email', () => {
    it('should not return 404 when registered user resets password', (done) => {
      chai.request(app)
        .post('/api/v1/users/recover-email')
        .set('x-access-token', userToken)
        .send({ email: 'fredadewole@email.com' })
        .end((err, res) => {
          expect(res.status).to.not.equal(404);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          done();
        });
    });
    it('should return 404 when an uregistered user resets password', (done) => {
      chai.request(app)
        .post('/api/v1/users/recover-email')
        .set('x-access-token', userToken)
        .send({ email: 'random@email.com' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('message').to.equal('Email not found');
          done();
        });
    });
  });
  describe('Endpoint to reset password', () => {
    it('should return 400 if passwords don\'t match', (done) => {
      chai.request(app)
        .put('/api/users/reset-password')
        .set('x-access-token', userToken)
        .send({ password: '111111', confirmPassword: '123456' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.be.a('string');
          expect(res.body).to.haveOwnProperty('message').to.equal('Passwords don\'t match');
          done();
        });
    });
    it('should return 400 if passwords are less than 6 characters', (done) => {
      chai.request(app)
        .put('/api/users/reset-password')
        .set('x-access-token', userToken)
        .send({ password: '11', confirmPassword: '11' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.haveOwnProperty('message');
          expect(res.body).to.haveOwnProperty('message').to.be.a('object');
          done();
        });
    });
    it('should not give an error if passwords match', (done) => {
      chai.request(app)
        .put('/api/users/reset-password')
        .set('x-access-token', userToken)
        .send({ password: '123456', confirmPassword: '123456' })
        .end((err, res) => {
          expect(res.status).to.not.equal(401);
          expect(res.status).to.not.equal(400);
          expect(res.body).to.haveOwnProperty('message');
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
          expect(res.body).to.haveOwnProperty('user');
          expect(res.body).to.haveOwnProperty('user').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('user').be.an('object');

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
          expect(res.body).to.haveOwnProperty('user');
          expect(res.body).to.haveOwnProperty('user').to.not.be.a('null');
          expect(res.body).to.haveOwnProperty('user').be.an('object');
          done();
        });
    });
  });
});
