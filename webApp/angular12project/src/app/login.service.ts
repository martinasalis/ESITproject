import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";

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

  login(uname: FormControl, psw: FormControl) {
    return this.http.post<User>(`${baseUrl}/login`,
      JSON.stringify({username: uname.value.username, password: psw.value.password}));
  }

}
