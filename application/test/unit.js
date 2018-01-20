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

// Interact with functions directly
describe('Functions', () => {})

// Interact with function through API endpoint
describe('Endpoints', () => {
  describe('/GET birthsPer', () => {
    /*it('it should get births per 2010', (done) => {
      const db = require('../functions/db')
      db.births.insert( { state:"AK", sex:"F", year:2010, name:"Sophia", occurrences:60 } )
      chai.request(app.listen())
        .get('/api/birthsPer/2010')
        .end((err, res) => {
            res.should.have.status(200);
            expect(res.text).eql('Hello');
          done();
        });
    });*/
  });
})
