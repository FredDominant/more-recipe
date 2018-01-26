import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Test for API', () => {
  it('"/api" should return 200 for home route', (done) => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('"/api/documentation" should return 200 for API documentation route', (done) => {
    chai.request(app)
      .get('/api/documentation')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('"/some/routes" should return 404 for invalid routes', (done) => {
    chai.request(app)
      .post('/some/routes')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
