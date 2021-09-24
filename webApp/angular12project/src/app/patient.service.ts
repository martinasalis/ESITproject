import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Patient {
  _id: String,
  address: String,
  dor: Date,
  doctor: String,
  board: String,
  description: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patient: Patient = {_id: '', address: '', dor: Date.prototype, doctor: '', board: '', description: ''};
  private patients: Patient[] = [];

  constructor(private http: HttpClient) { }

  /**
   * This function get the data of a specific patients
   * @param {String} _id - Patient ID
   * @return {Patient} - Patient data
   */
  info(_id: String): Observable<Patient> {
    const body = {_id: _id};
    return this.http.post<Patient>(`${baseUrl}/infoPatient`, body);
  }

  /**
   * This function insert new patient's board
   * @param {Patient} patient - Patient data
   * @param {String} board - Board's MAC
   */
  insertBoard(patient: Patient, board: String): Observable<any> {
    const body = {patient: patient, board: board};
    return this.http.post(`${baseUrl}/insertPatientBoard`, body);
  }

  /**
   * Get data of sensors
   * @param {Patient} patient - Patient's data
   * @return - Sensors data
   */
  getBoardSensorData(patient: Patient): Observable<any> {
    const body = {board: patient.board};
    return this.http.post<any>(`${baseUrl}/boardSensorData`, body);
  }

  /**
   * This function get the patients of a doctor
   * @param {String} doctor - Doctor ID
   * @return {Patient[]} - Data of the patients
   */
  doctorPatients(doctor: String): Observable<Patient[]> {
    const body = {doctor: doctor};
    return this.http.post<Patient[]>(`${baseUrl}/doctorPatients`, body);
  }

  /**
   * This function get the data of all patients
   * @return {Patient[]} - Data of all patients
   */
  allPatients(): Observable<Patient[]> {
    const body = {};
    return this.http.post<Patient[]>(`${baseUrl}/allPatients`, body);
  }

  /**
   * This function get the data of all patients with no board associate
   * @return {Patient[]} - Data of all patients
   */
  allFreePatients(): Observable<Patient[]> {
    const body = {};
    return this.http.post<Patient[]>(`${baseUrl}/allFreePatients`, body);
  }

  /**
   * This function update the data of a patient
   * @param {String} _id - Patient ID
   * @param {Patient} pat - New data
   */
  update(_id: String, pat: Patient): Observable<any> {
    const body = {_id: _id, info: {_id: pat._id, address: pat.address, dor: pat.dor, doctor: pat.doctor,
        board: pat.board, description: pat.description}};
    return this.http.post(`${baseUrl}/updatePatient`, body);
  }

  /**
   * This function delete a patient
   * @param {String} _id - Patient ID
   */
  delete(_id: String): Observable<any> {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deletePatient`, body);
  }

  /**
   * This function insert a new patient
   * @param {Patient} pat - New patient data
   */
  insert(pat: Patient): Observable<any> {
    const body = {_id: pat._id, address: pat.address, dor: pat.dor, doctor: pat.doctor, board: pat.board,
      description: pat.description};
    return this.http.post(`${baseUrl}/insertPatient`, body);
  }

  /**
   * Get patient data
   * @return {Patient} - Patient data
   */
  getPatient(): Patient {
    return this.patient;
  }

  /**
   * Set patient data
   * @param {Patient} patient - Patient data
   */
  setPatient(patient: Patient): void {
    this.patient = patient;
  }

  /**
   * Get patients data of a doctor
   * @return {Patient[]} - Patients data
   */
  getPatients(): Patient[] {
    return this.patients;
  }

  /**
   * Set patients data of a doctor
   * @param {Patient} patients - Patients data
   */
  setPatients(patients: Patient[]): void {
    this.patients = patients;
  }

}
