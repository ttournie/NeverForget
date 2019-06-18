/* eslint-disable import/no-extraneous-dependencies */
const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('noteController', () => {
  describe('Get all user notes', () => {
    it('Sould return 401', (done) => {
      chai.request(app)
        .get('/notes')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
