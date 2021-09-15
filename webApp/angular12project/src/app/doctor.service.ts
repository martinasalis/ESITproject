import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

export enum Notice {
  DEFAULT = 'DEFAULT',
  MAIL = 'E-MAIL',
  SMS = 'SMS',
  TELEGRAM = 'TELEGRAM'
}

export interface Doctor {
  _id: String,
  mail: String,
  phone: String,
  dob: Date,
  role: String,
  notice: Notice,
  img: {
    data: Buffer,
    contentType: String
  }
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  private doctor: Doctor = {_id: '', mail: '', phone: '', dob: Date.prototype, role: '', notice: Notice.DEFAULT, img: {data: Buffer.prototype, contentType: ""}};
  private img_profile: Buffer = Buffer.prototype;

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
    const body = {_id: _id, info: {_id: doc._id, mail: doc.mail, phone: doc.phone, dob: doc.dob, role: doc.role}};
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
   */
  insert(doc: Doctor): Observable<any> {
    const body = {_id: doc._id, mail: doc.mail, phone: doc.phone, dob: doc.dob, role: doc.role, notice: doc.notice, img: {data: doc.img.data, contentType: doc.img.contentType}};
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

  /**
   * Get image profile
   * @return {File} - Image profile
   */
  getImageProfile(): Buffer {
    return this.img_profile;
  }

  /**
   * Set image profile
   * @param {File} image - Image profile
   */
  setImageProfile(image: Buffer): void {
    this.img_profile = image;
  }

}
