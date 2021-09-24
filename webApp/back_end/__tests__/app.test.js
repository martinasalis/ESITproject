const request = require('supertest');
const app = require('../app');

describe('API testing', () => {
    it('Login', (done) => {
        request(app)
            .post('/login')
            .send({username: "luca", password: "123"})
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual({_id: "GRSLCU97L14E281J", name: "Luca", surname:"Grassi", username:"luca",
                    password:"uTviv4aOBm", mail:"lucagra97@gmail.com", phone:"3126784433", dob:"1997-07-14", type:"DOCTOR"});
                done();
            });
    });

    it('infoUser', (done) => {
        request(app)
            .post('/infoUser')
            .send({_id: "GRSLCU97L14E281J"})
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual({_id: "GRSLCU97L14E281J", name: "Luca", surname:"Grassi", username:"luca",
                    password:"uTviv4aOBm", mail:"lucagra97@gmail.com", phone:"3126784433", dob:"1997-07-14", type:"DOCTOR"});
                done();
            });
    });

    it('patientsData', (done) => {
        request(app)
            .post('/patientsData')
            .send({_ids: ["BNCCRL75P55B153R", "FRRMRC80M08E048O"]})
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual([{_id: "BNCCRL75P55B153R", address: "Via delle Rose 32", dor: "2012-03-06", doctor: "GRSLCU97L14E281J", board: "", description: ""},
                    {_id: "FRRMRC80M08E048O", address: "Via dei Cipressi 8", dor: "2008-09-20", doctor: "SLSMTN96D60B354H", board: "", description: ""}
                ]);
                done();
            });
    });
});
