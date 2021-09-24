const request = require('supertest');
const app = require('../app');

describe('API testing', () => {
    it('Duplicated User', (done) => {
        request(app)
            .post('/insertUser')
            .send({username: "luca", password: "123"})
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual({_id: "GRSLCU97L14E281J", name: "Luca", surname:"Grassi", username:"luca",
                    password:"uTviv4aOBm", mail:"lucagra97@gmail.com", phone:"3126784433", dob:"1997-07-14", type:"DOCTOR"});
                done();
            });
    });
});
