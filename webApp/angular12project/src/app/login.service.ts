import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  uri = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getLogin(uname: string, psw: string) {
    // Verificare uname e psw
    return this.http.get("");
  }

}
