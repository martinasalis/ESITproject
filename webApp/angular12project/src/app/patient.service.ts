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
  private patients: Patient[] = [];

  constructor(private http: HttpClient) { }

  /**
   * This function get the data of a specific patients
   * @param {String} _id - Patient ID
   * @return {Patient} - Patient data
   */
  info(_id: String) {
    const body = {_id: _id};
    return this.http.post<Patient>(`${baseUrl}/infoPatient`, body);
  }

  /**
   * This function get the patients of a doctor
   * @param {String} doctor - Doctor ID
   * @return {Patient} - Data of the patients
   */
  doctorPatients(doctor: String) {
    const body = {doctor: doctor};
    return this.http.post<Patient[]>(`${baseUrl}/doctorPatients`, body);
  }

  /**
   * This function get the data of all patients
   * @return {Patient} - Data of all patients
   */
  allPatients() {
    const body = {};
    return this.http.post<Patient[]>(`${baseUrl}/allPatients`, body);
  }

  /**
   * This function update the data of a patient
   * @param {String} _id - Patient ID
   * @param {Patient} pat - New data
   */
  update(_id: String, pat: Patient) {
    const body = {_id: _id, info: {_id: pat._id, mail: pat.mail, phone: pat.phone, dob: pat.dob, address: pat.address, dor: pat.dor}};
    return this.http.post(`${baseUrl}/updatePatient`, body);
  }

  /**
   * This function delete a patient
   * @param {String} _id - Patient ID
   */
  delete(_id: String) {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deletePatient`, body);
  }

  /**
   * This function insert a new patient
   * @param {Patient} pat - New patient data
   */
  insert(pat: Patient) {
    const body = {_id: pat._id, mail: pat.mail, phone: pat.phone, dob: pat.dob, address: pat.address, dor: pat.dor};
    return this.http.post(`${baseUrl}/insertPatient`, body);
  }

  /**
   * Get patient data
   * @return {Patient} - Patient data
   */
  getPatient() {
    return this.patient;
  }

  /**
   * Set patient data
   * @param {Patient} patient - Patient data
   */
  setPatient(patient: Patient) {
    this.patient = patient;
  }

  /**
   * Get patients data of a doctor
   * @return {Patient} - Patients data
   */
  getPatients() {
    return this.patients;
  }

  /**
   * Set patients data of a doctor
   * @param {Patient} patients - Patients data
   */
  setPatients(patients: Patient[]) {
    this.patients = patients;
  }

}
