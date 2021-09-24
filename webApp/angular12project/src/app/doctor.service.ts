import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export enum Notice {
  DEFAULT = 'DEFAULT',
  MAIL = 'E-MAIL',
  SMS = 'SMS'
}

export interface Doctor {
  _id: String,
  role: String,
  notice: Notice
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctor: Doctor = {_id: '', role: '', notice: Notice.DEFAULT};

  constructor(private http: HttpClient) { }

  /**
   * This function get doctor data
   * @param {String} _id - Doctor ID
   * @return {Doctor} - Doctor data
   */
  info(_id: String): Observable<Doctor> {
    const body = {_id: _id};
    return this.http.post<Doctor>(`${baseUrl}/infoDoctor`, body);
  }

  /**
   * This function return all doctors
   * @return {Doctor[]} - All doctors
   */
  allDoctors(): Observable<Doctor[]> {
    const body = {};
    return this.http.post<Doctor[]>(`${baseUrl}/allDoctors`, body);
  }

  /**
   * This function update the notice selected by the doctor
   * @param {String} _id - Doctor ID
   * @param {String} notice - Notice selected
   */
  updateNotice(_id: String, notice: String): Observable<any> {
    const body = {_id: _id, notice: notice};
    return this.http.post(`${baseUrl}/updateNotice`, body);
  }

  /**
   * This function update doctor data
   * @param {Doctor} _id - Doctor ID
   * @param {Doctor} doc - New data
   */
  update(_id: String, doc: Doctor): Observable<any> {
    const body = {_id: _id, info: {_id: doc._id, role: doc.role, notice: doc.notice}};
    return this.http.post(`${baseUrl}/updateDoctor`, body);
  }

  /**
   * This function delete a doctor
   * @param {Doctor} _id - Doctor ID
   */
  delete(_id: String): Observable<any> {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deleteDoctor`, body);
  }

  /**
   * This function insert a new doctor
   * @param {Doctor} doc - New doctor data
   * @param {String} mail - Doctor's e-mail
   * @param {String} phone - Doctor's phone number
   */
  insert(doc: Doctor, mail: String, phone: String): Observable<any> {
    const body = {_id: doc._id, role: doc.role, notice: doc.notice, mail: mail, phone: phone};
    return this.http.post(`${baseUrl}/insertDoctor`, body);
  }

  /**
   * Get doctor data
   * @return {Doctor} - Doctor data
   */
  getDoctor(): Doctor {
    return this.doctor;
  }

  /**
   * Set doctor data
   * @param {Doctor} doctor - Doctor data
   */
  setDoctor(doctor: Doctor): void {
    this.doctor = doctor;
  }

}
