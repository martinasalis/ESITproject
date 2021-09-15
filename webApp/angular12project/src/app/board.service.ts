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

  /**
   * This function insert a new board in the system
   * @param {Board} board - Data of new board
   */
  insert(board: Board): Observable<any> {
    const body = {board: board.mac, patient: board.patient};
    return this.http.post(`${baseUrl}/insertBoard`, body);
  }

  /**
   * Get board MAC of patient
   * @param {String} patient - Patient ID
   * @return {Board} - Board data
   */
  getBoardMAC(patient: String): Observable<Board> {
    const body = {patient: patient};
    return this.http.post<Board>(`${baseUrl}/getBoardMAC`, body);
  }

  /**
   * Get data of sensors
   * @param {Board} board - Board data
   * @return - Sensors data
   */
  getBoardSensorData(board: Board): Observable<any> {
    const body = {board: board.mac};
    return this.http.post<any>(`${baseUrl}/boardSensorData`, body);
  }

}
