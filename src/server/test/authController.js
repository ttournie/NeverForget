/* eslint-disable import/no-extraneous-dependencies */
const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('authController', () => {
  describe('Subscribe', () => {
    it('Should return 200 and the created user', (done) => {
      chai.request(app)
        .post('/subscribe')
        .set('content-type', 'application/json')
        .send({ username: 'testUser', password: 'testPassword' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.user.should.be.a('object');
          res.body.user.should.have.property('username', 'testUser');
          done();
        });
    });
  });
  describe('Login', () => {
    it('Should return 401', (done) => {
      chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ username: 'wrongUsername', password: 'wrongPassword' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('Should return 200 and the logged user', (done) => {
      chai.request(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ username: 'testUser', password: 'testPassword' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username', 'testUser');
          done();
        });
    });
  });
  describe('Get user Info', () => {
    it('Should return 401', (done) => {
      chai.request(app)
        .get('/logged-user')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('Should return 200', (done) => {
      chai.request(app)
        .get('/logged-user')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
