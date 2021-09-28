import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormComponent } from './add-form.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoticeDialogComponent } from "../notice-dialog/notice-dialog.component";
import { Type } from "../user.service";
import { Router } from "@angular/router";
import { MockUserService } from "../../mocks/user.service.mock";
import { MockDoctorService } from "../../mocks/doctor.service.mock";
import { MockPatientService } from "../../mocks/patient.service.mock";
import { MockSensorService } from "../../mocks/sensor.service.mock";
import { UserService } from "../user.service";
import { DoctorService } from "../doctor.service";
import { PatientService } from "../patient.service";
import { SensorService } from "../sensor.service";

class MockRouter {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          clickedUser: {_id: 'MRNMRZ93C30E410S', name: 'Maurizio', surname: 'Marini', username: 'maurizio',
            password: '6789', dob: new Date('1993-03-30'), phone: '1993-03-30', mail: 'maur_marini@tiscali.com',
            type: Type.PATIENT},
          data: 0
        }
      }
    };
  }
}

describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;
  let userService: MockUserService;
  let doctorService: MockDoctorService;
  let patientService: MockPatientService;
  let sensorService: MockSensorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddFormComponent,
        NoticeDialogComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
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
      .withArgs('user').and.returnValue(JSON.stringify({_id: 'GRSLCU97L14E281J', name: 'Luca',
      surname: 'Grassi', username: 'luca', password: '12345', dob: new Date('14/07/1997'),
      phone: '3333415523', mail: 'lucagra97@gmail.com', type: Type.DOCTOR}));

    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = TestBed.inject(MockUserService);
    doctorService = TestBed.inject(MockDoctorService);
    patientService = TestBed.inject(MockPatientService);
    sensorService = TestBed.inject(MockSensorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('control empty form add doctor', () => {
    if(component.add_doctor) {
      // Set values
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

  it('control invalid form add doctor', () => {
    if(component.add_doctor) {
      // Set values
      component.mail.setValue('ssssssssssssssssssssssssssssssss');
      component.tc.setValue('dddddddddddddddddddddddddddddddddddddd');
      component.phone.setValue('44444444444444444444444444444444');

      // Tests
      expect(component.mail.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();
    }
  });

  it('control valid form add doctor', () => {
    if(component.add_doctor) {
      // Set values
      component.username.setValue('marco');
      component.name.setValue('Marco');
      component.surname.setValue('Piras');
      component.mail.setValue('marco_piras@gmail.com');
      component.dob.setValue('1997-07-14');
      component.tc.setValue('PRSMRC03B10E281Z');
      component.role.setValue('Medico');
      component.phone.setValue('3393421144');

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

  it('control empty form add patient', () => {
    if(component.add_patient) {
      // Set values
      component.username.setValue('');
      component.name.setValue('');
      component.surname.setValue('');
      component.mail.setValue('');
      component.dob.setValue('');
      component.tc.setValue('');
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
      expect(component.phone.valid).toBeFalsy();
      expect(component.dor.valid).toBeFalsy();
      expect(component.address.valid).toBeFalsy();

      if(component.user.type == Type.ADMIN) {
        component.doctor.setValue('');
        expect(component.doctor.valid).toBeFalsy();
      }
    }
  });

  it('control invalid form add patient', () => {
    if(component.add_patient) {
      // Set values
      component.mail.setValue('sssssssssssssssssssssss');
      component.tc.setValue('sssssssssssssssssssssssssssssssssssss');
      component.phone.setValue('3333333333333333333333333333333333333');

      // Tests
      expect(component.mail.valid).toBeFalsy();
      expect(component.tc.valid).toBeFalsy();
      expect(component.phone.valid).toBeFalsy();

      if(component.user.type == Type.ADMIN) {
        component.doctor.setValue('ppppppppppppppppppppppppppppppppppppppp');
        expect(component.doctor.valid).toBeFalsy();
      }
    }
  });

  it('control valid form add patient', () => {
    if(component.add_patient) {
      // Values
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
      component.doctor.setValue('aaa');

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
      expect(component.doctor.valid).toBeTruthy();
    }
  });

  it('control empty form add sensor', () => {
    if(component.add_sensor) {
      // Values
      component.typeSensor.setValue('');
      component.name.setValue('');
      component.um.setValue('');
      component.thr.setValue('');

      // Tests
      expect(component.typeSensor.valid).toBeFalsy();
      expect(component.name.valid).toBeFalsy();
      expect(component.um.valid).toBeFalsy();
      expect(component.thr.valid).toBeFalsy();
    }
  });

  it('control invalid form add sensor', () => {
    if(component.add_sensor) {
      // Values
      component.typeSensor.setValue(-1);

      // Tests
      expect(component.typeSensor.valid).toBeFalsy();
    }
  });

  it('control valid form add sensor', () => {
    if(component.add_sensor) {
      // Values
      component.typeSensor.setValue('aaa');
      component.name.setValue('aaa');
      component.um.setValue('aaa');
      component.thr.setValue(10);

      // Tests
      expect(component.typeSensor.valid).toBeTruthy();
      expect(component.name.valid).toBeTruthy();
      expect(component.um.valid).toBeTruthy();
      expect(component.thr.valid).toBeTruthy();
    }
  });

  it('control invalid form add sensor patient', () => {
    if(component.add_sensor_patient) {
      // Values
      component.sensorControl.setValue('');
      component.thr.setValue(-1);

      // Tests
      expect(component.sensorControl.valid).toBeFalsy();
      expect(component.thr.valid).toBeFalsy();
    }
  });

  it('control valid form add sensor patient', () => {
    if(component.add_sensor_patient) {
      // Values
      component.sensorControl.setValue('aaaaaaaaaaaaaa');
      component.thr.setValue(10);

      // Tests
      expect(component.sensorControl.valid).toBeTruthy();
      expect(component.thr.valid).toBeTruthy();
    }
  });

});
