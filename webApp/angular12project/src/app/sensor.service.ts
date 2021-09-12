import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

export interface Sensor {
  _id: String,
  name: String,
  um: String,
  min_threshold: Number,
  max_threshold: Number
}

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})

export class SensorService {

  private sensor: Sensor = {_id: '', name: '', um: '', min_threshold: 0.0, max_threshold: 0.0};
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
   * This function update the data af a sensor
   * @param {String} _id - ID of the sensor
   * @param {Sensor} snr - New data
   */
  update(_id: String, snr: Sensor): Observable<any> {
    const body = {_id: _id, info: {_id: snr._id, name: snr.name, um: snr.um, min_threshold: snr.min_threshold, max_threshold: snr.max_threshold}};
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
   * This function insert a new sensor
   * @param {Sensor} snr - New sensor data
   */
  insert(snr: Sensor): Observable<any> {
    const body = {name: snr.name, um: snr.um, min_threshold: snr.min_threshold, max_threshold: snr.max_threshold};
    return this.http.post(`${baseUrl}/insertSensor`, body);
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
