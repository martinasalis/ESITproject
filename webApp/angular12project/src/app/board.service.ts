import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Board {
  mac: String,
  patient: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class BoardService {

  constructor(private http: HttpClient) { }

}
