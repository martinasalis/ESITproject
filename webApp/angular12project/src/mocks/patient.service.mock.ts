import {Patient, PatientService} from "../app/patient.service";
import {EMPTY, Observable, of} from "rxjs";

class MockPatientService extends PatientService {

  patientMock: Patient[] = [
    {_id: "BNCCRL75P55B153R", address: "Via delle Rose 32", dor: new Date("2012-03-06"), doctor: "GRSLCU97L14E281J", board: "", description: ""},
    {_id: "FRRMRC80M08E048O", address: "Via dei Cipressi 8", dor: new Date("2008-09-20"), doctor: "SLSMTN96D60B354H", board: "", description: ""},
    {_id: "RBRRMN95L43I747W", address: "Via Amsicora 23", dor: new Date("2017-05-03"), doctor: "SLSMTN96D60B354H", board: "", description: ""},
    {_id: "NTNLBR42E01D736P", address: "Via Marco Polo 18", dor: new Date("2020-11-17"), doctor: "GRSLCU97L14E281J", board: "", description: ""},
    {_id: "FNTMRZ89T65I741T", address: "Via XX Settembrea 02", dor: new Date("2005-03-10"), doctor: "GRSLCU97L14E281J", board: "", description: ""},
    {_id: "GLLSVT68P22G912N", address: "Via Logudoro 19", dor: new Date("2006-07-08"), doctor: "SLSMTN96D60B354H", board: "", description: ""},
    {_id: "DSNGNN72B50E971L", address: "Via Matteotti 57", dor: new Date("2015-02-01"), doctor: "GRSLCU97L14E281J", board: "", description: ""},
    {_id: "MRNMRZ93C30E410S", address: "Via Genova 2", dor: new Date("2012-07-06"), doctor: "SLSMTN96D60B354H", board: "", description: ""},
    {_id: "PRSCHR74A44A859S", address: "Via Milano 15", dor: new Date("2016-05-15"), doctor: "SLSMTN96D60B354H", board: "", description: ""},
    {_id: "SPSCRI45D25F839L", address: "Via Roma 1", dor: new Date("2009-09-13"), doctor: "GRSLCU97L14E281J", board: "", description: ""}

  ];

  info(_id: String): Observable<Patient> {
    let res = this.patientMock.find(element => element._id == _id);
    if(res != undefined) {
      return of(res);
    }
    else {
      return EMPTY;
    }
  }

  insertBoard(patient: Patient, board: String): Observable<any> {
    let index = this.patientMock.findIndex(element => element._id == patient._id);
    if(index == -1){
      return of({nModified: 0, ok: 0});
    }
    else {
      this.patientMock[index].board = board;
      return of({nModified: 1, ok: 1});
    }
  }

  /*
  getBoardSensorData(patient: Patient): Observable<any> {

  }
   */

  doctorPatients(doctor: String): Observable<Patient[]> {
    let res = this.patientMock.filter(element => element.doctor == doctor);
    if(res != undefined) {
      return of(res);
    }
    else {
      return EMPTY;
    }
  }

  allPatients(): Observable<Patient[]> {
    return of(this.patientMock);
  }

  allFreePatients(): Observable<Patient[]> {
    let res = this.patientMock.filter(element => element.board == "");
    if(res != undefined) {
      return of(res);
    }
    else {
      return EMPTY;
    }
  }

  update(_id: String, pat: Patient): Observable<any> {
    let index = this.patientMock.findIndex(element => element._id == _id);
    if(index == -1){
      return of({nModified: 0, ok: 0});
    }
    else {
      this.patientMock[index] = pat;
      return of({nModified: 1, ok: 1});
    }
  }

  delete(_id: String): Observable<any> {
    let index = this.patientMock.findIndex(element => element._id == _id);
    if(index == -1){
      return of({nModified: 0, ok: 0});
    }
    else {
      this.patientMock.splice(index, 1);
      return of({nModified: 1, ok: 1});
    }
  }

  insert(pat: Patient): Observable<any> {
    this.patientMock.push(pat);
    return of({nModified: 1, ok: 1});
  }
}
