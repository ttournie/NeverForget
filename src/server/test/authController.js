/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');
const app = require('../server');
const controller = require('../app/controllers/authController');
const userModel = require('../app/models/user');
const testData = require('./testSetup');

chai.use(chaiHttp);
chai.use(require('sinon-chai'));

chai.should();

describe('authController', () => {
  describe('Subscribe', () => {
    it('Should return 200 and the created user', (done) => {
      chai.request(app)
        .post('/subscribe')
        .set('content-type', 'application/json')
        .send({ username: 'Created testing', password: 'Password testing' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.user.should.be.a('object');
          res.body.user.should.have.property('username', 'Created testing');
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
        .send({ username: testData.testUser.username, password: testData.testUser.password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('username', testData.testUser.username);
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
        user: testData.testUser,
      };
      const send = sinon.spy();
      const res = {
        send,
        status: 200,
      };
      controller.getLoggedUserInfo(req, res);
      send.should.have.been.calledWith(testData.testUser);
    });
  });
  describe('Logout', () => {
    it('Should logout', () => {
      const req = {
        logout: sinon.spy(),
      };
      const res = {
        end: sinon.stub,
      };
      controller.logout(req, res);
      req.logout.should.have.been.called;
    });
  });
  after(async () => {
    await userModel.deleteOne({ username: 'Created testing' });
  });
});
