import { Sensor, SensorService } from "../app/sensor.service";
import { Observable, of, EMPTY } from "rxjs";

export class MockSensorService extends SensorService {

  sensorMock: Sensor[] = [
    {_id: '00001', name: "Pulse", um: "bpm", threshold: 0, board: "40:F5:20:05:16:37", type: 1},
    {_id: '00002', name: "Temperature", um: "C°", threshold: 0, board: "", type: 2}
  ];

  info(_id: String): Observable<Sensor> {
    let res = this.sensorMock.find(element => element._id == _id);

    if(res == undefined) {
      return EMPTY;
    }
    else {
      return of(res);
    }
  }

  allSensors(): Observable<Sensor[]> {
    return of(this.sensorMock);
  }

  allFreeSensors(): Observable<Sensor[]> {
    let res = this.sensorMock.filter(element => element.board == '');

    return of(res);
  }

  getUnitMeasure(typeSensor: Number): Observable<String> {
    let res = this.sensorMock.find(element => element.type == typeSensor);

    if(res == undefined) {
      return EMPTY;
    }
    else {
      return of(res.um);
    }
  }

  boardSensors(board: String): Observable<Sensor[]> {
    let res = this.sensorMock.filter(element => element.board == board);

    return of(res);
  }

  insertBoard(sensor: Sensor): Observable<any> {
    let index = this.sensorMock.findIndex(element => element._id == sensor._id);

    if(index == -1) {
      return of({nModified: 0, ok: 0});
    }
    else {
      this.sensorMock[index] = sensor;
      return of({nModified: 1, ok: 1});
    }
  }

  update(_id: String, snr: Sensor): Observable<any> {
    let index = this.sensorMock.findIndex(element => element._id = _id);

    if(index == -1) {
      return of({nModified: 0, ok: 0});
    }
    else {
      this.sensorMock[index] = snr;
      return of({nModified: 1, ok: 1});
    }
  }

  delete(_id: String): Observable<any> {
    let index = this.sensorMock.findIndex(element => element._id = _id);

    if(index == -1) {
      return of({nModified: 0, ok: 0});
    }
    else {
      this.sensorMock.splice(index, 1);
      return of({nModified: 1, ok: 1});
    }
  }

  deleteAllSensorBoard(board: String, doctor: String): Observable<any> {
    let res = this.sensorMock.filter(element => element.board == board);

    if(res.length == 0) {
      return of({nModified: 0, ok: 0});
    }
    else {
      res.forEach(sensor => {
        let index = this.sensorMock.findIndex(element => element._id == sensor._id);
        this.sensorMock.splice(index, 1);
      });
      return of({nModified: 1, ok: 1});
    }
  }

  insert(snr: Sensor): Observable<any> {
    this.sensorMock.push(snr);
    return of({nModified: 1, ok: 1});
  }

  searchAll(param: String): Observable<Sensor[]> {
    let res = this.sensorMock.filter(element => (element.name.includes(param.toString())));

    return of(res);
  }

}
