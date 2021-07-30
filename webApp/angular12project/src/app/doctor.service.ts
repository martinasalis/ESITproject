import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Doctor {
  _id: String,
  mail: String,
  phone: String,
  dob: Date,
  role: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  private doctor: Doctor = {_id: '', mail: '', phone: '', dob: Date.prototype, role: ''};

  constructor(private http: HttpClient) { }

  info(_id: String) {
    const body = {_id: _id};
    return this.http.post<Doctor>(`${baseUrl}/infoDoctor`, body);
  }

  update(_id: String, doc: Doctor) {
    const body = {_id: _id, info: {_id: doc._id, mail: doc.mail, phone: doc.phone, dob: doc.dob, role: doc.role}};
    return this.http.post(`${baseUrl}/updateDoctor`, body);
  }

  delete(_id: String) {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deleteDoctor`, body);
  }

  insert(doc: Doctor) {
    const body = {_id: doc._id, mail: doc.mail, phone: doc.phone, dob: doc.dob, role: doc.role};
    return this.http.post(`${baseUrl}/insertDoctor`, body);
  }

  getDoctor() {
    return this.doctor;
  }

  setDoctor(doctor: Doctor) {
    this.doctor = doctor;
  }

}
