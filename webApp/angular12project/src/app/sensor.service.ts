import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export interface Sensor {
  _id: String,
  name: String,
  um: String,
  threshold: Number,
  board: String,
  type: Number
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class SensorService {

  private sensor: Sensor = {_id: '', name: '', um: '', threshold: 0.0, board: '', type: 0};
  private sensors: Sensor[] = [];

  constructor(private http: HttpClient) { }

  /**
   * This function return data of a sensor
   * @param {String} _id - ID of the sensor
   * @return {Sensor} - Sensor data
   */
  info(_id: String): Observable<Sensor> {
    const body = {_id: _id};
    return this.http.post<Sensor>(`${baseUrl}/infoSensor`, body);
  }

  /**
   * This function return the data of all sensors
   * @return {Sensor[]} - Sensors data
   */
  allSensors(): Observable<Sensor[]> {
    const body = {};
    return this.http.post<Sensor[]>(`${baseUrl}/allSensors`, body);
  }

  /**
   * This function return the data of all free sensors
   * @return {Sensor[]} - Sensors data
   */
  allFreeSensors(): Observable<Sensor[]> {
    const body = {};
    return this.http.post<Sensor[]>(`${baseUrl}/allSensors`, body);
  }

  /**
   * This function get the unit measure of a sensor
   * @param {String} typeSensor - Sensor type
   * @return {String} - Sensor unit measure
   */
  getUnitMeasure(typeSensor: Number): Observable<String> {
    const body = {type: typeSensor};
    return this.http.post<String>(`${baseUrl}/getUnitMeasure`, body);
  }

  /**
   * This function get all sensor connected to a specific board
   * @param {String} board - Board's MAC
   * @return {Sensor[]} - All sensor of the board
   */
  boardSensors(board: String): Observable<Sensor[]> {
    const body = {board: board};
    return this.http.post<Sensor[]>(`${baseUrl}/getAllSensorBoard`, body);
  }

  /**
   * This function associate a board to a sensor
   * @param {Sensor} sensor - Sensor's data
   */
  insertBoard(sensor: Sensor): Observable<any> {
    const body = {_id: sensor._id, board: sensor.board, threshold: sensor.threshold};
    return this.http.post(`${baseUrl}/insertSensorBoard`, body);
  }

  /**
   * This function update the data af a sensor
   * @param {String} _id - ID of the sensor
   * @param {Sensor} snr - New data
   */
  update(_id: String, snr: Sensor): Observable<any> {
    const body = {_id: _id, board: snr.board, info: {name: snr.name, um: snr.um, threshold: snr.threshold}};
    return this.http.post(`${baseUrl}/updateSensor`, body);
  }

  /**
   * This function delete a sensor
   * @param {String} _id - ID of the sensor
   */
  delete(_id: String): Observable<any> {
    const body = {_id: _id};
    return this.http.post(`${baseUrl}/deleteSensor`, body);
  }

  /**
   * This function delete all sensor associate to a board
   * @param {String} board - Board's MAC
   */
  deleteAllSensorBoard(board: String): Observable<any> {
    const body = {board: board};
    return this.http.post(`${baseUrl}/deleteAllSensorBoard`, body);
  }

  /**
   * This function insert a new sensor
   * @param {Sensor} snr - New sensor data
   */
  insert(snr: Sensor): Observable<any> {
    const body = {name: snr.name, um: snr.um, threshold: snr.threshold, board: snr.board, type: snr.type};
    return this.http.post(`${baseUrl}/insertSensor`, body);
  }

  /**
   * This function search all sensor witch matches the param
   * @param {String} param - Query parameter
   * @return {Sensor[]} - All user that match
   */
  searchAll(param: String): Observable<Sensor[]> {
    const body = {param: param};
    return this.http.post<Sensor[]>(`${baseUrl}/searchSensors`, body);
  }

  /**
   * Get sensor data
   * @return {Sensor} - Sensor data
   */
  getSensor(): Sensor {
    return this.sensor;
  }

  /**
   * Set sensor data
   * @param {Sensor} snr - Sensor data
   */
  setSensor(snr: Sensor): void {
    this.sensor = snr;
  }

  /**
   * Get sensors data
   * @return {Sensor[]} - Sensors data
   */
  getSensors(): Sensor[] {
    return this.sensors;
  }

  /**
   * Set sensors data
   * @param {Sensor} snr - Sensors data
   */
  setSensors(snr: Sensor[]): void {
    this.sensors = snr;
  }

}
