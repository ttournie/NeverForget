/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const chai = require('chai');
const controller = require('../app/controllers/noteController');
const app = require('../server');
const userModel = require('../app/models/user');
const testData = require('./testSetup');

chai.use(chaiHttp);
chai.use(require('sinon-chai'));

chai.should();

describe('noteController', () => {
  describe('Get user notes', () => {
    it('Sould return 401', (done) => {
      chai.request(app)
        .get('/notes')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it.skip('Should return user notes', async () => {
      const user = await userModel.findOne({ username: testData.testUser.username });
      const req = {
        user,
      };
      const res = {
        send: sinon.stub,
      };
      controller.getAllNotes(req, res);
      res.send.should.have.been.called;
    });
  });
});
