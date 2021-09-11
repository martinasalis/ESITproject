import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from "./board.service";

export interface BoardSensor {
  _id: String,
  board: String,
  sensor: String
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class BoardSensorService {

  constructor(private http: HttpClient) { }

  boardSensors(board: Board) {
    const body = {board: board.mac};
    return this.http.post<BoardSensor[]>(`${baseUrl}/patientSensors`, body);
  }

  allPatientSensors() {
    const body = {};
    return this.http.post<BoardSensor[]>(`${baseUrl}/appPatientSensors`, body);
  }

}
