import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface User {
  _id: String,
  name: String,
  surname: String,
  username: String,
  password: String,
  type: Type
}

export enum Type {
  DEFAULT = 'DEFAULT',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  ADMIN = 'ADMIN'
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private user: User = {_id: '', name: '', surname: '', username: '', password: '', type: Type.DEFAULT};
  private patients: User[] = [];
  private doctors: User[] = [];

  constructor(private http: HttpClient) { }

  /**
   * This function perform login to the system
   * @param {String} uname - Username of the user
   * @param {String} psw - Password og the user
   * @return {User} - Data of authenticated user
   */
  login(uname: String, psw: String) {
    const body = {username: uname, password: psw};
    return this.http.post<User>(`${baseUrl}/login`, body);
  }

  /**
   * This function return a list of patients based by your id
   * @param {String} _ids - IDs of patients
   * @return {User} - Array of patients data
   */
  patientsData(_ids: String[]) {
    const body = {_ids: _ids};
    return this.http.post<User[]>(`${baseUrl}/patientsData`, body);
  }

  /**
   * This function return a list of doctors based by your id
   * @param {String} _ids - IDs of doctors
   * @return {User} - Array of doctors data
   */
  doctorsData(_ids: String[]) {
    const body = {_ids: _ids};
    return this.http.post<User[]>(`${baseUrl}/doctorsData`, body);
  }

  /**
   * This function update the data of a user
   * @param {String} _id - ID of the user
   * @param {User} user - New user data
   */
  update(_id: String, user: User) {
    const body = {_id: _id, info: {_id: user._id, name: user.name, surname: user.surname, username: user.username, password: user.password, type: user.type}};
    return this.http.post(`${baseUrl}/updateUser`, body);
  }

  /**
   * This function delete a user
   * @param {String} _id - ID of the user
   */
  delete(_id: String) {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deleteUser`, body);
  }

  /**
   * This function insert a new user
   * @param {User} user - Data of the new user
   */
  insert(user: User) {
    const body = {_id: user._id, name: user.name, surname: user.surname, username: user.username, password: user.password, type: user.type};
    return this.http.post(`${baseUrl}/insertUser`, body);
  }

  /**
   * Get user's data
   * @return {User} - User's data
   */
  getUser() {
    return this.user;
  }

  /**
   * Set user's data
   * @param {User} user - User's data
   */
  setUser(user: User) {
    this.user = user;
  }

  /**
   * Get patients data of a specific doctor
   * @return {User} - Data of the patients
   */
  getPatients() {
    return this.patients;
  }

  /**
   * Set patients data of a specific doctor
   * @param {User} patients - Data of the patients
   */
  setPatients(patients: User[]) {
    this.patients = patients;
  }

  /**
   * Get doctors data
   * @return {User} - Data of the doctors
   */
  getDoctors() {
    return this.doctors;
  }

  /**
   * Set doctors data
   * @param {User} doctors - Data of the doctors
   */
  setDoctors(doctors: User[]) {
    this.doctors = doctors;
  }


}
