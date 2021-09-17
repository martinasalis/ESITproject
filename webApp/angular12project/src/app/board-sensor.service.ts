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

  /**
   * This function get all sensor connected to a specific board
   * @param {Board} board - Data of the board
   * @return {BoardSensor[]} - All sensor of the board
   */
  boardSensors(board: Board): Observable<BoardSensor[]> {
    const body = {board: board.mac};
    return this.http.post<BoardSensor[]>(`${baseUrl}/boardSensors`, body);
  }

  /**
   * This function insert a new sensor in the patient's board
   * @param {BoardSensor} boardSensor - Sensor data
   */
  insert(boardSensor: BoardSensor): Observable<any> {
    const body = {board: boardSensor.board, sensor: boardSensor.sensor, threshold: boardSensor.threshold};
    return this.http.post(`${baseUrl}/insertBoardSensors`, body);
  }

}
