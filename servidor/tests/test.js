// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Medidas", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("deberia recibir todas las medidas", (done) => {
             chai.request(app)
                 .get('/test')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test to get single student record
        it("deberia recibir una sola medida", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/test/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to get single student record
        it("no deberia recibir ninguna medida", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/test/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});