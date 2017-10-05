import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import models from '../models';
import * as passwordHelper from '../functions/encrypt';

const helper = new passwordHelper.default();
const expect = chai.expect;

chai.use(chaiHttp);
let userToken;

describe('Test for API', () => {
  models.User.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true
  });
  after((done) => {
    models.User.destroy({ where: { id: { $notIn: [1, 2, 3] } } });
    models.Recipe.destroy({ where: { id: { $notIn: [12, 13, 23] } } });
    models.Review.destroy({ where: { recipeId: { $notIn: [13] } } });
    models.Favourite.destroy({ where: { recipeId: 23 } });
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
        .get('/some/very/useless/route')
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
  describe('POST recipe', () => {
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
  describe('API to Get all recipes', () => {
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
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('message').equal('Email and password don\'t match');
          done();
        });
    });
    it('Should not allow user with invalid token view recipe', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', 'kjsfhrehrnn.hvberbvjbej.wbvjerj')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('Should not allow user with invalid token get favourites', (done) => {
      chai.request(app)
        .get('/api/v1/users/2/recipes')
        .set('x-access-token', 'kjsfhrehrnn.hvberbvjbej.wbvjerj')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    describe('Test for Token', () => {
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'kt@gmail.com', password: '123456' })
          .end((err, res) => {
            userToken = res.body.token;
            done();
          });
      });
      it('Should allow user view recipe details with token', (done) => {
        chai.request(app)
          .get('/api/v1/recipes/13')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .end((err, res) => {
            expect(res.status).to.not.equal(401);
            done();
          });
      });
    });
    describe('test for upvote', () => {
      it('should not allow for recipe that doesn\'t exist', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/upvote/33')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
      it('should allow for recipe that exists', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/upvote/13')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .end((err, res) => {
            expect(res.status).to.not.equal(404);
            done();
          });
      });
    });
    describe('Test for Reviews', () => {
      it('should not allow empty review contents', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/12/review')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .send({ content: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message').equal('Add review content');
            done();
          });
      });
      it('should not allow review for invalid recipes ', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/14/review')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .send({ content: 'this is a test review' })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
      it('should allow review for valid recipes ', (done) => {
        chai.request(app)
          .post('/api/v1/recipes/23/review')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .send({ content: 'this is a test review' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            done();
          });
      });
    });
    describe('Test for Recipes', () => {
      it('should not allow empty recipes', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .send({ name: '', ingredients: '', directions: '' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message').equal('Ingredients field is empty');
            done();
          });
      });
      it('should allow for adding new recipes', (done) => {
        chai.request(app)
          .post('/api/v1/recipes')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .send({ name: 'fbcjwernsvmlw', ingredients: 'wefcenf2wneirv', directions: 'weafwj2qkefk' })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            done();
          });
      });
      it('should allow for updating recipes', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/23')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiRnJlZCIsImxhc3RuYW1lIjoiQWRld29sZSIsImVtYWlsIjoiRnJlZGFkZXdvbGVAZ21haWwuY29tIiwiaWF0IjoxNTA3MjIxNzkzLCJleHAiOjE1MDczMDgxOTN9.qYQEzG5IxW1kzChOX45brdm3Srqvbwdmo68uJDURvp0')
          .send({ name: 'random name' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
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
            expect(res.body).to.have.property('message').equal('First name field is empty');
            done();
          });
      });
      it('sign up should not allow unmatching passwords to signup', (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send({ firstname: 'test', lastname: 'test', email: 'test@test.com', password: 'testtest', confirmPassword: 'testtests' })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message').equal('Passwords don\'t match');
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
      it('Update should allow for valid updates', (done) => {
        chai.request(app)
          .put('/api/v1/users/update')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoidGhvbXNvbiIsImxhc3RuYW1lIjoia2xheSIsImVtYWlsIjoia3RAZ21haWwuY29tIiwiaWF0IjoxNTA3MTg4MDc4LCJleHAiOjE1MDcyNzQ0Nzh9.5swDz0kRnoK-scttCQUP4riVuH8BVo9xgUUdtRMRaJs')
          .send({ email: 'kt@hotmail.com' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
      it('Update should not allow for invalid updates', (done) => {
        chai.request(app)
          .put('/api/v1/users/update')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoidGhvbXNvbiIsImxhc3RuYW1lIjoia2xheSIsImVtYWlsIjoia3RAZ21haWwuY29tIiwiaWF0IjoxNTA3MTg4MDc4LCJleHAiOjE1MDcyNzQ0Nzh9.5swDz0kRnoK-scttCQUP4riVuH8BVo9xgUUdtRMRaJs')
          .send({ email: 'kt@gmail.com' })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
    describe('Test for favourites', () => {
      it('Should allow user add recipe to favourites', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/23/favourite')
          .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoidGhvbXNvbiIsImxhc3RuYW1lIjoia2xheSIsImVtYWlsIjoia3RAZ21haWwuY29tIiwiaWF0IjoxNTA3MTg4MDc4LCJleHAiOjE1MDcyNzQ0Nzh9.5swDz0kRnoK-scttCQUP4riVuH8BVo9xgUUdtRMRaJs')
          .end((err, res) => {
            expect(res.status).to.equal(201);
            done();
          });
      });
    });
  });
});
