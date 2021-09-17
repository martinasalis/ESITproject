import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from "./board.service";
import { Observable } from "rxjs";

export interface BoardSensor {
  _id: String,
  board: String,
  sensor: String,
  threshold: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class BoardSensorService {

  constructor(private http: HttpClient) { }


}
