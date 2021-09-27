const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require('../index');
const User = require('../app/models/user');
const Doctor = require('../app/models/doctor');
const Patient = require('../app/models/patient');
const Sensor = require('../app/models/sensor');

beforeEach((done) => {
    jest.setTimeout(10000);
    mongoose.connect("mongodb://localhost:27017/TestDB",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

describe('Insert new user', () => {
    it('Insert new patient in patients collection', async () => {
        const patient = {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32",
            dor: new Date("2012-03-06").toISOString(), doctor: "GRSLCU97L14E281J", board: "40:F5:20:05:16:37",
            description: ""};

        let res = await supertest(app).post('/insertPatient').send(patient);

        expect(res.body).toEqual([patient]);
    });

    it('Insert new user in users collection', async () => {
        const user = {_id: "BNCCRL75P55B153R", name: "Carla", surname: "Bianchi", username: "carla", password: "",
            mail: "lucagra97@gmail.com", phone: "3248900776", dob: new Date("1975-09-15"), type: "PATIENT"};

        let res = await supertest(app).post('/insertUser').send(user);

        expect(res.body[0]._id).toEqual(user._id);
        expect(res.body[0].name).toEqual(user.name);
        expect(res.body[0].surname).toEqual(user.surname);
        expect(res.body[0].username).toEqual(user.username);
        expect(res.body[0].mail).toEqual(user.mail);
    });

    it('Insert new doctor in doctors collection', async () => {
        const doctor = {_id: "GRSNCL04M30E281N", role: "doctor", notice: "SMS"};

        let res = await supertest(app).post('/insertDoctor').send(doctor);

        expect(res.body).toEqual([doctor]);
    });
});

describe('Insert new sensor', () => {
    it('Insert new sensor in sensors collection', async () => {
        const sensor = {name: "Temperature", um: "C°", threshold: 0, board: "", type: 2};

        let res = await supertest(app).post('/insertSensor').send(sensor);

        expect(res.body[0].name).toEqual(sensor.name);
        expect(res.body[0].um).toEqual(sensor.um);
        expect(res.body[0].threshold).toEqual(sensor.threshold);
        expect(res.body[0].board).toEqual(sensor.board);
        expect(res.body[0].type).toEqual(sensor.type);
    });
});

describe('Reject duplicated user', () => {
    it('Reject duplicated user in users collection', async () => {
        const user = {_id: "BNCCRL75P55B153R", name: "Carla", surname: "Bianchi", username: "carla", password: "",
            mail: "lucagra97@gmail.com", phone: "3248900776", dob: new Date("1975-09-15"), type: "PATIENT"};

        let res_1 = await supertest(app).post('/insertUser').send(user);

        expect(res_1.body[0]._id).toEqual(user._id);

        let res_2 = await supertest(app).post('/insertUser').send(user);

        expect(res_2.body[0]).toEqual(undefined);
    });

    it('Reject duplicated doctor in doctors collection', async () => {
        const doctor = {_id: "GRSNCL04M30E281N", role: "doctor", notice: "SMS"};

        let res_1 = await supertest(app).post('/insertDoctor').send(doctor);

        expect(res_1.body[0]).toEqual(doctor);

        let res_2 = await supertest(app).post('/insertDoctor').send(doctor);

        expect(res_2.body[0]).toEqual(undefined);
    });

    it('Reject duplicated patient in patients collection', async () => {
        const patient = {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32",
            dor: new Date("2012-03-06").toISOString(), doctor: "GRSLCU97L14E281J", board: "40:F5:20:05:16:37",
            description: ""};

        let res_1 = await supertest(app).post('/insertPatient').send(patient);

        expect(res_1.body[0]).toEqual(patient);

        let res_2 = await supertest(app).post('/insertPatient').send(patient);

        expect(res_2.body[0]).toEqual(undefined);
    });
});

describe('Modify user', () => {
    it('Modify user in users collection', async () => {
        const user = {_id: "BNCCRL75P55B153R", name: "Carla", surname: "Bianchi", username: "carla", password: "",
            mail: "lucagra97@gmail.com", phone: "3248900776", dob: new Date("1975-09-15"), type: "PATIENT"};

        let res = await supertest(app).post('/insertUser').send(user);

        expect(res.body[0]._id).toEqual(user._id);

        const new_user = {_id: "BNCCRL75P55B153R", name: "Carla", surname: "Bianchi", username: "carla_bianchi", password: "",
            mail: "lucagra97@gmail.com", phone: "3248900776", dob: new Date("1975-09-15"), type: "PATIENT"};

        let new_res = await supertest(app).post('/updateUser').send({_id: new_user._id, info: new_user});

        expect(new_res.body).toEqual(1);
    });

    it('Modify patient in patients collection', async () => {
        const patient = {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32",
            dor: new Date("2012-03-06").toISOString(), doctor: "GRSLCU97L14E281J", board: "40:F5:20:05:16:37",
            description: ""};

        let res = await supertest(app).post('/insertPatient').send(patient);

        expect(res.body[0]).toEqual(patient);

        const new_patient = {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32",
            dor: new Date("2012-03-07").toISOString(), doctor: "SLSMTN96D60B354H", board: "40:F5:20:05:16:37",
            description: ""};

        let new_res = await supertest(app).post('/updatePatient').send({_id: new_patient._id, info: new_patient});

        expect(new_res.body).toEqual(1);
    });

    it('Modify doctor in doctors collection', async () => {
        const doctor = {_id: "GRSNCL04M30E281N", role: "doctor", notice: "SMS"};

        let res = await supertest(app).post('/insertDoctor').send(doctor);

        expect(res.body[0]).toEqual(doctor);

        const new_doctor = {_id: "GRSNCL04M30E281N", role: "Medico", notice: "SMS"};

        let new_res = await supertest(app).post('/updateDoctor').send({_id: new_doctor._id, info: new_doctor});

        expect(new_res.body).toEqual(1);
    });
});

describe('Modify sensor', () => {
    it('Modify sensor in sensors collection', async () => {
        const sensor = {name: "Temperature", um: "C°", threshold: 0, board: "", type: 2};

        let res = await supertest(app).post('/insertSensor').send(sensor);

        expect(res.body[0].name).toEqual(sensor.name);
        expect(res.body[0].um).toEqual(sensor.um);
        expect(res.body[0].threshold).toEqual(sensor.threshold);
        expect(res.body[0].board).toEqual(sensor.board);
        expect(res.body[0].type).toEqual(sensor.type);

        const new_sensor = {name: "Temp", um: "C°", threshold: 0, board: "", type: 2};

        let new_res = await supertest(app).post('/updateSensor').send({_id: res.body[0]._id, info: new_sensor});

        expect(new_res.body.ok).toEqual(1);
    });
});

describe('Modify patient board', () => {
    it('Modify patient board', async () => {
        const patient = {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32",
            dor: new Date("2012-03-06").toISOString(), doctor: "GRSLCU97L14E281J", board: "", description: ""};

        let res = await supertest(app).post('/insertPatient').send(patient);

        expect(res.body[0]).toEqual(patient);

        let new_res = await supertest(app).post('/insertPatientBoard').send({patient: patient, board: "40:F5:20:05:16:37"});

        expect(new_res.body.ok).toEqual(1);
    });
});

describe('Delete user', () => {
    it('Delete user in users collection', async () => {
        const user = {_id: "BNCCRL75P55B153R", name: "Carla", surname: "Bianchi", username: "carla", password: "",
            mail: "lucagra97@gmail.com", phone: "3248900776", dob: new Date("1975-09-15"), type: "PATIENT"};

        let res = await supertest(app).post('/insertUser').send(user);

        expect(res.body[0]._id).toEqual(user._id);

        let delete_res = await supertest(app).post('/deleteUser').send({_id: user._id});

        expect(delete_res.body).toEqual(1);
    });

    it('Delete patient in patients collection', async () => {
        const patient = {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32",
            dor: new Date("2012-03-06").toISOString(), doctor: "GRSLCU97L14E281J", board: "40:F5:20:05:16:37",
            description: ""};

        let res = await supertest(app).post('/insertPatient').send(patient);

        expect(res.body[0]).toEqual(patient);

        let delete_res = await supertest(app).post('/deletePatient').send({_id: patient._id});

        expect(delete_res.body).toEqual(1);
    });

    it('Delete doctor in doctors collection', async () => {
        const doctor = {_id: "GRSNCL04M30E281N", role: "doctor", notice: "SMS"};

        let res = await supertest(app).post('/insertDoctor').send(doctor);

        expect(res.body[0]).toEqual(doctor);

        let delete_res = await supertest(app).post('/deleteDoctor').send({_id: doctor._id});

        expect(delete_res.body).toEqual(1);
    });
});

describe('Delete sensor', () => {
    it('Delete sensor in sensors collection', async () => {
        const sensor = {name: "Temperature", um: "C°", threshold: 0, board: "", type: 2};

        let res = await supertest(app).post('/insertSensor').send(sensor);

        expect(res.body[0].name).toEqual(sensor.name);
        expect(res.body[0].um).toEqual(sensor.um);
        expect(res.body[0].threshold).toEqual(sensor.threshold);
        expect(res.body[0].board).toEqual(sensor.board);
        expect(res.body[0].type).toEqual(sensor.type);

        let delete_res = await supertest(app).post('/deleteSensor').send({_id: res.body[0]._id});

        expect(delete_res.body).toEqual(1);
    });
});

describe('Modify doctor notice in doctors collection', () => {
    it('Modify doctor notice in doctors collection', async () => {
        const user = {_id: "GRSNCL04M30E281N", name: "Carla", surname: "Bianchi", username: "carla", password: "",
            mail: "lucagra97@gmail.com", phone: "3248900776", dob: new Date("1975-09-15"), type: "PATIENT"};

        await supertest(app).post('/insertUser').send(user);

        const doctor = {_id: "GRSNCL04M30E281N", role: "doctor", notice: "SMS"};

        let res = await supertest(app).post('/insertDoctor').send(doctor);

        expect(res.body[0]).toEqual(doctor);

        let new_res = await supertest(app).post('/updateNotice').send({_id: doctor._id, notice: "E-MAIL"});

        expect(new_res.body).toEqual(1);
    });
});
