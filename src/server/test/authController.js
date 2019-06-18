/* eslint-disable import/no-extraneous-dependencies */
const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');
const app = require('../server');
const controller = require('../app/controllers/authController');

chai.use(chaiHttp);
chai.use(require('sinon-chai'));

chai.should();

const testUser = {
  username: 'testUser',
  password: 'testPassword',
};

describe('authController', () => {
  describe('Subscribe', () => {
    it('Should return 200 and the created user', (done) => {
      chai.request(app)
        .post('/subscribe')
        .set('content-type', 'application/json')
        .send({ username: testUser.username, password: testUser.password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.user.should.be.a('object');
          res.body.user.should.have.property('username', testUser.username);
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
        .send({ username: testUser.username, password: testUser.password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username', testUser.username);
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
    it('Should return the req user', () => {
      const req = {
        isAuthenticated: sinon.fake.returns(true),
        user: testUser,
      };
      const send = sinon.spy();
      const res = {
        send,
        status: 200,
      };
      controller.getLoggedUserInfo(req, res);
      send.should.have.been.calledWith(testUser);
    });
  });
});
