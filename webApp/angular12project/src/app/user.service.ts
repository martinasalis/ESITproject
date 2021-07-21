import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

export interface User {
  nome: String,
  cognome: String,
  cf: String,
  username: String,
  password: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private user: User = {nome: '', cognome: '', cf: '', username: '', password: ''};

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
