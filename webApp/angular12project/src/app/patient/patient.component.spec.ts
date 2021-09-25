import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComponent } from './patient.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { Type, UserService } from "../user.service";
import { MockUserService } from "../../mocks/user.service.mock";
import { MockDoctorService } from "../../mocks/doctor.service.mock";
import { MockPatientService } from "../../mocks/patient.service.mock";
import { MockSensorService } from "../../mocks/sensor.service.mock";
import { DoctorService } from "../doctor.service";
import { PatientService } from "../patient.service";
import { SensorService } from "../sensor.service";
import { Router } from "@angular/router";

class MockRouter {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          clickedUser: {_id: "MRNMRZ93C30E410S", name: "Maurizio", surname: "Marini", username: "maurizio",
            password: "6789", mail: "maur_marini@tiscali.com", phone: "3335699887",
            dob: new Date("1993-03-30"), type: Type.PATIENT}
        }
      }
    };
  }
}

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        MockUserService,
        { provide: DoctorService, useClass: MockDoctorService },
        MockDoctorService,
        { provide: PatientService, useClass: MockPatientService },
        MockPatientService,
        { provide: SensorService, useClass: MockSensorService },
        MockSensorService,
        { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Define session variables
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: "GRSLCU97L14E281J", name: "Luca",
      surname: "Grassi", username: "luca", password: "12345", mail: "lucagra97@gmail.com", phone: "333415523",
      dob: new Date("1997-07-14"), type: Type.DOCTOR}));

    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should control if the board data is correct', () => {
    expect(component.patBoardData).toEqual({Items: [
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876283621, device_data: {data: [{data: 71, sensor: 1}, {data: 36.1, sensor: 2}]}},
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876288623, device_data: {data: [{data: 69, sensor: 1}, {data: 37, sensor: 2}]}},
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876283626, device_data: {data: [{data: 75, sensor: 1}, {data: 37.5, sensor: 2}]}},
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876283629, device_data: {data: [{data: 90, sensor: 1}, {data: 37.8, sensor: 2}]}},
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876283632, device_data: {data: [{data: 78, sensor: 1}, {data: 38, sensor: 2}]}},
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876283636, device_data: {data: [{data: 80, sensor: 1}, {data: 38.1, sensor: 2}]}},
      {mac_address: "40:F5:20:05:16:37", data_timestamp: 1631876283638, device_data: {data: [{data: 85, sensor: 1}, {data: 38.5, sensor: 2}]}}
      ]}
    );
  });

  it('should control if the board sensors are correct', () => {
    expect(component.patBoardSensors).toEqual([
      {_id: '00001', name: "Pulse", um: "bpm", threshold: 0, board: "40:F5:20:05:16:37", type: 1}
    ]);
  });
});
