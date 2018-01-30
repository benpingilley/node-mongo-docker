//Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')

// Require server for testing of API endpoints
const app = require('../server')

// Requre fuctions module for testing of individual functions
const census = require('../functions/census')
const complaints = require('../functions/complaints')

const expect = chai.expect
const should = chai.should()

chai.use(chaiHttp)

/*
describe('Endpoints', () => {
  describe('/GET birthsPer', () => {
    it('it should get births keys', (done) => {
      chai.request(app.listen())
        .get('/api/censusKeys')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).eql('Hello');
          done();
        });
    });
  });
})
*/