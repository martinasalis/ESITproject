import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from "./board.service";
import { Observable } from "rxjs";

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

  /**
   * This function get all sensor connected to a specific board
   * @param {Board} board - Data of the board
   * @return {BoardSensor[]} - All sensor of the board
   */
  boardSensors(board: Board): Observable<BoardSensor[]> {
    const body = {board: board.mac};
    return this.http.post<BoardSensor[]>(`${baseUrl}/boardSensors`, body);
  }

}
