import {Doctor, DoctorService, Notice} from "../app/doctor.service";
import {EMPTY, Observable, of} from "rxjs";

class MockDoctorService extends DoctorService {

  doctorMock: Doctor[] = [
    {_id: "GRSNCL04M30E281N", role: "doctor", notice: Notice.SMS},
    {_id: "GRSLNE00R53E281N", role: "doctor", notice: Notice.MAIL},
    {_id: "RSSMRA66D01A001J", role: "doctor", notice: Notice.MAIL},
    {_id: "SLSMTN96D60B354H", role: "doctor", notice: Notice.SMS},
    {_id: "GRSLCU97L14E281J", role: "doctor", notice: Notice.MAIL}
  ];

  info(_id: String): Observable<Doctor> {
    let res = this.doctorMock.find(element => element._id == _id);
    if(res != undefined) {
      return of(res);
    }
    else {
      return EMPTY;
    }
  }

  allDoctors(): Observable<Doctor[]> {
    return of (this.doctorMock);
  }

  updateNotice(_id: String, notice: String): Observable<any> {
    let index = this.doctorMock.findIndex(element => element._id == _id);
    if(index == -1){
      return of({nModified: 0, ok: 0});
    }
    else {
      if (notice == "SMS") {
        this.doctorMock[index].notice = Notice.SMS;

      } else {
        this.doctorMock[index].notice = Notice.MAIL;
      }
      return of({nModified: 1, ok: 1});
    }
  }

  update(_id: String, doc: Doctor): Observable<any> {
    let index = this.doctorMock.findIndex(element => element._id == _id);
    if(index == -1){
      return of({nModified: 0, ok: 0});
    }
    else {
      this.doctorMock[index] = doc;
      return of({nModified: 1, ok: 1});
    }
  }

  delete(_id: String): Observable<any> {
    let index = this.doctorMock.findIndex(element => element._id == _id);
    if(index == -1){
      return of({nModified: 0, ok: 0});
    }
    else {
      this.doctorMock.splice(index, 1);
      return of({nModified: 1, ok: 1});
    }
  }

  insert(doc: Doctor, mail: String, phone: String): Observable<any> {
    this.doctorMock.push(doc);
    return of({nModified: 1, ok: 1});
  }
}
