import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface Patient {
  _id: String,
  mail: String,
  phone: String,
  dob: Date,
  address: String,
  dor: Date
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private patient: Patient = {_id: '', mail: '', phone: '', dob: Date.prototype, address: '', dor: Date.prototype};

  constructor(private http: HttpClient) { }

  info(_id: String) {
    const body = {_id: _id};
    return this.http.post<Patient>(`${baseUrl}/info`, body);
  }

  getDoctorPatients(doctor: String) {
    const body = {doctor: doctor};
    return this.http.post<Patient[]>(`${baseUrl}/doctorPatients`, body);
  }

  update(_id: String, pat: Patient) {
    const body = {_id: _id, info: {_id: pat._id, mail: pat.mail, phone: pat.phone, dob: pat.dob, address: pat.address, dor: pat.dor}};
    return this.http.post(`${baseUrl}/update`, body);
  }

  delete(_id: String) {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/delete`, body);
  }

  insert(pat: Patient) {
    const body = {_id: pat._id, mail: pat.mail, phone: pat.phone, dob: pat.dob, address: pat.address, dor: pat.dor};
    return this.http.post(`${baseUrl}/insert`, body);
  }

  getPatient() {
    return this.patient;
  }

  setPatient(patient: Patient) {
    this.patient = patient;
  }

}
