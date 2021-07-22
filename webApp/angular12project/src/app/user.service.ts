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

  constructor(private http: HttpClient) { }

  login(uname: String, psw: String) {
    const body = {username: uname, password: psw};
    return this.http.post<User>(`${baseUrl}/login`, body);
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

}
