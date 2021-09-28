import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
  _id: String,
  name: String,
  surname: String,
  username: String,
  password: String,
  mail: String,
  phone: String,
  dob: Date,
  type: Type
}

export enum Type {
  DEFAULT = 'DEFAULT',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN'
}

const baseUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = {_id: '', name: '', surname: '', username: '', password: '', mail: '', phone: '', dob: Date.prototype, type: Type.DEFAULT};
  private patients: User[] = [];
  private doctors: User[] = [];

  constructor(private http: HttpClient) { }

  /**
   * This function get the data of a specific user
   * @param {String} _id - User ID
   * @return {User} - User data
   */
  info(_id: String): Observable<User> {
    const body = {_id: _id};
    return this.http.post<User>(`${baseUrl}/infoUser`, body);
  }

  recoveryPassword(mail: String): Observable<any> {
    const body = {mail: mail};
    return this.http.post(`${baseUrl}/recoveryPassword`, body);
  }

  /**
   * This function perform login to the system
   * @param {String} uname - Username of the user
   * @param {String} psw - Password og the user
   * @return {User} - Data of authenticated user
   */
  login(uname: String, psw: String): Observable<User> {
    const body = {username: uname, password: psw};
    return this.http.post<User>(`${baseUrl}/login`, body);
  }

  /**
   * This function return a list of patients based by your id
   * @param {String} _ids - IDs of patients
   * @return {User[]} - Patients data
   */
  patientsData(_ids: String[]): Observable<User[]> {
    const body = {_ids: _ids};
    return this.http.post<User[]>(`${baseUrl}/patientsData`, body);
  }

  /**
   * This function return a list of doctors based by your id
   * @param {String} _ids - IDs of doctors
   * @return {User[]} - Doctors data
   */
  doctorsData(_ids: String[]): Observable<User[]> {
    const body = {_ids: _ids};
    return this.http.post<User[]>(`${baseUrl}/doctorsData`, body);
  }

  /**
   * This function update the data of a user
   * @param {String} _id - ID of the user
   * @param {User} user - New user data
   */
  update(_id: String, user: User): Observable<any> {
    const body = {_id: _id, info: {_id: user._id, name: user.name, surname: user.surname, username: user.username,
        password: user.password, mail: user.mail, phone: user.phone, dob: user.dob, type: user.type}};
    return this.http.post(`${baseUrl}/updateUser`, body);
  }

  /**
   * This function delete a user
   * @param {String} _id - ID of the user
   */
  delete(_id: String): Observable<any> {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deleteUser`, body);
  }

  /**
   * This function insert a new user
   * @param {User} user - Data of the new user
   */
  insert(user: User): Observable<any> {
    const body = {_id: user._id, name: user.name, surname: user.surname, username: user.username, mail: user.mail,
      phone: user.phone, dob: user.dob, type: user.type};
    return this.http.post(`${baseUrl}/insertUser`, body);
  }

  /**
   * This function search all User of a doctor witch matches the param with a specific type
   * @param {String} param - Query parameter
   * @param {String} type - Type of the user
   * @param {String} _ids - IDs of doctor's patients
   * @return {User[]} - All user that match
   */
  searchDoctorPatient(param: String, type: String, _ids: String[]): Observable<User[]> {
    const body = {param: param, type: type, _ids: _ids};
    return this.http.post<User[]>(`${baseUrl}/searchDoctorUsers`, body);
  }

  /**
   * This function search all User witch matches the param with a specific type
   * @param {String} param - Query parameter
   * @param {String} type - Type of the user
   * @return {User[]} - All user that match
   */
  searchAll(param: String, type: String): Observable<User[]> {
    const body = {param: param, type: type};
    return this.http.post<User[]>(`${baseUrl}/searchUsers`, body);
  }

  /**
   * Get user's data
   * @return {User} - User's data
   */
  getUser(): User {
    return this.user;
  }

  /**
   * Set user's data
   * @param {User} user - User's data
   */
  setUser(user: User): void {
    this.user = user;
  }

  /**
   * Get patients data of a specific doctor
   * @return {User[]} - Data of the patients
   */
  getPatients(): User[] {
    return this.patients;
  }

  /**
   * Set patients data of a specific doctor
   * @param {User} patients - Data of the patients
   */
  setPatients(patients: User[]): void {
    this.patients = patients;
  }

  /**
   * Get doctors data
   * @return {User[]} - Data of the doctors
   */
  getDoctors(): User[] {
    return this.doctors;
  }

  /**
   * Set doctors data
   * @param {User} doctors - Data of the doctors
   */
  setDoctors(doctors: User[]): void {
    this.doctors = doctors;
  }

}
