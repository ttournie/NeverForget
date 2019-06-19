/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const chai = require('chai');
const controller = require('../app/controllers/noteController');
const app = require('../server');
const userModel = require('../app/models/user');
const noteModel = require('../app/models/note');
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
    it('Should return user notes array', async () => {
      const user = await userModel.findOne({ username: testData.testUser.username });
      const req = {
        user,
      };
      const send = sinon.spy();
      const res = {
        send,
      };
      await controller.getAllNotes(req, res, sinon.stub);
      send.should.have.been.calledWith(sinon.match.array);
    });
  });
  describe('Get a note', () => {
    it('Sould return 401', (done) => {
      chai.request(app)
        .get('/notes/testing')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('Should a note', async () => {
      const note = await noteModel.findOne({ title: testData.note1.title });
      const req = {
        params: {
          id: note._id,
        },
      };
      const send = sinon.spy();
      const res = {
        send,
      };
      await controller.getNote(req, res, sinon.stub);
      send.should.have.been.calledWith(sinon.match.has('title', testData.note1.title));
    });
  });
});
