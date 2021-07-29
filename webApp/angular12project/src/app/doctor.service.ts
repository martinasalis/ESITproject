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
    return this.http.post<Doctor>(`${baseUrl}/info`, body);
  }

  getDoctor() {
    return this.doctor;
  }

  setDoctor(doctor: Doctor) {
    this.doctor = doctor;
  }

}
