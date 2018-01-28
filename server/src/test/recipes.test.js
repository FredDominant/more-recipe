import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';
import models from '../models';
import fakeUsers from './faker/users.faker';
import fakeRecipes from './faker/recipes.faker';

const expect = chai.expect;
chai.use(chaiHttp);
let userToken;

describe('Test for', () => {
  after((done) => {
    models.Recipe.destroy({ where: { id: { $notIn: [1, 2] } } });
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

  describe('endpoint for recipes should', () => {
    it('allow users add recipe with valid details', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', userToken)
        .send(fakeRecipes.validRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('not allow users add recipe with the same name', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', userToken)
        .send(fakeRecipes.validRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('not allow users add recipe with invalid details', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('x-access-token', userToken)
        .send(fakeRecipes.namelessRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('endpoint to update recipe should', () => {
    it('should return 400 if recipe name is too short', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('x-access-token', userToken)
        .send({ name: 'a' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('allow users update recipe they added', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set('x-access-token', userToken)
        .send(fakeRecipes.randomName)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('not allow users update recipes they didn`t add', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/5')
        .set('x-access-token', userToken)
        .send({ name: 'a new name' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('endpoint to view one recipe should', () => {
    it('allow unregistered users view recipe detail', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('not allow for recipes that don\'t exist', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1100')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('allow registered users view recipe detail', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('not allow invalid recipeId', (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/${'vggj'}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('endpoint to get all recipes should', () => {
    it('return all recipes in the catalogue', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('return sorted recipes if query is passed', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?sort=up&order=des')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('endpoint to get all recipes by a user should', () => {
    it('returan all recipes  by the user', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/user/all')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('not work for unregistered users', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/user/all')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('endpoint to search for recipe should', () => {
    it('work for all users', (done) => {
      chai.request(app)
        .post('/api/v1/search')
        .send({ search: 'lorem ipsum ' })
        .end((err, res) => {
          expect(res.status).to.not.equal(401);
          expect(res.status).to.not.equal(403);
          expect(res.status).to.not.equal(400);
          done();
        });
    });
    it('work if page query is passed', (done) => {
      chai.request(app)
        .post('/api/v1/search?page=1')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ search: 'lorem ipsum ' })
        .end((err, res) => {
          expect(res.status).to.not.equal(401);
          expect(res.status).to.not.equal(403);
          expect(res.status).to.not.equal(400);
          done();
        });
    });
  });

  describe('endpoint to delete recipe should', () => {
    it('not work for unregistered users', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });
  it('not delete if user doesn`t own recipe', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/11')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('delete if user owns recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set('x-access-token', userToken)
      .send(fakeRecipes.secondValidRecipe)
      .end(() => {
        chai.request(app)
          .delete('/api/v1/recipes/2')
          .set('x-access-token', userToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
  });
});
