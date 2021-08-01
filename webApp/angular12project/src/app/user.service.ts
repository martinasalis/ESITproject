import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface User {
  _id: String,
  name: String,
  surname: String,
  username: String,
  password: String,
  type: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private user: User = {_id: '', name: '', surname: '', username: '', password: '', type: ''};
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  login(uname: String, psw: String) {
    const body = {username: uname, password: psw};
    return this.http.post<User>(`${baseUrl}/login`, body);
  }

  getUsersData(_ids: String[]) {
    const body = {_ids: _ids};
    return this.http.post<User[]>(`${baseUrl}/usersData`, body);
  }

  update(_id: String, user: User) {
    const body = {_id: _id, info: {_id: user._id, name: user.name, surname: user.surname, username: user.username, password: user.password, type: user.type}};
    return this.http.post(`${baseUrl}/updateUser`, body);
  }

  delete(_id: String) {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deleteUser`, body);
  }

  insert(user: User) {
    const body = {_id: user._id, name: user.name, surname: user.surname, username: user.username, password: user.password, type: user.type};
    return this.http.post(`${baseUrl}/insertUser`, body);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUsers() {
    return this.users;
  }

  setUsers(users: User[]) {
    this.users = users;
  }

}
