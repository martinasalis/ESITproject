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

  getPatient() {
    return this.patient;
  }

  setPatient(patient: Patient) {
    this.patient = patient;
  }

}
