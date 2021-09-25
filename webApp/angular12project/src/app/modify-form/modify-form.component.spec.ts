import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFormComponent } from './modify-form.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { Type, UserService } from "../user.service";
import { MockUserService } from "../../mocks/user.service.mock";
import { MockDoctorService } from "../../mocks/doctor.service.mock";
import { MockPatientService } from "../../mocks/patient.service.mock";
import { MockSensorService } from "../../mocks/sensor.service.mock";
import { DoctorService } from "../doctor.service";
import { PatientService } from "../patient.service";
import { SensorService } from "../sensor.service";

class MockRouter {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          clickedUser: {_id: 'GRSLCU97L14E281J', name: 'Luca', surname: 'Grassi', username: 'luca',
            password: '12345', dob: new Date('1997-07-14'), phone: '3333415523', mail: 'lucagra97@gmail.com',
            type: Type.DOCTOR},
          clickedSensor: {_id: '', name: '', um: '', threshold: 0.0, board: '', type: 0}
        }
      }
    };
  }
}

describe('ModifyFormComponent', () => {
  let component: ModifyFormComponent;
  let fixture: ComponentFixture<ModifyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFormComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: UserService, useClass: MockUserService },
        MockUserService,
        { provide: DoctorService, useClass: MockDoctorService },
        MockDoctorService,
        { provide: PatientService, useClass: MockPatientService },
        MockPatientService,
        { provide: SensorService, useClass: MockSensorService },
        MockSensorService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Define session variables
    spyOn(sessionStorage, 'getItem')
      .withArgs('login').and.returnValue(JSON.stringify(true))
      .withArgs('user').and.returnValue(JSON.stringify({_id: "CSNZNE62A12L736G", name: "Zeno",
      surname: "Cosini", username: "admin", password: "123", mail: "lucagra97@gmail.com", phone: "3268793592",
      dob: new Date("1965-08-12"), type: Type.ADMIN}));

    fixture = TestBed.createComponent(ModifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('control invalid form modify doctor', () => {
    if(component.modify_doctor){
      // Set value
      component.username.setValue('');
      component.name.setValue('');
      component.surname.setValue('');
      component.mail.setValue('');
      component.dob.setValue('');
      component.tc.setValue('');
      component.role.setValue('');
      component.phone.setValue('');

      // Tests
      expect(component.username.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.surname.valid).toBeFalsy();
      expect(component.mail.valid).toBeFalsy();
      expect(component.dob.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.role.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();
    }
  });

  it('control valid form modify doctor', () => {
    if(component.modify_doctor){
      // Set values
      component.username.setValue('aaa');
      component.name.setValue('aaa');
      component.surname.setValue('aaa');
      component.mail.setValue('aaa@aaa');
      component.dob.setValue('25/12/2021');
      component.tc.setValue('aaa');
      component.role.setValue('aaaaaaaaaaaaaaaa');
      component.phone.setValue('aaaaaaaaaa');

      // Tests
      expect(component.username.valid).toBeTruthy();
      expect(component.name.valid).toBeTruthy();
      expect(component.surname.valid).toBeTruthy();
      expect(component.mail.valid).toBeTruthy();
      expect(component.dob.valid).toBeTruthy();
      expect(component.tc.valid).toBeTruthy();
      expect(component.role.valid).toBeTruthy();
      expect(component.phone.valid).toBeTruthy();
    }
  });

  it('control invalid form modify patient', () => {
    if(component.modify_patient) {
      // Set values
      component.username.setValue('');
      component.name.setValue('');
      component.surname.setValue('');
      component.mail.setValue('');
      component.dob.setValue('');
      component.tc.setValue('');
      component.role.setValue('');
      component.phone.setValue('');
      component.dor.setValue('');
      component.address.setValue('');

      // Tests
      expect(component.username.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.surname.valid).toBeFalsy();
      expect(component.mail.valid).toBeFalsy();
      expect(component.dob.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.role.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();
      expect(component.dor.valid).toBeFalsy();
      expect(component.address.valid).toBeFalsy();
    }
  });

  it('control valid form modify patient', () => {
    if(component.modify_patient) {
      // Set values
      component.username.setValue('aaa');
      component.name.setValue('aaa');
      component.surname.setValue('aa');
      component.mail.setValue('aaa@aaa');
      component.dob.setValue('25/12/2021');
      component.tc.setValue('aaaaaaaaaaaaaaaa');
      component.role.setValue('aaa');
      component.phone.setValue('aaaaaaaaaa');
      component.dor.setValue('25/12/2021');
      component.address.setValue('aaa');

      // Tests
      expect(component.username.valid).toBeTruthy();
      expect(component.name.valid).toBeTruthy();
      expect(component.surname.valid).toBeTruthy();
      expect(component.mail.valid).toBeTruthy();
      expect(component.dob.valid).toBeTruthy();
      expect(component.tc.valid).toBeTruthy();
      expect(component.role.valid).toBeTruthy();
      expect(component.phone.valid).toBeTruthy();
      expect(component.dor.valid).toBeTruthy();
      expect(component.address.valid).toBeTruthy();
    }
  });

  it('control invalid form modify sensor', () => {
    if(component.modify_sensor) {
      // Set values
      component.name_sensor.setValue('');
      component.um.setValue('');

      // Tests
      expect(component.name_sensor.valid).toBeFalsy();
      expect(component.um.valid).toBeFalsy();
    }
  });

  it('control valid form modify sensor', () => {
    if(component.modify_sensor) {
      // Set values
      component.name_sensor.setValue('aaa');
      component.um.setValue('aaa');

      // Tests
      expect(component.name_sensor.valid).toBeTruthy();
      expect(component.um.valid).toBeTruthy();
    }
  });

  it('control invalid form modify sensor by doctor', () => {
    if(component.modify_sensor_doctor) {
      component.thr.setValue(-1);
      expect(component.thr.valid).toBeFalsy();
    }
  });

  it('control valid form modify sensor by doctor', () => {
    if(component.modify_sensor_doctor) {
      component.thr.setValue(10);
      expect(component.thr.valid).toBeTruthy();
    }
  });

});
