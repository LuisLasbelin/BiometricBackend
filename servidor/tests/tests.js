// -----------------------------------------------------------------
// Autor: Luis Belloch
// Descripcion: Tests de la base de datos y la API
// Creado: 05/10/2021
// -----------------------------------------------------------------

// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Medidas", () => {
    describe("GET /", () => {
        // Test para recibir todas las medidas
        it("deberia recibir todas las medidas", (done) => {
             chai.request(app)
                 .get('/medidas')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
        });
        // Test para recibir un usuario
        it("deberia recibir un solo usuario", (done) => {
             const id = 2;
             chai.request(app)
                 .get(`/usuario/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
        });
         
        // Test para recibir los sensores de un usuario
        it("deberia recibir los sensores de un usuario", (done) => {
             const id = 4;
             chai.request(app)
                 .get(`/sensores/usuario/${id}`)
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                    });
        });

        // Test para crear una medida
        it("deberia crear una medida", (done) => {
            const valor = 4;
            const latitud = 3.2642346;
            const longitud = 6.3253;
            const sensor = 4;
            chai.request(app)
                .post(`/medida/${valor}/${latitud}/${longitud}/${sensor}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                    });
       });
    });
});