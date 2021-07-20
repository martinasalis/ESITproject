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

export class LoginService {

  constructor(private http: HttpClient) { }

  login(uname: String, psw: String) {
    const body = {username: uname, password: psw};
    return this.http.post<User>(`${baseUrl}/login`, body);
  }

}
