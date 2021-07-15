import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const baseUrl = 'http://localhost:8080/login';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  login(uname: string, psw: string) {
    let data = {username: uname, password: psw};
    return this.http.post(`${baseUrl}/login`, data);
  }

}
