import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PatientSensor {
  _id: String,
  patient: String,
  sensor: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PatientSensorService {

  constructor(private http: HttpClient) { }

  patientSensors(patient: String) {
    const body = {patient: patient};
    return this.http.post<PatientSensor[]>(`${baseUrl}/patientSensors`, body);
  }

  allPatientSensors() {
    const body = {};
    return this.http.post<PatientSensor[]>(`${baseUrl}/appPatientSensors`, body);
  }

}
