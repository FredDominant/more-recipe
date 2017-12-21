import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import * as passwordHelper from '../functions/encrypt';

const helper = new passwordHelper.default();
const expect = chai.expect;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm90aWZ5Ijp0cnVlLCJpYXQiOjE1MTA2ODYxNzQsImV4cCI6MTUxMDc3MjU3NH0.qntIeEqlCe5qjysqIIz_rzRsPdEMDRnSQPwJhEvNGtA';
chai.use(chaiHttp);

describe('Test for API', () => {
  models.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });
  after((done) => {
    models.User.destroy({ where: { email: 'test@test.com' } });
    models.Recipe.destroy({ where: { id: { $notIn: [1, 2, 3, 4, 5, 11] } } });
    models.Review.destroy({ where: { recipeId: [1, 2, 3, 12, 13, 14, 15, 16] } });
    models.Favourite.destroy({ where: { recipeId: { $notIn: [1, 2, 3, 4, 5] } } });
    done();
  });
  describe('encrypted password', () => {
    it('should return false for invalid password', () => {
      expect(helper.decrypt('hsdvjkshnvnkew', 'hhvcjw.fjkbwbh.wrjbfjrw')).to.equal(false);
    });
  });
  describe('GET /', () => {
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 404 for unknown routes', (done) => {
      chai.request(app)
        .post('/some/very/useless/route')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('Should return 404 for posts to undefined routes', (done) => {
      chai.request(app)
        .post('/another/undefined/route')
        .send({ random: 'random' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
    it('Should return 401 for get requests without token', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/user/all')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
  describe('POST Recipe', () => {
    it('Should return 401 for post requests without token', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send({
          id: 6,
          ownerId: 12,
          ingredients: ['something'],
          description: 'description',
          downVote: 6,
          upVote: 12
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
  describe('For Recipes', () => {
    it('should allow for adding new recipes', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', token)
        .send({ name: 'fbcjwernsvmlw', ingredients: 'wefcenf2wneirv', directions: 'weafwj2qkefk' })
        .end((err, res) => {
          expect(res.status).to.not.equal(500);
          done();
        });
    });
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Should return 200 for sorted recipes', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=up&order=des')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('API to update recipe', () => {
    it('Should return 401 for unauthorized', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .send({
          name: 'A new name',
          ingredients: 'Some ingredients',
          description: 'some new description'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  describe('Test for User', () => {
    it('should not allow unregistered user sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'jackrobinson@gmail.com',
          password: 'something'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should not allow invalid credentials sign in', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({
          email: '1234',
          password: 'something'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should not allow user with invalid token get favourites', (done) => {
      chai.request(app)
        .get('/api/v1/users/favourites')
        .set('x-access-token', 'kjsfhrehrnn.hvberbvjbej.wbvjerj')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    describe('Test for Token', () => {
      it('Should not allow user view recipe details without valid token', (done) => {
        chai.request(app)
          .get('/api/v1/recipes/1')
          .set('x-access-token', 'QEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });
    describe('Test for upvote', () => {
      it('should not allow for recipe that doesn\'t exist', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/upvote/33')
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
      it('should allow for recipe that exists', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/1/upvote')
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).to.not.equal(404);
            done();
          });
      });
    });
    describe('Test for Reviews', () => {
      before((done) => {
        models.Review.destroy({ where: { recipeId: [1, 2] } });
        done();
      });
      it('should not allow empty review contents', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/3/review')
          .set('x-access-token', token)
          .send({ content: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should not allow review for invalid recipes ', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/1444/review')
          .set('x-access-token', token)
          .send({ content: 'this is a test review' })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
      it('should allow review for valid review ', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/1/review')
          .set('x-access-token', token)
          .send({ content: 'this is a test review' })
          .end((err, res) => {
            expect(res.status).to.not.equal(401);
            done();
          });
      });
    });
    describe('Test for Recipes', () => {
      it('should not allow empty recipes', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .set('x-access-token', token)
          .send({ name: '', ingredients: '', directions: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should not allow for unauthorized recipe update', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/2')
          .set('x-access-token', token)
          .send({ name: 'random name' })
          .end((err, res) => {
            expect(res.status).to.not.equal(200);
            done();
          });
      });
    });
    describe('Test for User', () => {
      it('sign up should not allow empty user signup details', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('sign up should not allow unmatching passwords to signup', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send({ firstname: 'test', lastname: 'test', email: 'test@test.com', password: 'testtest', confirmPassword: 'testtests' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('Message').equal('Passwords don\'t match');
            done();
          });
      });
      it('should allow valid signup', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send({ firstname: 'test', lastname: 'test', email: 'test@test.com', password: 'testtest', confirmPassword: 'testtest' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('token');
            done();
          });
      });
      it('Log in should not allow for wrong password', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'kt@gmail.com', password: '12366866686' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
      it('Log in should not allow for unregistered user', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'kt@hotmail.com', password: '123456' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
      it('Update should not allow another user update', (done) => {
        chai.request(app)
          .put('/api/v1/users/update')
          .set('x-access-token', token)
          .send({ email: 'kt@hotmail.com' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });
    });
  });
});
